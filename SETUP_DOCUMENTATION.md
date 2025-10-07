# NextGen Smart Variants - Kurulum ve Erişim Dokümantasyonu

🚨 **ÖNEMLİ: Bu dokümantasyon NextGen Smart Variants uygulamasına özeldir - Admin Price Sort veya diğer uygulamalarla karıştırmayın!**

## 📋 Proje Kimliği ve Bilgileri

### App Detayları
- **App Adı**: NextGen Smart Variants
- **App ID**: 285217980417
- **Handle**: nextgen-smart-variants-1
- **Organization ID**: 185211679
- **Dashboard URL**: https://dev.shopify.com/dashboard/185211679/apps/285217980417
- **Geliştirme URL**: http://localhost:3000
- **Benzersiz Port**: 3000 (diğer uygulamalarla çakışmaması için)

### Proje Klasör Yapısı
```
D:\WebProjects\htdocs\shopifyappcenter\productimagevariant\
├── .env                      # NextGen-specific environment variables
├── shopify.app.toml         # Shopify app configuration
├── package.json             # Node.js dependencies
├── package-lock.json        # Dependency lock file
├── index.js                 # Ana Express server
├── test.js                  # Test server (çalışıyor)
├── node_modules/            # NPM packages
├── README.md                # App açıklaması
└── SETUP_DOCUMENTATION.md   # Bu dosya
```

## 🔧 Kurulum Adımları

### 1. Terminal Erişimi
```powershell
# Proje klasörüne git
cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"

# Shopify CLI ile giriş yap
shopify auth login

# Dependencies'leri install et (eğer node_modules yoksa)
npm install
```

### 2. Server Başlatma Seçenekleri

#### A) Test Server (Şu anda çalışan)
```powershell
# Test server'ı başlat (basit HTTP server)
Start-Process -FilePath "node" -ArgumentList "test.js" -WindowStyle Normal
```

#### B) Ana Express Server
```powershell
# Ana development server'ı başlat
npm start
# veya
node index.js
```

#### C) Development Mode (Auto-reload)
```powershell
# Nodemon ile auto-reload
npm run dev
```

### 3. Server Erişim Kontrolü
```powershell
# Server'ın çalıştığını kontrol et
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing

# Port dinleme kontrolü
netstat -an | findstr :3000

# Çalışan node process'lerini gör
Get-Process | Where-Object {$_.ProcessName -eq "node"}
```

## 📁 Önemli Dosyalar ve İçerikleri

### 1. shopify.app.toml
```toml
# NextGen Smart Variants - Product Image Variant App
name = "NextGen Smart Variants"
handle = "nextgen-smart-variants-1"
client_id = "285217980417"
application_url = "https://localhost:3000"

[access_scopes]
scopes = "write_products,read_products,write_product_listings,read_product_listings,read_inventory,write_inventory"

[auth]
redirect_urls = [
  "https://localhost:3000/api/auth/callback",
  "https://localhost:3000/auth/shopify/callback"
]
```

### 2. .env
```env
# NextGen Smart Variants Environment Variables
NEXTGEN_APP_NAME="NextGen Smart Variants"
NEXTGEN_APP_HANDLE="nextgen-smart-variants-unique-productimagevariant"
NEXTGEN_APP_PORT=3000

SHOPIFY_API_KEY="285217980417"
SHOPIFY_API_SECRET="YOUR_NEXTGEN_SMART_VARIANTS_CLIENT_SECRET_HERE"

NODE_ENV=development
HOST=localhost
PORT=3000

# App-specific feature flags
NEXTGEN_ENABLE_IMAGE_VARIANTS=true
NEXTGEN_ENABLE_SMART_MATCHING=true
NEXTGEN_DEBUG_MODE=true
```

### 3. package.json
```json
{
  "name": "nextgen-smart-variants",
  "version": "1.0.0",
  "description": "NextGen Smart Variants - Product Image Variant App",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js --port 3000",
    "start": "node index.js",
    "build": "echo 'Build process for NextGen Smart Variants'",
    "test": "echo 'No tests specified yet'"
  }
}
```

## 🌐 API Endpoints

### Temel Endpoints
- `GET /` - Ana endpoint (app bilgileri)
- `GET /health` - Health check
- `GET /api/auth/callback` - Shopify authentication callback
- `GET /api/nextgen/variants` - Variant API
- `GET /api/nextgen/products` - Product API

### Webhook Endpoints
- `POST /webhooks/nextgen/products` - Product webhook handler
- `POST /webhooks/nextgen/variants` - Variant webhook handler

### App Proxy
- `ALL /api/proxy/nextgen-variants*` - App proxy handler

## 🚀 Geliştirme Komutları

### Shopify CLI Komutları
```powershell
# App bilgilerini görüntüle
shopify app info

# Development modda çalıştır
shopify app dev --port 3000

# Deploy et
shopify app deploy

# Extension oluştur
shopify app generate extension

# App versions'larını listele
shopify app versions list
```

### Server Yönetimi
```powershell
# Server'ı başlat
npm start

# Development mode (auto-reload)
npm run dev

# Server'ı test et
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing

# Process'leri öldür (gerekirse)
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process
```

## 🔐 Güvenlik ve Kimlik Ayarları

### Benzersiz Tanımlayıcılar
- **Port**: 3000 (diğer uygulamalar 8080/8081 kullanır)
- **Handle**: nextgen-smart-variants-1 
- **Environment Variables**: NEXTGEN_ prefix
- **Webhook Paths**: /webhooks/nextgen/
- **API Paths**: /api/nextgen/
- **App Proxy**: /api/proxy/nextgen-variants

### Client Secret Ekleme
1. Shopify Partners Dashboard'a git: https://dev.shopify.com/dashboard/185211679/apps/285217980417
2. App setup → Client credentials'dan Client Secret'ı kopyala
3. `.env` dosyasında `YOUR_NEXTGEN_SMART_VARIANTS_CLIENT_SECRET_HERE` kısmını değiştir

## 🐛 Sorun Giderme

### 1. Server Başlamıyor
```powershell
# Port çakışması kontrolü
netstat -an | findstr :3000

# Başka port dene
$env:PORT=3001; npm start
```

### 2. Shopify CLI Erişim Sorunu
```powershell
# Hesap kontrolü
shopify auth logout
shopify auth login

# App info ile test et
shopify app info
```

### 3. Dependencies Sorunu
```powershell
# Node modules'ları temizle ve yeniden install et
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## 📝 Geliştirme Notları

### Yapılacaklar
- [ ] Client Secret'ı `.env` dosyasına ekle
- [ ] Ana Express server'ı tam olarak çalıştır
- [ ] Product variant management logic'ini implement et
- [ ] Image handling functionality ekle
- [ ] Webhook handlers'ları genişlet

### Önemli Hatırlatmalar
1. **Bu proje sadece NextGen Smart Variants için!**
2. **Admin Price Sort ile karıştırma!**
3. **Port 3000 kullan (benzersizlik için)**
4. **Environment variables'lar NEXTGEN_ prefix'li**
5. **App ID: 285217980417** 

## 📞 Hızlı Komutlar

### Server Başlat ve Test Et
```powershell
# Hızlı başlatma
cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"
npm start

# Başka terminal'de test et
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

### Status Check
```powershell
# Tüm durum kontrolü
cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"
Get-ChildItem | Format-Table Name, Length, LastWriteTime
Get-Process | Where-Object {$_.ProcessName -eq "node"}
netstat -an | findstr :3000
```

---

**🎯 Bu dokümantasyon her zaman güncel tutulacak. NextGen Smart Variants uygulaması için tüm gerekli bilgiler burada!**

## 🎯 **GÜNCEL DURUM: NextGen Smart Variants App Geliştirildi!**

### ✅ **Tamamlanan Ana Özellikler:**

#### 1. **Kapsamlı Backend API** 
- ✅ Express.js server (Port 3001)
- ✅ MongoDB entegrasyonu (development mode destekli)
- ✅ Shopify GraphQL/REST API servisleri
- ✅ Authentication & authorization middleware
- ✅ Error handling & logging
- ✅ Webhook handlers

#### 2. **Dashboard API Endpoints**
- ✅ `/api/dashboard` - Ana dashboard verisi
- ✅ `/api/dashboard/products` - Ürün listesi (pagination)
- ✅ `/api/dashboard/collections` - Collection listesi 
- ✅ `/api/dashboard/stats` - İstatistikler
- ✅ `/api/dashboard/sync` - Shopify senkronizasyon

#### 3. **Ürün ve Variant Yönetimi**
- ✅ Shopify ürün çekme (mock data ile test edildi)
- ✅ Variant türü otomatik algılama (Color, Size, Material, Style)
- ✅ Collection bazlı filtreleme
- ✅ Product model (MongoDB schema)

#### 4. **Development Ortamı**
- ✅ Mock data desteği (production'a hazır)
- ✅ Hot-reload development server
- ✅ Comprehensive logging
- ✅ Error handling

### 🚀 **Çalışan Endpoints:**
```
GET  http://localhost:3001/api/info          # App bilgileri
GET  http://localhost:3001/api/health        # Health check
GET  http://localhost:3001/api/dashboard     # Dashboard data ✅ ÇALIŞIYOR
GET  http://localhost:3001/api/dashboard/stats # İstatistikler
GET  http://localhost:3001/api/products      # Ürünler
GET  http://localhost:3001/api/variants      # Varyantlar
POST http://localhost:3001/webhooks/products/create # Webhooks
```

### 📋 **Kalan Görevler (Task List):**
- [ ] Variant Türü Otomatik Algılama (ML algorithm)
- [ ] İmaj Yönetimi ve Upload Sistemi
- [ ] Fiyat Görünüm Ayarları
- [ ] Frontend React Components
- [ ] Kategori Bazlı Otomatik Çalışma
- [ ] Shopify Theme Integration
- [ ] Test ve Deploy

### 🎯 **Sıradaki Öncelik:**
1. **Frontend React App** - Dashboard UI
2. **Image Upload System** - Variant thumbnail management
3. **Theme Integration** - Shopify Liquid templates

**📅 Son Güncelleme**: 2025-10-01 (Comprehensive Backend Completed)
**👤 Oluşturan**: Agent Mode Terminal Assistant  
**🎯 Amaç**: NextGen Smart Variants - Full-Stack Product Variant Management App
**🚀 Status**: Backend API Ready, Frontend Development Next
