# Deployment Guide - Algoria Ventures

## S3 + CloudFront Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- Domain name (optional)

### Step 1: Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

Build output will be in `out/` directory.

### Step 2: Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://algoriaventures-website

# Enable static website hosting
aws s3 website s3://algoriaventures-website \
  --index-document index.html \
  --error-document 404.html
```

### Step 3: Configure Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::algoriaventures-website/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy \
  --bucket algoriaventures-website \
  --policy file://bucket-policy.json
```

### Step 4: Upload Files

```bash
# Sync build output to S3
aws s3 sync out/ s3://algoriaventures-website/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# HTML files with different cache
aws s3 sync out/ s3://algoriaventures-website/ \
  --exclude "*" \
  --include "*.html" \
  --cache-control "public, max-age=0, must-revalidate"
```

### Step 5: Create CloudFront Distribution

1. Go to AWS CloudFront Console
2. Create Distribution
   - Origin Domain: Select your S3 bucket
   - Origin Path: Leave empty
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD
   - Cache Policy: CachingOptimized
   - Price Class: Use All Edge Locations (best performance)

3. Default Root Object: `index.html`

4. Custom Error Pages:
   - 403: Redirect to `/tr/index.html` (200)
   - 404: Redirect to `/tr/404.html` (404)

### Step 6: SSL Certificate (Optional - for custom domain)

1. Request certificate in AWS Certificate Manager (ACM)
   - Region: **US East (N. Virginia)** - Important!
   - Domain: algoriaventures.com
   - Add: *.algoriaventures.com (for subdomains)
   - Validation: DNS

2. Add CNAME records to your DNS
3. Wait for certificate validation

4. Update CloudFront distribution:
   - Alternate Domain Names (CNAMEs): algoriaventures.com, www.algoriaventures.com
   - SSL Certificate: Select your ACM certificate

### Step 7: Route 53 DNS Setup (Optional)

1. Create Hosted Zone for your domain
2. Create A record:
   - Name: leave empty (root domain)
   - Type: A
   - Alias: Yes
   - Alias Target: Select CloudFront distribution

3. Create A record for www:
   - Name: www
   - Type: A
   - Alias: Yes
   - Alias Target: Select CloudFront distribution

### Step 8: Invalidate CloudFront Cache (after updates)

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## CI/CD with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Sync to S3
        run: |
          aws s3 sync out/ s3://algoriaventures-website/ --delete

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

Add secrets in GitHub repository settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Alternative: Vercel Deployment

Easier option if you don't need S3:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configure in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "trailingSlash": true
}
```

## Troubleshooting

### Issue: 403 Forbidden on CloudFront
**Solution**: Check S3 bucket policy and CloudFront origin settings

### Issue: Outdated content after deploy
**Solution**: Create CloudFront invalidation

### Issue: 404 on page refresh
**Solution**: Configure CloudFront error pages to redirect to index.html

### Issue: Mixed content warnings
**Solution**: Ensure all resources use HTTPS, check CloudFront viewer protocol policy

## Performance Optimization

1. **Enable Gzip/Brotli in CloudFront**
2. **Set proper cache headers** (already configured in sync command)
3. **Use CloudFront Functions** for redirects (if needed)
4. **Monitor with CloudWatch**

## Security Best Practices

1. Enable CloudFront WAF (Web Application Firewall)
2. Restrict S3 bucket access to CloudFront only (use OAI)
3. Enable CloudFront access logging
4. Regular security audits

## Cost Estimation

- S3 Storage: ~$0.50/month (for typical website)
- CloudFront: ~$5-20/month (depends on traffic)
- Route 53: $0.50/month per hosted zone
- Total: ~$6-25/month

## Monitoring

Set up CloudWatch alarms for:
- 4xx/5xx error rates
- Cache hit ratio
- Data transfer

## Backup

```bash
# Backup S3 content
aws s3 sync s3://algoriaventures-website/ ./backup/ --delete
```

## Rollback

```bash
# Restore previous version
aws s3 sync ./previous-build/ s3://algoriaventures-website/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```
