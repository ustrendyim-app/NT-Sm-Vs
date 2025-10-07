import React from 'react'
import { Page, Layout, Card, Spinner, Text, Stack } from '@shopify/polaris'

const LoadingPage = () => {
  return (
    <Page title="Loading...">
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <Stack vertical alignment="center" spacing="loose">
                <Spinner size="large" />
                <Text variant="headingMd" as="h2">
                  NextGen Smart Variants
                </Text>
                <Text variant="bodyMd" as="p" color="subdued">
                  Loading your dashboard...
                </Text>
                <Text variant="bodySm" as="p" color="subdued">
                  App ID: 285217980417
                </Text>
              </Stack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default LoadingPage