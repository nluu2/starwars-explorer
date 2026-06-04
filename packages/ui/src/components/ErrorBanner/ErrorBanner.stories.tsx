import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ErrorBanner } from './ErrorBanner'

const meta: Meta<typeof ErrorBanner> = {
  title: 'Components/ErrorBanner',
  component: ErrorBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays an error message with an optional rety button.',
      },
    },
  },
  argTypes: {
    onRetry: { action: 'Retry clicked' },
  },
}

export default meta
type Story = StoryObj<typeof ErrorBanner>

export const WithRetry: Story = {
  name: 'With retry button',
  args: {
    message: 'Failed to load characters. Please check your connection.',
  },
}

export const WithoutRetry: Story = {
  name: 'Without retry button',
  args: {
    message: 'This entity could not be found.',
    onRetry: undefined,
  },
}

export const NetworkError: Story = {
  name: 'Network error',
  args: {
    message: 'Network Error - swapi.dev may be down. Please try again in a moment.',
  },
}
