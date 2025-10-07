import React from 'react'
import { Page, Layout, Card, Text } from '@shopify/polaris'

const Collections = () => {
  return (
    <Page title="Collections" subtitle="Manage collection-based variant settings">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="bodyMd" as="p">
              Collections page coming soon...
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Collections