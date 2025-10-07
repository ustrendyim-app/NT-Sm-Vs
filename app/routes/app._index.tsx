import { useEffect, useState } from "react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "react-router";
import { useFetcher, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Mock data for testing - replace with real Shopify API calls later
  const mockProducts = [
    {
      id: "gid://shopify/Product/1",
      title: "NextGen Smart T-Shirt",
      handle: "nextgen-smart-tshirt",
      status: "ACTIVE",
      price: "29.99",
      vendor: "NextGen Apparel",
      productType: "T-Shirts",
      featuredImage: {
        url: "https://via.placeholder.com/300x300/667eea/white?text=T-Shirt",
        altText: "NextGen Smart T-Shirt"
      },
      variantCount: 3,
      firstVariantId: "gid://shopify/ProductVariant/1",
      variants: [
        {
          id: "gid://shopify/ProductVariant/1",
          title: "Small / Red",
          price: "29.99",
          compareAtPrice: "39.99",
          sku: "TSHIRT-SM-RED",
          inventoryQuantity: 10,
          selectedOptions: [
            { name: "Size", value: "Small" },
            { name: "Color", value: "Red" }
          ],
          image: {
            url: "https://via.placeholder.com/150x150/ff6b6b/white?text=SM+RED",
            altText: "Small Red T-Shirt"
          }
        },
        {
          id: "gid://shopify/ProductVariant/2",
          title: "Medium / Blue",
          price: "29.99",
          compareAtPrice: "39.99",
          sku: "TSHIRT-MD-BLUE",
          inventoryQuantity: 15,
          selectedOptions: [
            { name: "Size", value: "Medium" },
            { name: "Color", value: "Blue" }
          ],
          image: {
            url: "https://via.placeholder.com/150x150/4ecdc4/white?text=MD+BLUE",
            altText: "Medium Blue T-Shirt"
          }
        },
        {
          id: "gid://shopify/ProductVariant/3",
          title: "Large / Green",
          price: "29.99",
          compareAtPrice: "39.99",
          sku: "TSHIRT-LG-GREEN",
          inventoryQuantity: 8,
          selectedOptions: [
            { name: "Size", value: "Large" },
            { name: "Color", value: "Green" }
          ],
          image: {
            url: "https://via.placeholder.com/150x150/95e1d3/white?text=LG+GREEN",
            altText: "Large Green T-Shirt"
          }
        }
      ],
      options: [
        { name: "Size", values: ["Small", "Medium", "Large"] },
        { name: "Color", values: ["Red", "Blue", "Green"] }
      ]
    },
    {
      id: "gid://shopify/Product/2",
      title: "Smart Variant Hoodie",
      handle: "smart-variant-hoodie",
      status: "ACTIVE",
      price: "59.99",
      vendor: "NextGen Apparel",
      productType: "Hoodies",
      featuredImage: {
        url: "https://via.placeholder.com/300x300/764ba2/white?text=Hoodie",
        altText: "Smart Variant Hoodie"
      },
      variantCount: 2,
      firstVariantId: "gid://shopify/ProductVariant/4",
      variants: [
        {
          id: "gid://shopify/ProductVariant/4",
          title: "Medium / Black",
          price: "59.99",
          compareAtPrice: "79.99",
          sku: "HOODIE-MD-BLACK",
          inventoryQuantity: 5,
          selectedOptions: [
            { name: "Size", value: "Medium" },
            { name: "Color", value: "Black" }
          ],
          image: {
            url: "https://via.placeholder.com/150x150/2c3e50/white?text=MD+BLACK",
            altText: "Medium Black Hoodie"
          }
        },
        {
          id: "gid://shopify/ProductVariant/5",
          title: "Large / Gray",
          price: "59.99",
          compareAtPrice: "79.99",
          sku: "HOODIE-LG-GRAY",
          inventoryQuantity: 12,
          selectedOptions: [
            { name: "Size", value: "Large" },
            { name: "Color", value: "Gray" }
          ],
          image: {
            url: "https://via.placeholder.com/150x150/95a5a6/white?text=LG+GRAY",
            altText: "Large Gray Hoodie"
          }
        }
      ],
      options: [
        { name: "Size", values: ["Medium", "Large"] },
        { name: "Color", values: ["Black", "Gray"] }
      ]
    }
  ];

  return { 
    products: mockProducts,
    totalFetched: mockProducts.length
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Mock action for testing - replace with real Shopify API calls later
  const formData = await request.formData();
  const actionType = formData.get('actionType') as string;
  
  // Simulate successful response
  return { success: true, type: actionType || 'test', message: 'Mock action completed' };
};

interface Variant {
  id: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  sku?: string;
  inventoryQuantity?: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: {
    url: string;
    altText?: string;
  };
}

interface Product {
  id: string;
  title: string;
  handle: string;
  status: string;
  price: string;
  vendor: string;
  productType: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  variantCount: number;
  firstVariantId?: string;
  variants: Variant[];
  options: Array<{
    name: string;
    values: string[];
  }>;
}

export default function NextGenSmartVariantsApp() {
  // Version indicator for testing
  useEffect(() => {
    console.log('🚀 NextGen Smart Variants - VERSION 9 - Build Fixed');
  }, []);
  
  const { products: initialProducts, totalFetched } = useLoaderData<typeof loader>();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previewMode, setPreviewMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [previewSize, setPreviewSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  const fetcher = useFetcher();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Handle API responses (simplified for testing)
  useEffect(() => {
    if (fetcher.data) {
      const response = fetcher.data as any;
      if (!response.success) {
        console.log('Update failed:', response.error || 'Unknown error');
      } else {
        console.log('Update successful:', response.type);
      }
    }
  }, [fetcher.data]);

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a202c',
      margin: 0,
      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '16px',
      color: '#718096',
      marginTop: '8px',
      margin: 0
    },
    brandBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#667eea',
      color: 'white',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '24px',
      alignItems: 'flex-start'
    },
    productList: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    },
    productListHeader: {
      padding: '20px',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: '#f8fafc'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: '1px solid #f1f5f9',
      gap: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    productItemActive: {
      backgroundColor: '#eef2ff',
      borderLeftColor: '#667eea',
      borderLeftWidth: '4px'
    },
    productImage: {
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      objectFit: 'cover',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0'
    },
    productInfo: {
      flex: 1
    },
    productTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1a202c',
      margin: '0 0 4px 0'
    },
    productMeta: {
      fontSize: '12px',
      color: '#718096',
      margin: 0
    },
    previewPanel: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '20px'
    },
    previewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e2e8f0'
    },
    previewTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a202c',
      margin: 0
    },
    controlGroup: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    select: {
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      backgroundColor: 'white'
    },
    variantGrid: {
      display: 'grid',
      gap: '12px'
    },
    variantGridHorizontal: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))'
    },
    variantGridVertical: {
      gridTemplateColumns: '1fr'
    },
    variantCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    variantCardHover: {
      borderColor: '#667eea',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
    },
    variantImage: {
      width: '60px',
      height: '60px',
      borderRadius: '6px',
      objectFit: 'cover',
      marginBottom: '8px',
      backgroundColor: '#f9fafb'
    },
    variantTitle: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '4px'
    },
    variantPrice: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#667eea'
    },
    variantOptions: {
      fontSize: '10px',
      color: '#9ca3af',
      marginTop: '2px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#9ca3af'
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    footer: {
      textAlign: 'center',
      padding: '32px 20px',
      marginTop: '40px',
      borderTop: '1px solid #e2e8f0',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>⚡ NextGen Smart Variants</h1>
          <p style={styles.subtitle}>
            Advanced Product Variant Visualization System • {totalFetched} products loaded
          </p>
        </div>
        <div style={styles.brandBadge}>
          <span>🚀</span>
          <span>NextGen App</span>
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.mainGrid}>
        {/* Product List */}
        <div style={styles.productList}>
          <div style={styles.productListHeader}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a202c' }}>
              📦 Product Catalog ({products.length})
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#718096' }}>
              Select a product to preview variant visualization
            </p>
          </div>
          
          <div>
            {products.map((product) => {
              const isActive = selectedProduct?.id === product.id;
              return (
                <div
                  key={product.id}
                  style={{
                    ...styles.productItem,
                    ...(isActive ? styles.productItemActive : {})
                  }}
                  onClick={() => setSelectedProduct(product)}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  {product.featuredImage ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={{
                      ...styles.productImage,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: '#9ca3af'
                    }}>
                      📦
                    </div>
                  )}
                  
                  <div style={styles.productInfo}>
                    <h4 style={styles.productTitle}>{product.title}</h4>
                    <p style={styles.productMeta}>
                      {product.variantCount} variants • ${product.price} • {product.vendor}
                    </p>
                    <p style={styles.productMeta}>
                      {product.productType || 'No category'} • {product.status}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: isActive ? '#667eea' : '#9ca3af',
                    fontWeight: '500'
                  }}>
                    {isActive ? '▶' : '⚡'}
                  </div>
                </div>
              );
            })}
            
            {products.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📦</div>
                <h3 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>No products found</h3>
                <p style={{ margin: 0 }}>Products will appear here when available</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div style={styles.previewPanel}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>🎨 Variant Preview</h3>
            <div style={styles.controlGroup}>
              <select
                value={previewMode}
                onChange={(e) => setPreviewMode(e.target.value as 'horizontal' | 'vertical')}
                style={styles.select}
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
              <select
                value={previewSize}
                onChange={(e) => setPreviewSize(e.target.value as 'small' | 'medium' | 'large')}
                style={styles.select}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          {selectedProduct ? (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>
                  {selectedProduct.title}
                </h4>
                <p style={{ margin: '0', fontSize: '12px', color: '#718096' }}>
                  {selectedProduct.variantCount} variants available
                </p>
              </div>

              <div style={{
                ...styles.variantGrid,
                ...(previewMode === 'horizontal' ? styles.variantGridHorizontal : styles.variantGridVertical)
              }}>
                {selectedProduct.variants.map((variant) => (
                  <div
                    key={variant.id}
                    style={styles.variantCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {variant.image ? (
                      <img
                        src={variant.image.url}
                        alt={variant.image.altText || variant.title}
                        style={{
                          ...styles.variantImage,
                          width: previewSize === 'small' ? '40px' : previewSize === 'large' ? '80px' : '60px',
                          height: previewSize === 'small' ? '40px' : previewSize === 'large' ? '80px' : '60px'
                        }}
                      />
                    ) : (
                      <div style={{
                        ...styles.variantImage,
                        width: previewSize === 'small' ? '40px' : previewSize === 'large' ? '80px' : '60px',
                        height: previewSize === 'small' ? '40px' : previewSize === 'large' ? '80px' : '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: previewSize === 'small' ? '16px' : previewSize === 'large' ? '24px' : '20px',
                        color: '#9ca3af'
                      }}>
                        🎨
                      </div>
                    )}
                    
                    <div style={styles.variantTitle}>{variant.title}</div>
                    <div style={styles.variantPrice}>${variant.price}</div>
                    
                    {variant.selectedOptions.length > 0 && (
                      <div style={styles.variantOptions}>
                        {variant.selectedOptions.map(option => option.value).join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Options Summary */}
              {selectedProduct.options.length > 0 && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <h5 style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>
                    AVAILABLE OPTIONS
                  </h5>
                  {selectedProduct.options.map((option) => (
                    <div key={option.name} style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '500', color: '#374151' }}>
                        {option.name}:
                      </span>
                      <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '4px' }}>
                        {option.values.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🎨</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>No Product Selected</h4>
              <p style={{ margin: 0 }}>Choose a product from the list to preview variants</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
          ⚡ Powered by NextGen Smart Variants
        </p>
        <p style={{ fontSize: '12px', margin: 0 }}>
          © {new Date().getFullYear()} NextGen Development Team - Advanced Shopify Solutions
        </p>
      </div>
    </div>
  );
}

