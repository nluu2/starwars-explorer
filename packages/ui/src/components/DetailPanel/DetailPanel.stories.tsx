import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { fn } from '@storybook/test'
import { Button } from '@mantine/core'
import { DetailPanel } from './DetailPanel'
import type { DetailField } from './DetailPanel'

const meta: Meta<typeof DetailPanel> = {
  title: 'Components/DetailPanel',
  component: DetailPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A right side drawer for displaying full entity details.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DetailPanel>

const personFields: DetailField[] = [
  { label: 'Height', value: '172cm' },
  { label: 'Mass', value: '77kg' },
  { label: 'Hair color', value: 'Blond' },
  { label: 'Eye color', value: 'Blue' },
  { label: 'Birth year', value: '19 BBY' },
  { label: 'Gender', value: 'Male' },
]

const DetailPanelWithToggle = (args: React.ComponentProps<typeof DetailPanel>) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setOpened(true)}>Open panel</Button>
      <DetailPanel {...args} opened={opened} onClose={() => setOpened(false)} />
    </>
  )
}

export const PersonDetail: Story = {
  name: 'Person detail',
  render: (args) => <DetailPanelWithToggle {...args} />,
  args: {
    title: 'Luke Skywalker',
    badgeLabel: 'Human',
    badgeColor: 'nebulaBlue',
    fields: personFields,
  },
}

export const Loading: Story = {
  name: 'Loading state',
  render: (args) => <DetailPanelWithToggle {...args} />,
  args: {
    title: 'Loading...',
    fields: [],
    isLoading: true,
  },
}

export const WithUnknownValues: Story = {
  name: 'With unknown values',
  render: (args) => <DetailPanelWithToggle {...args} />,
  args: {
    title: 'Unknown Entity',
    fields: [
      { label: 'Height', value: 'unknown' },
      { label: 'Mass', value: null },
      { label: 'Gender', value: 'n/a' },
    ],
  },
}
