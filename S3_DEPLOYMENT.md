# S3 Static Deployment - Quick Start

## ✅ Build Tamamlandı!

Web sitesi başarıyla static export edildi. `out/` klasöründe 32 HTML sayfası ve tüm assetler hazır.

```
out/
├── tr/          # Türkçe sayfalar
├── en/          # İngilizce sayfalar
├── ar/          # Arapça sayfalar
├── _next/       # Next.js assets
├── images/      # Görseller
└── robots.txt
```

**Toplam Boyut**: 2.7MB

## 🚀 S3'e Deploy Etme (3 Adım)

### Adım 1: S3 Bucket Oluştur

```bash
# AWS CLI ile bucket oluştur
aws s3 mb s3://algoriaventures-website --region eu-central-1

# Static website hosting aktif et
aws s3 website s3://algoriaventures-website \
  --index-document index.html \
  --error-document 404.html
```

### Adım 2: Dosyaları Yükle

```bash
# out/ klasöründeki tüm dosyaları S3'e yükle
cd /Users/bedirhantunc/Desktop/code/algoria-ventures

aws s3 sync out/ s3://algoriaventures-website/ \
  --delete \
  --acl public-read \
  --cache-control "public, max-age=31536000, immutable"

# HTML dosyaları için farklı cache ayarı
aws s3 sync out/ s3://algoriaventures-website/ \
  --exclude "*" \
  --include "*.html" \
  --acl public-read \
  --cache-control "public, max-age=0, must-revalidate"
```

### Adım 3: Bucket Policy Ekle

`bucket-policy.json` oluştur:

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

Policy'yi uygula:

```bash
aws s3api put-bucket-policy \
  --bucket algoriaventures-website \
  --policy file://bucket-policy.json
```

## 🌐 CloudFront (Opsiyonel - Önerilen)

CloudFront CDN eklemek için:

1. AWS Console → CloudFront → Create Distribution
2. Origin: `algoriaventures-website.s3-website.eu-central-1.amazonaws.com`
3. Viewer Protocol Policy: Redirect HTTP to HTTPS
4. Allowed HTTP Methods: GET, HEAD
5. Create!

**Distribution URL**: `https://d1234567890.cloudfront.net` (AWS tarafından verilir)

## 🔄 Güncelleme (Her Deployment'ta)

```bash
# 1. Build
npm run build

# 2. S3'e sync
aws s3 sync out/ s3://algoriaventures-website/ --delete --acl public-read

# 3. CloudFront cache invalidate (eğer kullanıyorsanız)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 🔗 Domain Bağlama

### Route 53 ile:

1. Hosted Zone oluştur (algoriaventures.com)
2. A Record ekle:
   - Name: (boş bırak - root domain)
   - Type: A
   - Alias: Yes
   - Target: CloudFront distribution

3. CNAME Record (www için):
   - Name: www
   - Type: CNAME
   - Value: d1234567890.cloudfront.net

## 📊 Test

Static site şu anda local'de test edilebilir:

```bash
# Port 3001'de serve ediliyor
npx serve out -l 3001
```

Tarayıcıda:
- http://localhost:3001/tr/
- http://localhost:3001/en/
- http://localhost:3001/ar/

## ✅ Checklist

Deployment öncesi:

- [ ] Gerçek ekip fotoğrafları ekle (`public/images/team/`)
- [ ] Portföy şirket logoları ekle (`public/images/portfolio/`)
- [ ] Web3Forms API key güncelle (`src/app/[locale]/submit/page.tsx`)
- [ ] Google Maps embed ekle (`src/app/[locale]/contact/page.tsx`)
- [ ] Domain DNS ayarlarını yapılandır
- [ ] SSL sertifikası al (CloudFront üzerinden otomatik)

## 💰 Tahmini Maliyet

- **S3 Storage**: ~$0.05/ay (2.7MB)
- **S3 Requests**: ~$0.50/ay (orta trafik)
- **CloudFront**: ~$5-15/ay (bölgeye ve trafiğe bağlı)
- **Route 53**: $0.50/ay (hosted zone)

**Toplam**: ~$6-16/ay

## 🆘 Sorun Giderme

### S3'te 403 Forbidden
→ Bucket policy'nin doğru olduğundan emin olun

### Sayfalar yüklenmiyor
→ CloudFront error pages konfigürasyonunu kontrol edin

### Dil değiştirme çalışmıyor
→ Middleware'in export'ta çalışmadığını unutmayın, linkler doğru path'leri kullanmalı

### Cache güncellenmiyor
→ CloudFront invalidation oluşturun

## 📞 Destek

Sorular için: tech@algoriaventures.com

---

**Not**: Bu dosya production deployment için hızlı referans rehberidir. Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın.
