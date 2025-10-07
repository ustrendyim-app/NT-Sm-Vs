import React, { useState, useEffect } from 'react'
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Select, 
  Stack,
  ButtonGroup,
  Button,
  Divider 
} from '@shopify/polaris'
import VariantVisualizer from '../components/VariantVisualizer'
import { apiService } from '../services/api'

const Preview = () => {
  const [selectedPosition, setSelectedPosition] = useState('above_price')
  const [selectedLayout, setSelectedLayout] = useState('horizontal')
  const [selectedSize, setSelectedSize] = useState('medium')
  const [mockProduct, setMockProduct] = useState(null)

  useEffect(() => {
    // Generate mock product data for preview
    const generateMockProduct = () => {
      return {
        id: 'preview-product-1',
        title: 'NextGen Preview Product',
        handle: 'nextgen-preview-product',
        variants: [
          {
            id: 'variant-1',
            title: 'Small / Red',
            price: '29.99',
            compareAtPrice: '39.99',
            availableForSale: true,
            sku: 'NGV-S-RED-001',
            selectedOptions: [
              { name: 'Size', value: 'Small' },
              { name: 'Color', value: 'Red' }
            ],
            image: {
              url: 'https://via.placeholder.com/200x200/ff0000/ffffff?text=Red',
              altText: 'Red variant'
            }
          },
          {
            id: 'variant-2',
            title: 'Medium / Blue',
            price: '34.99',
            compareAtPrice: null,
            availableForSale: true,
            sku: 'NGV-M-BLUE-002',
            selectedOptions: [
              { name: 'Size', value: 'Medium' },
              { name: 'Color', value: 'Blue' }
            ],
            image: {
              url: 'https://via.placeholder.com/200x200/0000ff/ffffff?text=Blue',
              altText: 'Blue variant'
            }
          },
          {
            id: 'variant-3',
            title: 'Large / Green',
            price: '39.99',
            compareAtPrice: '49.99',
            availableForSale: false,
            sku: 'NGV-L-GREEN-003',
            selectedOptions: [
              { name: 'Size', value: 'Large' },
              { name: 'Color', value: 'Green' }
            ],
            image: {
              url: 'https://via.placeholder.com/200x200/00ff00/ffffff?text=Green',
              altText: 'Green variant'
            }
          },
          {
            id: 'variant-4',
            title: 'XL / Black',
            price: '44.99',
            compareAtPrice: null,
            availableForSale: true,
            sku: 'NGV-XL-BLACK-004',
            selectedOptions: [
              { name: 'Size', value: 'XL' },
              { name: 'Color', value: 'Black' }
            ],
            image: {
              url: 'https://via.placeholder.com/200x200/000000/ffffff?text=Black',
              altText: 'Black variant'
            }
          }
        ]
      }
    }

    setMockProduct(generateMockProduct())
  }, [])

  const positionOptions = [
    { label: 'Above Price', value: 'above_price' },
    { label: 'Below Price', value: 'below_price' },
    { label: 'Above Title', value: 'above_title' },
    { label: 'Below Title', value: 'below_title' },
    { label: 'Custom', value: 'custom' }
  ]

  const layoutOptions = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
    { label: 'Grid', value: 'grid' }
  ]

  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ]

  const handleVariantChange = (variant) => {
    console.log('Selected variant:', variant)
  }

  const generateShortcode = () => {
    const options = []
    if (selectedPosition !== 'above_price') options.push(`position="${selectedPosition}"`)
    if (selectedLayout !== 'horizontal') options.push(`layout="${selectedLayout}"`)
    if (selectedSize !== 'medium') options.push(`size="${selectedSize}"`)
    
    const optionsStr = options.length > 0 ? ` ${options.join(' ')}` : ''
    return `{% nextgen_variants product${optionsStr} %}`
  }

  const generateJavaScriptCode = () => {
    return `<div id="nextgen-variants-{{product.id}}"></div>
<script>
  NextGenVariants.render(document.getElementById('nextgen-variants-{{product.id}}'), {
    product: {{ product | json }},
    position: '${selectedPosition}',
    layout: '${selectedLayout}',
    size: '${selectedSize}'
  });
</script>`
  }

  return (
    <Page 
      title="Variant Display Preview" 
      subtitle="Test and preview variant visualizations"
    >
      <Layout>
        {/* Controls */}
        <Layout.Section secondary>
          <Card title="Display Settings" sectioned>
            <Stack vertical>
              <Select
                label="Position"
                options={positionOptions}
                value={selectedPosition}
                onChange={setSelectedPosition}
              />
              
              <Select
                label="Layout"
                options={layoutOptions}
                value={selectedLayout}
                onChange={setSelectedLayout}
              />
              
              <Select
                label="Size"
                options={sizeOptions}
                value={selectedSize}
                onChange={setSelectedSize}
              />
            </Stack>
          </Card>

          <Card title="Implementation Code" sectioned>
            <Stack vertical>
              <Text variant="headingMd" as="h3">
                Liquid Shortcode
              </Text>
              <div style={{ 
                backgroundColor: '#f6f6f7', 
                padding: '1rem', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                border: '1px solid #e1e5e9'
              }}>
                {generateShortcode()}
              </div>

              <Text variant="headingMd" as="h3">
                JavaScript Integration
              </Text>
              <div style={{ 
                backgroundColor: '#f6f6f7', 
                padding: '1rem', 
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                border: '1px solid #e1e5e9',
                whiteSpace: 'pre'
              }}>
                {generateJavaScriptCode()}
              </div>
            </Stack>
          </Card>
        </Layout.Section>

        {/* Preview */}
        <Layout.Section>
          <Card title="Live Preview" sectioned>
            <Stack vertical spacing="loose">
              {/* Mock Product Info */}
              <div>
                <Text variant="headingLg" as="h2">
                  NextGen Preview Product
                </Text>
                <Text variant="bodyMd" as="p" color="subdued">
                  This is a sample product for testing variant display
                </Text>
              </div>

              <Divider />

              {/* Above Title Position Preview */}
              {selectedPosition === 'above_title' && mockProduct && (
                <VariantVisualizer
                  product={mockProduct}
                  position={selectedPosition}
                  style={{
                    layout: selectedLayout,
                    size: selectedSize
                  }}
                  onVariantChange={handleVariantChange}
                  showPrice={false}
                />
              )}

              {/* Product Title */}
              <Text variant="headingMd" as="h3">
                Product Title Here
              </Text>

              {/* Below Title Position Preview */}
              {selectedPosition === 'below_title' && mockProduct && (
                <VariantVisualizer
                  product={mockProduct}
                  position={selectedPosition}
                  style={{
                    layout: selectedLayout,
                    size: selectedSize
                  }}
                  onVariantChange={handleVariantChange}
                  showPrice={false}
                />
              )}

              {/* Above Price Position Preview */}
              {selectedPosition === 'above_price' && mockProduct && (
                <VariantVisualizer
                  product={mockProduct}
                  position={selectedPosition}
                  style={{
                    layout: selectedLayout,
                    size: selectedSize
                  }}
                  onVariantChange={handleVariantChange}
                  showPrice={false}
                />
              )}

              {/* Mock Price */}
              <div>
                <Text variant="headingMd" as="h3" color="success">
                  $29.99
                  <Text variant="bodyMd" as="span" color="subdued">
                    {' '}was $39.99
                  </Text>
                </Text>
              </div>

              {/* Below Price Position Preview */}
              {selectedPosition === 'below_price' && mockProduct && (
                <VariantVisualizer
                  product={mockProduct}
                  position={selectedPosition}
                  style={{
                    layout: selectedLayout,
                    size: selectedSize
                  }}
                  onVariantChange={handleVariantChange}
                  showPrice={false}
                />
              )}

              {/* Custom Position Preview */}
              {selectedPosition === 'custom' && mockProduct && (
                <div style={{ 
                  border: '2px dashed #e1e5e9', 
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#fafbfc'
                }}>
                  <Text variant="bodyMd" as="p" color="subdued">
                    Custom position - place anywhere in your template
                  </Text>
                  <div style={{ marginTop: '1rem' }}>
                    <VariantVisualizer
                      product={mockProduct}
                      position={selectedPosition}
                      style={{
                        layout: selectedLayout,
                        size: selectedSize
                      }}
                      onVariantChange={handleVariantChange}
                      showPrice={false}
                    />
                  </div>
                </div>
              )}

              <Divider />

              <Text variant="bodyMd" as="p" color="subdued">
                💡 This preview shows how variants will appear on your product pages.
                Use the controls on the right to customize the appearance.
              </Text>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Preview