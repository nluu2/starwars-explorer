import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { fn } from '@storybook/test'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A search input with clear button.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

const SearchInputWithState = (args: React.ComponentProps<typeof SearchInput>) => {
  const [value, setValue] = useState(args.value ?? '')
  return <SearchInput {...args} value={value} onChange={setValue} />
}

export const Empty: Story = {
  name: 'Empty state',
  render: (args) => <SearchInputWithState {...args} />,
  args: {
    placeholder: 'Search characters...',
    value: '',
  },
}

export const WithValue: Story = {
  name: 'With value',
  render: (args) => <SearchInputWithState {...args} />,
  args: {
    placeholder: 'Search characters...',
    value: 'Luke',
  },
}

export const Loading: Story = {
  name: 'Loading state',
  render: (args) => <SearchInputWithState {...args} />,
  args: {
    placeholder: 'Search characters...',
    value: 'Luke',
    isLoading: true,
  },
}
