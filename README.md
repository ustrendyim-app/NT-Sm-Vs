# NextGen Smart Variants - Shopify App

> **Advanced Product Variant Visualization System for Shopify**  
> Transform how customers interact with product variants through intelligent visual displays and universal theme integration.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-repo/nextgen-smart-variants)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Shopify App](https://img.shields.io/badge/Shopify-App-7AB55C.svg)](https://shopify.dev/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Liquid Templates](#liquid-templates)
- [Development](#development)
- [Deployment](#deployment)
- [App Identity](#app-identity)

---

## 🎯 Overview

NextGen Smart Variants is a comprehensive Shopify app that revolutionizes product variant display and interaction. Built with modern web technologies, it provides merchants with powerful tools to showcase product variants through intuitive visualizations and seamless theme integration.

### Key Highlights
- **Universal Theme Compatibility** - Works with any Shopify theme
- **Advanced Variant Visualization** - Color swatches, size selectors, and image galleries
- **Real-time Synchronization** - Instant price and inventory updates
- **Responsive Design** - Optimized for all device types
- **Developer-Friendly** - Comprehensive API and customization options

---

## ✨ Features

### 🎨 Visual Components
- **Color Swatches** - Interactive color selection with hex/RGB support
- **Size Selectors** - Dropdown and button-style size choosers
- **Variant Images** - Dynamic image switching with zoom functionality
- **Price Display** - Smart pricing with compare-at prices and savings

### 🛠️ Admin Dashboard
- **Analytics Dashboard** - Real-time statistics and performance metrics
- **Product Management** - Bulk operations and advanced filtering
- **Preview System** - Live variant visualization testing
- **Settings Panel** - Comprehensive configuration options

### 🔧 Technical Features
- **REST API** - Complete CRUD operations for products and variants
- **GraphQL Integration** - Seamless Shopify API communication
- **MongoDB Support** - Optional database for enhanced features
- **JWT Authentication** - Secure admin access
- **Webhook Support** - Real-time Shopify event handling

### 🎯 Universal Integration
- **Liquid Templates** - Ready-to-use Shopify theme snippets
- **Shortcode System** - Simple embedding with customization options
- **JavaScript API** - Programmatic control and event handling
- **CSS Framework** - Responsive and customizable styling

---

## 📁 Project Structure

```
productimagevariant/
├── 📂 server/                    # Backend Application
│   ├── 📂 config/
│   │   ├── database.js          # MongoDB Configuration
│   │   └── shopify.js           # Shopify API Setup
│   ├── 📂 controllers/
│   │   ├── authController.js    # Authentication Logic
│   │   ├── productController.js # Product Management
│   │   └── variantController.js # Variant Operations
│   ├── 📂 middleware/
│   │   ├── auth.js              # JWT Authentication
│   │   ├── errorHandler.js      # Error Management
│   │   └── requestLogger.js     # Request Logging
│   ├── 📂 models/
│   │   ├── Product.js           # Product Schema
│   │   └── Variant.js           # Variant Schema
│   ├── 📂 routes/
│   │   ├── auth.js              # Auth Endpoints
│   │   ├── products.js          # Product API Routes
│   │   └── variants.js          # Variant API Routes
│   ├── 📂 services/
│   │   ├── shopifyService.js    # Shopify Integration
│   │   └── variantService.js    # Variant Processing
│   ├── 📂 liquid-templates/     # Shopify Theme Integration
│   │   ├── nextgen-variants.liquid        # Main Snippet
│   │   ├── nextgen-color-swatch.liquid    # Color Component
│   │   ├── nextgen-size-selector.liquid   # Size Component
│   │   ├── nextgen-variants-css.liquid    # Styling
│   │   └── nextgen-variants-js.liquid     # JavaScript Logic
│   ├── app.js                   # Express Server
│   └── package.json
├── 📂 client/                   # Frontend Application
│   ├── 📂 public/
│   │   └── index.html
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 Dashboard/    # Dashboard Components
│   │   │   ├── 📂 Products/     # Product Management
│   │   │   ├── 📂 Settings/     # Configuration
│   │   │   └── 📂 VariantVisualizer/  # Visualization Components
│   │   │       ├── VariantVisualizer.jsx
│   │   │       ├── ColorSwatch.jsx
│   │   │       ├── SizeSelector.jsx
│   │   │       ├── VariantImage.jsx
│   │   │       └── PriceDisplay.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Dashboard.jsx    # Main Dashboard
│   │   │   ├── Products.jsx     # Product Management
│   │   │   ├── Settings.jsx     # App Settings
│   │   │   └── Preview.jsx      # Variant Preview
│   │   ├── 📂 services/
│   │   │   └── api.js           # API Communication
│   │   ├── 📂 utils/
│   │   │   └── constants.js     # App Constants
│   │   ├── App.jsx              # Main React App
│   │   └── main.jsx             # App Entry Point
│   ├── package.json
│   └── vite.config.js
├── 📂 docs/                     # Documentation
├── .env.example                 # Environment Template
├── .gitignore
├── shopify.app.toml             # Shopify App Config
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (optional, for advanced features)
- **Shopify CLI** (for development)

### Quick Start

1. **Navigate to Project Directory**
   ```powershell
   cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"
   ```

2. **Install Dependencies**
   ```powershell
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```powershell
   # Copy environment template
   cp .env.example .env
   
   # Edit environment variables
   notepad .env
   ```

4. **Start Development Servers**
   ```powershell
   # Terminal 1: Backend (Port 3001)
   cd server
   npm run dev
   
   # Terminal 2: Frontend (Port 5173)
   cd client
   npm run dev
   
   # Terminal 3: Shopify CLI (Development Tunnel)
   shopify app serve
   ```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Application Settings
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nextgen-variants

# Shopify API Configuration
SHOPIFY_API_KEY=285217980417
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret_here
SHOPIFY_SCOPES=read_products,write_products,read_themes,write_themes

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# App Configuration
APP_URL=https://your-app-url.ngrok.io
SHOPIFY_APP_ID=285217980417
```

### Shopify App Configuration

Update `shopify.app.toml`:

```toml
# Learn more about configuring your app at https://shopify.dev/docs/apps/tools/cli/configuration

name = "nextgen-smart-variants"
client_id = "285217980417"
application_url = "https://your-app-url.ngrok.io"
embedded = true

[access_scopes]
scopes = "read_products,write_products,read_themes,write_themes"

[auth]
redirect_urls = [
  "https://your-app-url.ngrok.io/api/auth/callback"
]

[webhooks]
api_version = "2023-10"

  [[webhooks.subscriptions]]
  topics = ["products/create", "products/update", "products/delete"]
  uri = "https://your-app-url.ngrok.io/api/webhooks/products"
```

---

## 🎯 Usage

### Admin Dashboard Access

1. **Development Environment:**
   ```
   http://localhost:5173
   ```

2. **Production Environment:**
   ```
   https://your-domain.com/admin
   ```

### Theme Integration

#### Method 1: Liquid Include (Recommended)

Add to your product template (`product.liquid` or `product-form.liquid`):

```liquid
{% comment %} NextGen Smart Variants Integration {% endcomment %}
{% include 'nextgen-variants', 
    product: product, 
    position: 'above_price',
    layout: 'horizontal',
    size: 'medium' %}
```

#### Method 2: Shortcode System

Add anywhere in your theme:

```liquid
{% comment %} Basic Implementation {% endcomment %}
{% include 'nextgen-variants', product: product %}

{% comment %} Advanced Configuration {% endcomment %}
{% include 'nextgen-variants', 
    product: product,
    position: 'below_title',
    layout: 'vertical',
    size: 'large',
    show_price: true,
    show_inventory: true,
    color_style: 'swatch',
    size_style: 'buttons' %}
```

#### Method 3: JavaScript API

For custom implementations:

```javascript
// Initialize variant visualizer
const container = document.getElementById('variant-container');
NextGenVariants.render(container, {
  product: productData,
  layout: 'horizontal',
  size: 'medium',
  onVariantChange: (variant) => {
    console.log('Variant changed:', variant);
  }
});

// Manual option selection
NextGenVariants.selectOption('Color', 'Red', productId);

// Listen to variant changes
document.addEventListener('nextgen:variant:change', (event) => {
  const { productId, variant, product } = event.detail;
  // Handle variant change
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | String | `above_price` | Where to display: `above_price`, `below_title`, `below_description` |
| `layout` | String | `horizontal` | Layout orientation: `horizontal`, `vertical` |
| `size` | String | `medium` | Component size: `small`, `medium`, `large` |
| `show_price` | Boolean | `true` | Display variant pricing |
| `show_inventory` | Boolean | `true` | Show stock status |
| `color_style` | String | `swatch` | Color display: `swatch`, `dropdown`, `buttons` |
| `size_style` | String | `buttons` | Size display: `buttons`, `dropdown` |

---

## 📚 API Documentation

### Authentication

All API endpoints require JWT authentication header:

```javascript
headers: {
  'Authorization': 'Bearer your_jwt_token_here',
  'Content-Type': 'application/json'
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term
- `status` (string): Product status filter

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

#### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "title": "New Product",
  "description": "Product description",
  "price": 29.99,
  "variants": [...]
}
```

### Variant Endpoints

#### Get All Variants
```http
GET /api/variants
```

#### Bulk Create Variants
```http
POST /api/variants/bulk-create
Content-Type: application/json

{
  "productId": "product_id",
  "variants": [
    {
      "option1": "Red",
      "option2": "Small",
      "price": 29.99
    },
    {
      "option1": "Blue", 
      "option2": "Medium",
      "price": 32.99
    }
  ]
}
```

---

## 🎨 Liquid Templates

### Available Template Files

1. **`nextgen-variants.liquid`** - Main embedding snippet with shortcode support
2. **`nextgen-color-swatch.liquid`** - Color swatch display component  
3. **`nextgen-size-selector.liquid`** - Size selector component
4. **`nextgen-variants-css.liquid`** - Complete CSS styling system
5. **`nextgen-variants-js.liquid`** - Full JavaScript functionality

### Template Usage Examples

#### Main Template Integration
```liquid
{% comment %}
  NextGen Smart Variants - Main Integration Template
  
  Usage:
  {% include 'nextgen-variants', 
      product: product,
      position: 'above_price',
      layout: 'horizontal',
      size: 'medium' %}
{% endcomment %}

{% assign product_id = product.id %}
{% assign variant_position = position | default: 'above_price' %}
{% assign variant_layout = layout | default: 'horizontal' %}
{% assign variant_size = size | default: 'medium' %}

<div class="nextgen-variant-visualizer nextgen-{{ variant_layout }} nextgen-{{ variant_size }}"
     data-product-id="{{ product_id }}"
     data-position="{{ variant_position }}"
     data-layout="{{ variant_layout }}"
     data-size="{{ variant_size }}">
  
  {% comment %} Color Options {% endcomment %}
  {% if product.options contains 'Color' %}
    {% include 'nextgen-color-swatch', product: product %}
  {% endif %}
  
  {% comment %} Size Options {% endcomment %}
  {% if product.options contains 'Size' %}
    {% include 'nextgen-size-selector', product: product %}
  {% endif %}
  
  {% comment %} Variant Information Display {% endcomment %}
  <div class="nextgen-variant-info" style="display: none;">
    <div class="nextgen-selected-variant"></div>
  </div>
  
</div>

{% comment %} Include CSS and JS {% endcomment %}
{% include 'nextgen-variants-css' %}
{% include 'nextgen-variants-js' %}
```

### CSS Classes Reference

| Class | Purpose |
|-------|----------|
| `.nextgen-variant-visualizer` | Main container |
| `.nextgen-horizontal`, `.nextgen-vertical` | Layout modifiers |
| `.nextgen-small`, `.nextgen-medium`, `.nextgen-large` | Size modifiers |
| `.nextgen-color-swatch` | Color selection button |
| `.nextgen-size-button` | Size selection button |
| `.nextgen-selected` | Selected state |
| `.nextgen-unavailable` | Unavailable variant state |
| `.nextgen-price-display` | Price information container |

---

## 🛠️ Development

### Prerequisites Setup

#### Shopify CLI Installation
```powershell
# Install Shopify CLI (Windows)
winget install shopify.shopifycli

# Or via npm (alternative)
npm install -g @shopify/cli @shopify/theme

# Verify installation
shopify version
```

#### Shopify Authentication
```powershell
# Authenticate with Shopify
shopify auth login

# Login with specific store (if needed)
shopify auth login --store=your-store.myshopify.com

# Check current authentication status
shopify auth whoami
```

### Development Commands

#### Initial Project Setup
```powershell
# Navigate to project directory
cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"

# Initialize Shopify app (if needed)
shopify app init

# Link existing app
shopify app link --client-id=285217980417
```

#### Backend Development
```powershell
cd server
npm run dev  # Uses nodemon for auto-restart

# Alternative: Direct node execution
node app.js

# Debug mode
node --inspect app.js
```

#### Frontend Development
```powershell
cd client
npm run dev  # Vite dev server with HMR

# Build for development
npm run build:dev

# Preview built app
npm run preview
```

#### Shopify Development Server
```powershell
# Start development tunnel (recommended)
shopify app serve

# Specify port (if needed)
shopify app serve --port=3001

# With specific theme
shopify app serve --theme=your-theme-id

# Force HTTPS tunnel
shopify app serve --tunnel-url=https://your-tunnel.ngrok.io
```

#### Complete Development Startup
```powershell
# Method 1: Manual startup (3 terminals)
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend  
cd client && npm run dev

# Terminal 3: Shopify tunnel
shopify app serve

# Method 2: Using concurrently (if configured)
npm run dev:all
```

### Development Scripts

#### Backend (`server/package.json`)
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

#### Frontend (`client/package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext js,jsx"
  }
}
```

### Testing

#### Local Testing
```powershell
# Test backend API
Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing

# Test frontend
Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
```

#### Unit Tests
```powershell
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

---

## 🚢 Deployment

### Production Build

1. **Build Frontend**:
   ```powershell
   cd client
   npm run build
   ```

2. **Prepare Backend**:
   ```powershell
   cd server
   npm install --production
   ```

### Shopify App Store Submission

1. **Update App Metadata**:
   ```toml
   # shopify.app.toml
   [build]
   automatically_update_urls_on_dev = true
   dev_store_url = "your-dev-store.myshopify.com"
   ```

2. **Submit for Review**:
   ```powershell
   shopify app release
   ```

---

## 🆔 App Identity

### Shopify App Details
- **App ID**: 285217980417
- **Client ID**: 285217980417
- **Handle**: nextgen-smart-variants-1
- **Name**: NextGen Smart Variants
- **Purpose**: Advanced product variant visualization and management
- **API Version**: 2024-01 (Latest)
- **Development Store**: quickstart-dev-store.myshopify.com

### Shopify App Configuration (shopify.app.toml)
```toml
name = "NextGen Smart Variants"
handle = "nextgen-smart-variants-1"
client_id = "285217980417"
application_url = "https://localhost:8081"

[build]
automatically_update_urls_on_dev = true
dev_store_url = "https://quickstart-dev-store.myshopify.com"
include_config_on_deploy = true

[access_scopes]
scopes = "write_products,read_products,write_product_listings,read_product_listings,read_inventory,write_inventory"

[auth]
redirect_urls = [
  "https://localhost:8081/api/auth/callback",
  "https://localhost:8081/auth/shopify/callback"
]

[webhooks]
api_version = "2024-01"

[pos]
embedded = false

[[app_proxy]]
url = "https://localhost:8081/api/proxy/nextgen-variants"
subpath = "nextgen-smart-variants"
prefix = "apps"
```

### Required Shopify Permissions
- **write_products** - Create and modify products
- **read_products** - Access product information
- **write_product_listings** - Manage product listings
- **read_product_listings** - Access product listing data
- **read_inventory** - Check inventory levels
- **write_inventory** - Update inventory quantities

### Development Configuration
- **Backend Port**: 3001
- **Frontend Port**: 5173  
- **Project Location**: `D:\WebProjects\htdocs\shopifyappcenter\productimagevariant`
- **Environment**: Windows development machine

### Unique Features
- **Universal Theme Integration** - Works with any Shopify theme
- **React Admin Dashboard** - Modern, responsive admin interface
- **MongoDB Integration** - Optional database for advanced features
- **Liquid Template System** - Complete theme integration snippets
- **JavaScript API** - Programmatic variant control
- **RESTful API** - Complete backend API system

### Current Development Status
✅ **Backend API** - Complete Express.js server with all endpoints
✅ **Frontend Dashboard** - Full React admin panel with Polaris UI
✅ **Variant Visualizer** - Complete component system for variant display
✅ **Liquid Templates** - Universal theme integration snippets
✅ **JavaScript API** - Frontend interaction and event handling
✅ **Preview System** - Live variant visualization testing
✅ **Authentication** - JWT-based secure admin access
✅ **Database Models** - MongoDB schemas for products and variants
✅ **Shopify Integration** - GraphQL API communication
✅ **Middleware System** - Error handling, logging, and security

### Next Steps
- [ ] Production deployment setup
- [ ] App Store submission preparation
- [ ] Performance optimization
- [ ] Additional testing and QA
- [ ] Documentation completion

---

## 📞 Support & Documentation

### Quick Links
- **Frontend Dashboard**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health
- **Preview System**: http://localhost:5173/preview

### File Locations
- **Main Config**: `shopify.app.toml`
- **Environment**: `server/.env`
- **Liquid Templates**: `server/liquid-templates/`
- **React Components**: `client/src/components/`
- **API Routes**: `server/routes/`

### Complete CLI Command Reference

#### Project Navigation & Setup
```powershell
# Navigate to project directory
cd "D:\WebProjects\htdocs\shopifyappcenter\productimagevariant"

# Check project structure
Get-ChildItem -Recurse -Directory | Select-Object FullName

# Install all dependencies
npm run install-all  # (if configured)

# Or manually:
cd server && npm install && cd ../client && npm install && cd ..
```

#### Shopify CLI Commands
```powershell
# App management
shopify app info                    # Show app details
shopify app list                    # List all your apps
shopify app open                    # Open app in browser
shopify app serve                   # Start development server
shopify app deploy                  # Deploy to production
shopify app release                 # Submit to App Store

# Authentication
shopify auth login                  # Login to Shopify
shopify auth logout                 # Logout from Shopify
shopify auth whoami                 # Check current user

# Store management
shopify store list                  # List accessible stores
shopify store open                  # Open store in browser

# Theme integration (for liquid templates)
shopify theme list                  # List themes
shopify theme open                  # Open theme editor
shopify theme serve                 # Serve theme locally
```

#### Development Workflow
```powershell
# Full development startup (3 terminals)
# Terminal 1: Backend API Server
cd server
npm run dev

# Terminal 2: Frontend React App
cd client
npm run dev

# Terminal 3: Shopify Development Tunnel
shopify app serve

# Alternative: One-command startup (if configured)
npm run dev:all
```

#### Build & Deployment
```powershell
# Build frontend for production
cd client
npm run build

# Build backend for production
cd server
npm install --production

# Deploy to Shopify
shopify app deploy

# Release to App Store (when ready)
shopify app release
```

#### Testing & Quality
```powershell
# Run all tests
npm run test:all

# Backend tests
cd server && npm test

# Frontend tests  
cd client && npm test

# Lint code
npm run lint:all

# Fix linting issues
npm run lint:fix:all

# API health check
Invoke-WebRequest -Uri "http://localhost:3001/api/health" -UseBasicParsing

# Frontend health check
Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
```

#### Environment Management
```powershell
# Check environment variables
Get-Content server\.env

# Copy environment template
Copy-Item .env.example server\.env

# Edit environment file
notepad server\.env

# Verify Node.js and npm versions
node --version
npm --version

# Check Shopify CLI version
shopify version
```

### Troubleshooting Commands

#### Common Issues
```powershell
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
Remove-Item node_modules -Recurse -Force
npm install

# Reset Shopify authentication
shopify auth logout
shopify auth login

# Check port availability
netstat -an | findstr ":3001"
netstat -an | findstr ":5173"

# Kill processes on ports (if stuck)
netstat -ano | findstr ":3001"
Taskkill /PID [PID_NUMBER] /F
```

#### Debugging
```powershell
# Debug backend with inspector
node --inspect server/app.js

# Debug with nodemon
nodemon --inspect server/app.js

# Enable debug logging
$env:DEBUG="nextgen:*"
node server/app.js

# Check log files (if configured)
Get-Content server/logs/error.log -Tail 50
Get-Content server/logs/combined.log -Tail 50
```

---

**🚨 IMPORTANT: This is specifically for NextGen Smart Variants app (ID: 285217980417). Do NOT confuse with other apps!**

**Made with ❤️ for Shopify merchants worldwide**

*Last updated: January 2024*
