import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Group } from '@mantine/core'
import { StatBadge } from './StatBadge'

const meta: Meta<typeof StatBadge> = {
  title: 'Components/StatBadge',
  component: StatBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A labeled badge for showing single stat inline. Support an optional tooltip.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StatBadge>

export const Default: Story = {
  name: 'Default',
  args: {
    label: 'Height',
    value: '172cm',
  },
}

export const WithTooltip: Story = {
  name: 'With tooltip',
  args: {
    label: 'MGLT',
    value: '10',
    tooltip: 'Megalights per hour (a unit of distance used in space travel',
    color: 'nebulaBlue',
  },
}

export const AllColors: Story = {
  name: 'Color variants',
  render: () => (
    <Group>
      <StatBadge label="Label" value="Value" color="nebulaBlue" />
      <StatBadge label="Label" value="Value" color="imperialGold" />
      <StatBadge label="Label" value="Value" color="green" />
      <StatBadge label="Label" value="Value" color="red" />
      <StatBadge label="Label" value="Value" color="gray" />
    </Group>
  ),
}
