# NextGen Smart Variants - Manual Installation for trendyapps-2

## Current Issue
- App is running on `price-sort.myshopify.com`
- Need to install it on `trendyapps-2.myshopify.com`

## App Details
- **App Name**: nextgen-smart-variants
- **Client ID**: d86ed2f32b31358252e1bbeb1437b8a8
- **Current Store**: price-sort.myshopify.com
- **Target Store**: trendyapps-2.myshopify.com

## Manual Installation Steps

### Step 1: Generate Installation URL
The app installation URL format for Shopify development apps:
```
https://trendyapps-2.myshopify.com/admin/oauth/install_custom_app?client_id=d86ed2f32b31358252e1bbeb1437b8a8
```

### Step 2: Start Development Server
1. Run the development server:
   ```powershell
   shopify app dev --config=nextgen-smart-variants
   ```

2. Note the Cloudflare tunnel URL that will be generated

### Step 3: Update App URLs
1. Update the application_url in shopify.app.nextgen-smart-variants.toml to the Cloudflare tunnel URL
2. Update redirect_urls to use the tunnel URL

### Step 4: Install on trendyapps-2
1. Navigate to: https://admin.shopify.com/store/trendyapps-2/settings/apps
2. Click "Install unlisted app" or use the installation URL above
3. Approve the required permissions

### Step 5: Access the App
Once installed, the app will be available at:
https://admin.shopify.com/store/trendyapps-2/apps/nextgen-smart-variants

## Alternative: Partner Dashboard Method

1. Go to Shopify Partner Dashboard
2. Find the NextGen Smart Variants app
3. Go to App setup → Test your app
4. Select trendyapps-2.myshopify.com as the development store
5. Install the app directly from the dashboard