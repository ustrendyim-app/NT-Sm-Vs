import React from 'react'
import { Page, Layout, Card, Text } from '@shopify/polaris'

const Products = () => {
  return (
    <Page title="Products" subtitle="Manage your products and variant settings">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="bodyMd" as="p">
              Products page coming soon...
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Products