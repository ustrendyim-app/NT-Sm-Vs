import React from 'react'
import { Layout, Card, Text, Stack } from '@shopify/polaris'

const StatsCards = ({ stats }) => {
  if (!stats) return null

  const { products, variantTypes } = stats

  const statCards = [
    {
      title: 'Total Products',
      value: products?.total || 0,
      trend: 'up',
      color: 'success',
    },
    {
      title: 'Active Products',
      value: products?.active || 0,
      subtitle: 'Display enabled',
      color: 'info',
    },
    {
      title: 'Pending Processing',
      value: products?.pending || 0,
      subtitle: 'Awaiting variant detection',
      color: 'warning',
    },
    {
      title: 'Variant Types',
      value: Object.values(variantTypes || {}).reduce((sum, count) => sum + count, 0),
      subtitle: 'Total detected variants',
      color: 'info',
    },
  ]

  const errorCard = products?.errors > 0 ? {
    title: 'Error Products',
    value: products.errors,
    subtitle: 'Need attention',
    color: 'critical',
  } : null

  return (
    <Layout>
      {statCards.map((stat, index) => (
        <Layout.Section oneThird key={index}>
          <Card>
            <div style={{ padding: '1rem' }}>
              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3" color={stat.color}>
                  {stat.value}
                </Text>
                <Text variant="bodyMd" as="p">
                  {stat.title}
                </Text>
                {stat.subtitle && (
                  <Text variant="bodySm" as="p" color="subdued">
                    {stat.subtitle}
                  </Text>
                )}
              </Stack>
            </div>
          </Card>
        </Layout.Section>
      ))}
      
      {errorCard && (
        <Layout.Section oneThird>
          <Card>
            <div style={{ padding: '1rem' }}>
              <Stack vertical spacing="tight">
                <Text variant="headingMd" as="h3" color="critical">
                  {errorCard.value}
                </Text>
                <Text variant="bodyMd" as="p">
                  {errorCard.title}
                </Text>
                <Text variant="bodySm" as="p" color="subdued">
                  {errorCard.subtitle}
                </Text>
              </Stack>
            </div>
          </Card>
        </Layout.Section>
      )}
    </Layout>
  )
}

export default StatsCards