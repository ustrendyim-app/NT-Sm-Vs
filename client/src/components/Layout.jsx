import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Frame,
  Navigation,
  TopBar,
  Toast,
  Loading,
} from '@shopify/polaris'
import {
  HomeIcon,
  ProductIcon,
  CollectionIcon,
  SettingsIcon,
  VariantIcon,
  ViewIcon,
} from '@shopify/polaris-icons'

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Toggle mobile navigation
  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive
    ),
    []
  )

  // Navigation items
  const navigationItems = [
    {
      url: '/dashboard',
      label: 'Dashboard',
      icon: HomeIcon,
      selected: location.pathname === '/dashboard' || location.pathname === '/',
    },
    {
      url: '/products',
      label: 'Products',
      icon: ProductIcon,
      selected: location.pathname === '/products',
      badge: '10', // Will be dynamic
    },
    {
      url: '/collections',
      label: 'Collections',
      icon: CollectionIcon,
      selected: location.pathname === '/collections',
    },
    {
      url: '/variant-types',
      label: 'Variant Types',
      icon: VariantIcon,
      selected: location.pathname === '/variant-types',
      badge: '4', // Will be dynamic
    },
    {
      url: '/preview',
      label: 'Preview',
      icon: ViewIcon,
      selected: location.pathname === '/preview',
    },
    {
      url: '/settings',
      label: 'Settings',
      icon: SettingsIcon,
      selected: location.pathname === '/settings',
    },
  ]

  // Handle navigation
  const handleNavigation = useCallback((item) => {
    navigate(item.url)
    setMobileNavigationActive(false)
  }, [navigate])

  // Top bar content
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )

  // Navigation markup
  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={navigationItems}
        onAction={handleNavigation}
      />
      
      <Navigation.Section
        title="NextGen Smart Variants"
        items={[
          {
            url: 'https://dev.shopify.com/dashboard/185211679/apps/285217980417',
            label: 'Shopify Dashboard',
            external: true,
          },
          {
            url: 'http://localhost:3001/api/info',
            label: 'API Info',
            external: true,
          },
        ]}
      />
    </Navigation>
  )

  // Toast markup
  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      onDismiss={() => setToastActive(false)}
    />
  ) : null

  // Loading markup
  const loadingMarkup = isLoading ? <Loading /> : null

  return (
    <div style={{ height: '100vh' }}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {loadingMarkup}
        {children}
        {toastMarkup}
      </Frame>
    </div>
  )
}

export default Layout