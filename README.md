# Algoria Ventures Website

Modern, profesyonel venture capital web sitesi. Next.js 14, Tailwind CSS ve TypeScript ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ Next.js 14 (App Router) ile server-side rendering
- ✅ Tailwind CSS ile modern, responsive tasarım
- ✅ Çoklu dil desteği (TR, EN, AR) - next-intl ile
- ✅ TypeScript ile tip güvenliği
- ✅ Markdown-based blog/whitepaper sistemi hazır
- ✅ Web3Forms ile form entegrasyonu
- ✅ Static export desteği (S3/CloudFront için)
- ✅ SEO optimized
- ✅ Mobile-first responsive design

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn

## 🛠 Kurulum

```bash
# Dependencyleri yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Production server (build sonrası)
npm run start
```

## 📁 Proje Yapısı

```
algoria-ventures/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Çoklu dil rotaları
│   │   │   ├── page.tsx       # Ana sayfa
│   │   │   ├── about/         # Hakkımızda
│   │   │   ├── team/          # Ekip
│   │   │   ├── portfolio/     # Portföy
│   │   │   ├── criteria/      # Yatırım Kriterleri
│   │   │   ├── submit/        # Projeni Gönder
│   │   │   ├── blog/          # Blog
│   │   │   ├── whitepapers/   # Whitepaperlar
│   │   │   ├── news/          # Haberler
│   │   │   └── contact/       # İletişim
│   ├── components/            # React componentleri
│   │   ├── layout/           # Header, Footer, LanguageSwitcher
│   │   ├── home/             # Ana sayfa bileşenleri
│   │   ├── portfolio/        # Portföy bileşenleri
│   │   ├── team/             # Ekip bileşenleri
│   │   └── ui/               # Genel UI bileşenleri
│   ├── data/                 # Static data files
│   ├── content/              # Markdown content (blog, whitepapers, news)
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── messages/                 # i18n çeviri dosyaları
├── public/                   # Static assets
└── ...config files
```

## 🌐 Çoklu Dil Desteği

Web sitesi 3 dilde mevcuttur:
- 🇹🇷 Türkçe (default)
- 🇬🇧 İngilizce
- 🇸🇦 Arapça

Yeni dil eklemek için:
1. `messages/{locale}.json` dosyası oluştur
2. `src/i18n.ts` dosyasına locale ekle
3. `middleware.ts` dosyasını güncelle

## 📝 İçerik Yönetimi

### Blog Yazıları
Markdown dosyaları: `src/content/blog/{locale}/`

### Whitepaperlar
Markdown dosyaları: `src/content/whitepapers/{locale}/`

### Haberler
Markdown dosyaları: `src/content/news/{locale}/`

### Ekip & Portföy
Data files: `src/data/team.ts`, `src/data/portfolio.ts`

## 🎨 Customization

### Renkler
`tailwind.config.ts` dosyasında renk paletini özelleştirebilirsiniz:
```typescript
colors: {
  primary: '#0A2463',
  secondary: '#D4AF37',
  accent: '#3AAFA9',
}
```

### Fontlar
`src/app/[locale]/layout.tsx` dosyasında font değişikliği yapabilirsiniz.

## 📧 Form Entegrasyonu

Projeni Gönder formu Web3Forms ile entegre edilmiştir.

Production kullanımı için:
1. [Web3Forms](https://web3forms.com)'tan access key alın
2. `src/app/[locale]/submit/page.tsx` dosyasında `YOUR_WEB3FORMS_ACCESS_KEY` yerine kendi key'inizi ekleyin

## 🚀 Deployment

### S3 + CloudFront (Önerilen)

1. **Build**
```bash
npm run build
```

2. **Static files**
Build sonrası `out/` klasöründeki dosyalar S3'e yüklenmelidir.

3. **S3 Bucket Setup**
- Static website hosting enable
- Public read access
- Index document: index.html

4. **CloudFront Distribution**
- Origin: S3 bucket
- Viewer protocol policy: Redirect HTTP to HTTPS
- Custom domain (optional)

5. **Route 53** (Domain için)
- A record → CloudFront distribution

### Alternatif: Vercel/Netlify

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

## 🔧 Environment Variables

Production için `.env.local` oluştur:

```bash
# Web3Forms
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

## 📊 Analytics

Google Analytics eklemek için:
1. `src/app/[locale]/layout.tsx` dosyasına GA script ekle
2. Environment variable ile tracking ID ekle

## 🐛 Troubleshooting

### Build hatası
```bash
# Cache temizle
rm -rf .next
npm run build
```

### Dependency issues
```bash
# Node modules temizle ve tekrar yükle
rm -rf node_modules
npm install
```

## 📄 License

Private - Algoria Ventures © 2024

## 🤝 Contributing

Internal team only.

## 📞 Support

herhangi bir sorun için: tech@algoriaventures.com
