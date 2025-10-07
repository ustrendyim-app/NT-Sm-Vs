import React, { useState, useEffect, useCallback } from 'react'
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  DataTable,
  Badge,
  Stack,
  Spinner,
  Banner,
  ButtonGroup,
} from '@shopify/polaris'
import { RefreshIcon, ExportIcon, ImportIcon } from '@shopify/polaris-icons'
import { apiService, handleApiError } from '../services/api'
import StatsCards from '../components/StatsCards'
import ChartCard from '../components/ChartCard'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState(null)

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async (showSpinner = true) => {
    try {
      if (showSpinner) setIsLoading(true)
      setError(null)
      
      const response = await apiService.getDashboard()
      setDashboardData(response.data)
    } catch (error) {
      const errorDetails = handleApiError(error)
      setError(errorDetails.message)
      console.error('Dashboard fetch error:', errorDetails)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    fetchDashboardData(false)
  }, [fetchDashboardData])

  // Handle sync products
  const handleSyncProducts = useCallback(async () => {
    try {
      setIsSyncing(true)
      const response = await apiService.syncProducts()
      
      // Refresh dashboard after sync
      await fetchDashboardData(false)
      
      console.log('Sync completed:', response.data)
    } catch (error) {
      const errorDetails = handleApiError(error)
      setError(`Sync failed: ${errorDetails.message}`)
    } finally {
      setIsSyncing(false)
    }
  }, [fetchDashboardData])

  // Initial load
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Primary action
  const primaryAction = {
    content: 'Sync Products',
    onAction: handleSyncProducts,
    loading: isSyncing,
    icon: ImportIcon,
  }

  // Secondary actions
  const secondaryActions = [
    {
      content: 'Refresh',
      onAction: handleRefresh,
      loading: isRefreshing,
      icon: RefreshIcon,
    },
    {
      content: 'Export Data',
      onAction: () => console.log('Export clicked'),
      icon: ExportIcon,
    },
  ]

  if (isLoading) {
    return (
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <Spinner size="large" />
                <Text variant="bodyMd" as="p" color="subdued">
                  Loading NextGen Smart Variants dashboard...
                </Text>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  if (error) {
    return (
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Banner
              title="Error loading dashboard"
              status="critical"
              action={{
                content: 'Retry',
                onAction: () => fetchDashboardData(),
              }}
            >
              <Text as="p">{error}</Text>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  return (
    <Page
      title="NextGen Smart Variants"
      subtitle="Product Image Variant Management Dashboard"
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Layout>
        {/* Stats Overview */}
        <Layout.Section>
          <StatsCards stats={dashboardData?.stats} />
        </Layout.Section>

        {/* Charts and Analytics */}
        <Layout.Section secondary>
          <ChartCard 
            title="Variant Types Distribution"
            data={dashboardData?.stats?.variantTypes}
          />
        </Layout.Section>

        {/* Recent Activity */}
        <Layout.Section>
          <Card title="Recent Activity" sectioned>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text']}
              headings={['Product', 'Action', 'Status', 'Time']}
              rows={[
                ['NextGen Test Product 1', 'Variant Detection', <Badge status="success">Completed</Badge>, '2 mins ago'],
                ['NextGen Test Product 2', 'Sync', <Badge status="info">Processing</Badge>, '5 mins ago'],
                ['NextGen Test Product 3', 'Image Upload', <Badge status="success">Completed</Badge>, '10 mins ago'],
                ['NextGen Test Product 4', 'Display Settings', <Badge status="success">Updated</Badge>, '15 mins ago'],
              ]}
            />
          </Card>
        </Layout.Section>

        {/* Quick Actions */}
        <Layout.Section secondary>
          <Card title="Quick Actions" sectioned>
            <Stack vertical>
              <ButtonGroup>
                <Button 
                  onClick={() => console.log('Manage products')}
                  size="large"
                >
                  Manage Products
                </Button>
                <Button 
                  onClick={() => console.log('Configure variants')}
                  size="large"
                >
                  Configure Variants
                </Button>
              </ButtonGroup>
              
              <ButtonGroup>
                <Button 
                  onClick={() => console.log('Upload images')}
                  size="large"
                >
                  Upload Images
                </Button>
                <Button 
                  onClick={() => console.log('View settings')}
                  size="large"
                >
                  View Settings
                </Button>
              </ButtonGroup>
            </Stack>
          </Card>
        </Layout.Section>

        {/* App Info */}
        <Layout.Section>
          <Card title="App Information" sectioned>
            <Stack vertical spacing="tight">
              <Text variant="bodyMd" as="p">
                <strong>App ID:</strong> 285217980417
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Version:</strong> 1.0.0
              </Text>
              <Text variant="bodyMd" as="p">
                <strong>Last Updated:</strong> {dashboardData?.stats?.lastUpdated ? 
                  new Date(dashboardData.stats.lastUpdated).toLocaleString() : 'N/A'}
              </Text>
              <Text variant="bodyMd" as="p" color="subdued">
                NextGen Smart Variants - Product Image Variant Management
              </Text>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default Dashboard