// NextGen Smart Variants - Shopify Service
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');
const axios = require('axios');

class ShopifyService {
  constructor() {
    // Initialize API only if we have credentials
    if (process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET) {
      try {
        this.api = shopifyApi({
          apiKey: process.env.SHOPIFY_API_KEY,
          apiSecretKey: process.env.SHOPIFY_API_SECRET,
          scopes: ['read_products', 'write_products', 'read_product_listings', 'write_product_listings'],
          hostName: 'localhost:3000',
          apiVersion: LATEST_API_VERSION,
          isEmbeddedApp: true
        });
      } catch (error) {
        console.warn('Shopify API initialization failed:', error.message);
        this.api = null;
      }
    } else {
      console.warn('Shopify API credentials not found, running in development mode');
      this.api = null;
    }
  }

  // Get all products with pagination
  async getAllProducts(session, limit = 50, cursor = null) {
    if (!this.api || process.env.NODE_ENV === 'development') {
      // Return mock data for development
      return this.getMockProducts(limit);
    }
    
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const query = `
        query getProducts($first: Int!, $after: String) {
          products(first: $first, after: $after) {
            edges {
              cursor
              node {
                id
                title
                handle
                description
                vendor
                productType
                tags
                status
                createdAt
                updatedAt
                publishedAt
                totalVariants
                collections(first: 10) {
                  edges {
                    node {
                      id
                      title
                      handle
                    }
                  }
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      sku
                      price
                      compareAtPrice
                      availableForSale
                      selectedOptions {
                        name
                        value
                      }
                      image {
                        id
                        url
                        altText
                      }
                    }
                  }
                }
                images(first: 10) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query,
          variables: {
            first: limit,
            after: cursor
          }
        }
      });

      return response.body.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get single product by ID
  async getProduct(session, productId) {
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const query = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            handle
            description
            vendor
            productType
            tags
            status
            createdAt
            updatedAt
            publishedAt
            totalVariants
            collections(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  sku
                  price
                  compareAtPrice
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    id
                    url
                    altText
                  }
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query,
          variables: { id: productId }
        }
      });

      return response.body.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get products by collection
  async getProductsByCollection(session, collectionId, limit = 50) {
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const query = `
        query getCollectionProducts($id: ID!, $first: Int!) {
          collection(id: $id) {
            id
            title
            handle
            products(first: $first) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  vendor
                  productType
                  tags
                  totalVariants
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        selectedOptions {
                          name
                          value
                        }
                        image {
                          id
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query,
          variables: {
            id: collectionId,
            first: limit
          }
        }
      });

      return response.body.data.collection.products;
    } catch (error) {
      console.error('Error fetching collection products:', error);
      throw error;
    }
  }

  // Get all collections
  async getAllCollections(session, limit = 50) {
    if (!this.api || process.env.NODE_ENV === 'development') {
      return this.getMockCollections();
    }
    
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const query = `
        query getCollections($first: Int!) {
          collections(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
                productsCount
              }
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query,
          variables: { first: limit }
        }
      });

      return response.body.data.collections;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  }

  // Update product metafield (for storing NextGen data)
  async updateProductMetafield(session, productId, namespace, key, value, type = 'json') {
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const mutation = `
        mutation productUpdate($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
              metafields(first: 10, namespace: "${namespace}") {
                edges {
                  node {
                    id
                    namespace
                    key
                    value
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query: mutation,
          variables: {
            input: {
              id: productId,
              metafields: [{
                namespace,
                key,
                value: JSON.stringify(value),
                type
              }]
            }
          }
        }
      });

      return response.body.data.productUpdate;
    } catch (error) {
      console.error('Error updating product metafield:', error);
      throw error;
    }
  }

  // Get product metafields
  async getProductMetafields(session, productId, namespace = 'nextgen_variants') {
    try {
      const client = new this.api.clients.Graphql({ session });
      
      const query = `
        query getProductMetafields($id: ID!, $namespace: String!) {
          product(id: $id) {
            id
            metafields(first: 20, namespace: $namespace) {
              edges {
                node {
                  id
                  namespace
                  key
                  value
                  type
                }
              }
            }
          }
        }
      `;

      const response = await client.query({
        data: {
          query,
          variables: {
            id: productId,
            namespace
          }
        }
      });

      return response.body.data.product.metafields;
    } catch (error) {
      console.error('Error fetching product metafields:', error);
      throw error;
    }
  }

  // Create/update theme snippet for variant display
  async updateThemeSnippet(session, themeId, snippetName, content) {
    try {
      const client = new this.api.clients.Rest({ session });
      
      const response = await client.put({
        path: `themes/${themeId}/assets`,
        data: {
          asset: {
            key: `snippets/${snippetName}.liquid`,
            value: content
          }
        }
      });

      return response.body.asset;
    } catch (error) {
      console.error('Error updating theme snippet:', error);
      throw error;
    }
  }

  // Get theme files
  async getThemeAssets(session, themeId) {
    try {
      const client = new this.api.clients.Rest({ session });
      
      const response = await client.get({
        path: `themes/${themeId}/assets`
      });

      return response.body.assets;
    } catch (error) {
      console.error('Error fetching theme assets:', error);
      throw error;
    }
  }

  // Upload image to Shopify
  async uploadImage(session, imageData, filename) {
    try {
      const client = new this.api.clients.Rest({ session });
      
      const response = await client.post({
        path: 'uploads',
        data: {
          upload: {
            resource: 'image',
            filename,
            image: imageData
          }
        }
      });

      return response.body.upload;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Webhook verification
  verifyWebhook(data, hmacHeader) {
    const crypto = require('crypto');
    const calculated_hmac = crypto
      .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
      .update(data, 'utf8')
      .digest('base64');

    return crypto.timingSafeEqual(
      Buffer.from(calculated_hmac, 'base64'),
      Buffer.from(hmacHeader, 'base64')
    );
  }

  // Helper: Extract variant types from product
  extractVariantTypes(product) {
    const variantTypes = new Map();

    if (product.variants && product.variants.edges) {
      product.variants.edges.forEach(({ node: variant }) => {
        if (variant.selectedOptions) {
          variant.selectedOptions.forEach(option => {
            if (!variantTypes.has(option.name)) {
              variantTypes.set(option.name, new Set());
            }
            variantTypes.get(option.name).add(option.value);
          });
        }
      });
    }

    // Convert to array format
    return Array.from(variantTypes.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
      type: this.detectVariantType(name, Array.from(values))
    }));
  }

  // Helper: Detect variant type based on name and values
  detectVariantType(name, values) {
    const lowercaseName = name.toLowerCase();
    
    // Color detection
    if (lowercaseName.includes('color') || lowercaseName.includes('colour')) {
      return 'color';
    }
    
    // Size detection
    if (lowercaseName.includes('size') || 
        values.some(v => /^(xs|s|m|l|xl|xxl|\d+|\d+\.\d+)$/i.test(v))) {
      return 'size';
    }
    
    // Material detection
    if (lowercaseName.includes('material') || lowercaseName.includes('fabric')) {
      return 'material';
    }
    
    // Style detection
    if (lowercaseName.includes('style') || lowercaseName.includes('type')) {
      return 'style';
    }
    
    return 'custom';
  }

  // Helper: Transform Shopify product to internal format
  transformProduct(shopifyProduct) {
    return {
      shopifyProductId: shopifyProduct.id.replace('gid://shopify/Product/', ''),
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      description: shopifyProduct.description,
      vendor: shopifyProduct.vendor,
      productType: shopifyProduct.productType,
      tags: shopifyProduct.tags,
      collections: shopifyProduct.collections?.edges?.map(({ node }) => ({
        id: node.id.replace('gid://shopify/Collection/', ''),
        title: node.title,
        handle: node.handle
      })) || [],
      shopifyData: {
        createdAt: new Date(shopifyProduct.createdAt),
        updatedAt: new Date(shopifyProduct.updatedAt),
        publishedAt: shopifyProduct.publishedAt ? new Date(shopifyProduct.publishedAt) : null,
        status: shopifyProduct.status,
        totalVariants: shopifyProduct.totalVariants,
        images: shopifyProduct.images?.edges?.map(({ node }) => ({
          id: node.id,
          src: node.url,
          altText: node.altText
        })) || []
      }
    };
  }

  // Mock data methods for development
  getMockProducts(limit = 10) {
    const mockProducts = [];
    
    for (let i = 1; i <= Math.min(limit, 10); i++) {
      mockProducts.push({
        cursor: `cursor_${i}`,
        node: {
          id: `gid://shopify/Product/${1000 + i}`,
          title: `NextGen Test Product ${i}`,
          handle: `test-product-${i}`,
          description: `This is a test product ${i} for NextGen Smart Variants`,
          vendor: 'NextGen Vendor',
          productType: 'Test Product',
          tags: ['test', 'nextgen', 'variants'],
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          totalVariants: 3,
          collections: {
            edges: [{
              node: {
                id: 'gid://shopify/Collection/1001',
                title: 'Test Collection',
                handle: 'test-collection'
              }
            }]
          },
          variants: {
            edges: [
              {
                node: {
                  id: `gid://shopify/ProductVariant/${2000 + i * 3}`,
                  title: 'Small / Red',
                  sku: `TEST-${i}-S-R`,
                  price: '29.99',
                  compareAtPrice: '39.99',
                  availableForSale: true,
                  selectedOptions: [
                    { name: 'Size', value: 'Small' },
                    { name: 'Color', value: 'Red' }
                  ],
                  image: {
                    id: `gid://shopify/ProductImage/${3000 + i}`,
                    url: 'https://via.placeholder.com/200x200/ff0000/ffffff?text=Red',
                    altText: 'Red variant'
                  }
                }
              },
              {
                node: {
                  id: `gid://shopify/ProductVariant/${2000 + i * 3 + 1}`,
                  title: 'Medium / Blue',
                  sku: `TEST-${i}-M-B`,
                  price: '34.99',
                  compareAtPrice: '44.99',
                  availableForSale: true,
                  selectedOptions: [
                    { name: 'Size', value: 'Medium' },
                    { name: 'Color', value: 'Blue' }
                  ],
                  image: {
                    id: `gid://shopify/ProductImage/${3000 + i + 10}`,
                    url: 'https://via.placeholder.com/200x200/0000ff/ffffff?text=Blue',
                    altText: 'Blue variant'
                  }
                }
              },
              {
                node: {
                  id: `gid://shopify/ProductVariant/${2000 + i * 3 + 2}`,
                  title: 'Large / Green',
                  sku: `TEST-${i}-L-G`,
                  price: '39.99',
                  compareAtPrice: '49.99',
                  availableForSale: true,
                  selectedOptions: [
                    { name: 'Size', value: 'Large' },
                    { name: 'Color', value: 'Green' }
                  ],
                  image: {
                    id: `gid://shopify/ProductImage/${3000 + i + 20}`,
                    url: 'https://via.placeholder.com/200x200/00ff00/ffffff?text=Green',
                    altText: 'Green variant'
                  }
                }
              }
            ]
          },
          images: {
            edges: [
              {
                node: {
                  id: `gid://shopify/ProductImage/${3000 + i}`,
                  url: `https://via.placeholder.com/400x400/cccccc/333333?text=Product${i}`,
                  altText: `Test Product ${i} main image`
                }
              }
            ]
          }
        }
      });
    }
    
    return {
      edges: mockProducts,
      pageInfo: {
        hasNextPage: false,
        endCursor: `cursor_${limit}`
      }
    };
  }

  getMockCollections() {
    return {
      edges: [
        {
          node: {
            id: 'gid://shopify/Collection/1001',
            title: 'Test Collection',
            handle: 'test-collection',
            description: 'Test collection for NextGen Smart Variants',
            productsCount: 10
          }
        },
        {
          node: {
            id: 'gid://shopify/Collection/1002',
            title: 'Featured Products',
            handle: 'featured-products',
            description: 'Featured products collection',
            productsCount: 5
          }
        }
      ]
    };
  }
}

module.exports = new ShopifyService();