import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { fn } from '@storybook/test'
import { PaginationBar } from './PaginationBar'

const meta: Meta<typeof PaginationBar> = {
  title: 'Components/PaginationBar',
  component: PaginationBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A pagination control with results summary.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PaginationBar>

const PaginationBarWithState = (args: React.ComponentProps<typeof PaginationBar>) => {
  const [page, setPage] = useState(args.page)
  return <PaginationBar {...args} page={page} onPageChange={setPage} />
}

export const Default: Story = {
  name: 'Default',
  render: (args) => <PaginationBarWithState {...args} />,
  args: {
    page: 1,
    totalPages: 9,
    total: 82,
  },
}

export const MiddlePage: Story = {
  name: 'Middle page',
  render: (args) => <PaginationBarWithState {...args} />,
  args: {
    page: 5,
    totalPages: 9,
    total: 82,
  },
}

export const LastPage: Story = {
  name: 'Last page',
  render: (args) => <PaginationBarWithState {...args} />,
  args: {
    page: 9,
    totalPages: 9,
    total: 82,
  },
}

export const SinglePage: Story = {
  name: 'Single page',
  render: (args) => <PaginationBarWithState {...args} />,
  args: {
    page: 1,
    totalPages: 1,
    total: 6,
    onPageChange: () => {},
  },
}
