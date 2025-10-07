import React from 'react'
import { Card, Text, Stack } from '@shopify/polaris'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const ChartCard = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card title={title} sectioned>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Text variant="bodyMd" as="p" color="subdued">
            No data available
          </Text>
        </div>
      </Card>
    )
  }

  // Transform data for chart
  const chartData = Object.entries(data).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    type: type
  }))

  // Colors for different variant types
  const colors = {
    color: '#6366f1',
    size: '#10b981',
    material: '#f59e0b',
    style: '#ef4444',
    custom: '#8b5cf6'
  }

  return (
    <Card title={title} sectioned>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.type] || '#6b7280'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <Stack vertical spacing="tight">
          <Text variant="headingMd" as="h4">
            Variant Types Summary
          </Text>
          {chartData.map((item) => (
            <Stack key={item.type} distribution="equalSpacing">
              <Text variant="bodyMd" as="span">
                {item.name}
              </Text>
              <Text variant="bodyMd" as="span" color="subdued">
                {item.value} variants
              </Text>
            </Stack>
          ))}
        </Stack>
      </div>
    </Card>
  )
}

export default ChartCard