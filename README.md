# 🚀 Muhammet Kaya - Yazılım Uzmanı Portfolio

> Modern ve responsive tasarım ile geliştirilmiş kişisel portföy websitesi

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://portfolio-t8u9.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/kaya2m/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/muhammet-kaya-60b36b213/)

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [İletişim](#-iletişim)
- [Lisans](#-lisans)

## 🎯 Proje Hakkında

Bu proje, yazılım geliştirme kariyerim, projelerim ve teknik yeteneklerimi sergileyen modern bir portföy websitesidir. Next.js ve React kullanılarak geliştirilmiş olup, responsive tasarım ve modern UI/UX prensipleri ile tasarlanmıştır.

### 🌟 Ana Hedefler
- **Profesyonel Sunum**: Kariyerim ve projelerimi etkili şekilde sergilemek
- **Modern Tasarım**: Güncel web tasarım trendlerini yansıtan görsel
- **Performans**: Hızlı yükleme ve sorunsuz kullanıcı deneyimi
- **Responsive**: Tüm cihazlarda mükemmel görüntüleme

## ✨ Özellikler

### 🎨 **UI/UX**
- **Modern Gradient Tasarım** - Çağdaş görsel efektler
- **Responsive Layout** - Mobil, tablet ve desktop uyumlu
- **Dark Theme** - Göz yormayan koyu tema
- **Smooth Animations** - Akıcı geçişler ve animasyonlar
- **Interactive Elements** - Hover efektleri ve micro-interactions

### 📊 **Fonksiyonel Özellikler**
- **Ziyaretçi Sayacı** - Toplam ve günlük ziyaret takibi
- **Section Navigation** - Sayfa içi smooth scrolling
- **Project Showcase** - Proje detayları ve demo linkleri
- **Experience Timeline** - Kronolojik iş deneyimi sunumu
- **Skills Display** - Teknik yeteneklerin görsel sunumu
- **Contact Integration** - Sosyal medya ve iletişim linkleri

### 🚀 **Teknik Özellikler**
- **Next.js Image Optimization** - Otomatik resim optimizasyonu
- **SEO Optimized** - Arama motoru optimizasyonu
- **Performance Optimized** - Hızlı yükleme süreleri
- **Accessibility** - WCAG standartlarına uygun erişilebilirlik
- **Progressive Enhancement** - Aşamalı geliştirme prensipleri

## 🛠 Teknolojiler

### **Frontend**
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Icons & UI**
![Lucide React](https://img.shields.io/badge/Lucide%20React-000000?style=for-the-badge&logo=lucide&logoColor=white)

### **Development Tools**
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

### **Deployment**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.17 veya üzeri
- npm veya yarn package manager
- Git

### Adım Adım Kurulum

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/kaya2m/portfolio.git
cd portfolio
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 💻 Kullanım

### Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production build'i test et
npm run start

# Kod kalitesi kontrolü
npm run lint

# Type checking
npm run type-check
```

### Konfigürasyon

**next.config.js** dosyasında proje ayarlarını düzenleyebilirsiniz:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'cdn.jsdelivr.net',
      'media.licdn.com',
      // Diğer domain'ler...
    ]
  }
}
```

## 📁 Proje Yapısı

```
portfolio/
├── 📁 pages/
│   ├── 📄 _app.tsx          # Ana uygulama komponenti
│   ├── 📄 _document.tsx     # HTML document yapısı
│   └── 📄 index.tsx         # Ana sayfa
├── 📁 public/
│   ├── 🖼️ kisisel-foto.jpg  # Profil fotoğrafı
│   ├── 🖼️ avatar-kisisel.png # Avatar resmi
│   └── 📄 favicon.ico       # Site ikonu
├── 📁 styles/
│   └── 📄 globals.css       # Global CSS stilları
├── 📁 components/           # React komponentleri (isteğe bağlı)
├── 📄 next.config.js        # Next.js konfigürasyonu
├── 📄 tailwind.config.js    # Tailwind CSS ayarları
├── 📄 tsconfig.json         # TypeScript konfigürasyonu
├── 📄 package.json          # Proje bağımlılıkları
└── 📄 README.md            # Proje dokümantasyonu
```

## 📸 Ekran Görüntüsü

![Portfolio Website](https://your-screenshot-url.com/portfolio-screenshot.png)

## 🌐 Deployment

### Vercel ile Deployment

1. **GitHub'a push edin**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Vercel Dashboard'da**
   - Repository'yi import edin
   - Otomatik deployment ayarları yapılacak
   - Her push'da otomatik deploy olacak

### Manuel Deployment

```bash
# Production build oluştur
npm run build

# Build dosyalarını deploy platformuna yükle
# (Netlify, GitHub Pages, vs.)
```

## 📈 Performans

### Lighthouse Skorları
- **Performance**: 95/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 95/100

### Optimizasyonlar
- ✅ Next.js Image Optimization
- ✅ Lazy Loading
- ✅ Code Splitting
- ✅ Tree Shaking
- ✅ Minification
- ✅ Gzip Compression

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyorum! Lütfen şu adımları takip edin:

1. **Fork edin** - Repository'yi fork edin
2. **Branch oluşturun** - `git checkout -b feature/yeni-ozellik`
3. **Commit edin** - `git commit -m 'Yeni özellik eklendi'`
4. **Push edin** - `git push origin feature/yeni-ozellik`
5. **Pull Request açın** - GitHub'da pull request oluşturun

### Geliştirme Kuralları
- TypeScript kullanın
- ESLint kurallarına uyun
- Responsive tasarım prensiplerine dikkat edin
- Commit mesajlarını anlamlı yazın

## 📊 Özellikler ve Güncellemeler

### v1.0.0 (Mevcut)
- ✅ Temel portföy sayfası
- ✅ Responsive tasarım
- ✅ Ziyaretçi sayacı
- ✅ Proje showcase
- ✅ İletişim formu

### v1.1.0 (Planlanıyor)
- 🔄 Blog bölümü
- 🔄 Dark/Light mode toggle
- 🔄 Çoklu dil desteği
- 🔄 Admin panel
- 🔄 Analytics entegrasyonu

## 📞 İletişim

**Muhammet Kaya** - Yazılım Uzmanı

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muhammet-kaya-60b36b213/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kaya2m)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mkaya349@hotmail.com)

- 📧 **Email**: mkaya349@hotmail.com
- 💼 **LinkedIn**: [Muhammet Kaya](https://www.linkedin.com/in/muhammet-kaya-60b36b213/)
- 🌐 **Portfolio**: [https://portfolio-muhammet-kaya.vercel.app](https://portfolio-muhammet-kaya.vercel.app)
- 📍 **Konum**: Düzce, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=kaya2m.portfolio)

</div>

---

<div align="center">
  
### 🛠️ **Built with ❤️ by [Muhammet Kaya](https://github.com/kaya2m)**

</div>
