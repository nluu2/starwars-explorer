import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { LoadingContainer } from './LoadingContainer'

const meta: Meta<typeof LoadingContainer> = {
  title: 'Components/LoadingContainer',
  component: LoadingContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A grid of EntityCards shown while data is loading.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LoadingContainer>

export const Default: Story = {
  name: 'Default',
  args: {
    count: 10,
    cols: { base: 1, sm: 2, md: 3 },
  },
}

export const FourColumns: Story = {
  name: 'Four column grid',
  args: {
    count: 8,
    cols: { base: 1, sm: 2, md: 3, lg: 4 },
  },
}

export const SingleColumn: Story = {
  name: 'Single column',
  args: {
    count: 1,
    cols: { base: 1 },
  },
}
