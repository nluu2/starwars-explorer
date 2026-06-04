import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { CacheIndicator } from './CacheIndicator'

const meta: Meta<typeof CacheIndicator> = {
  title: 'Components/CacheIndicator',
  component: CacheIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A subtle indicator shown when data is being refreshed in the background.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CacheIndicator>

export const Refreshing: Story = {
  name: 'Refreshing',
  args: {
    isRefreshing: true,
  },
}

export const Idle: Story = {
  name: 'Idle (renders nothing)',
  args: {
    isRefreshing: false,
  },
}
