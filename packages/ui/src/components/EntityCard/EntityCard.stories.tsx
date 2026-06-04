import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { EntityCard } from './EntityCard'

const meta: Meta<typeof EntityCard> = {
  title: 'Components/EntityCard',
  component: EntityCard,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    badgeColor: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A generic card component for displaying any Star Wars entity in a list.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EntityCard>

export const Person: Story = {
  name: 'Person entity',
  args: {
    title: 'Luke Skywalker',
    subtitle: 'Tatooine',
    meta: 'Birth year: 19 BBY',
    badgeLabel: 'Male',
    badgeColor: 'nebulaBlue',
  },
}

export const Planet: Story = {
  name: 'Planet entity',
  args: {
    title: 'Tatooine',
    subtitle: 'Arid Desert',
    meta: 'Population: 120,000',
    badgeLabel: 'Planet',
    badgeColor: 'imperialGold',
  },
}

export const Film: Story = {
  name: 'Film entity',
  args: {
    title: 'A New Hope',
    subtitle: 'Directed by George Lucas',
    meta: 'Released: 1977-05-25',
    badgeLabel: 'Episode 4',
    badgeColor: 'green',
  },
}

export const Starship: Story = {
  name: 'Starship entity',
  args: {
    title: 'Death Star',
    subtitle: 'DS-1 Orbital Battle Station',
    meta: 'MGLT: 10',
    badgeLabel: 'Starship',
    badgeColor: 'gray',
  },
}

export const Loading: Story = {
  name: 'Loading state',
  args: {
    title: '',
    isLoading: true,
  },
}

export const WithoutBadge: Story = {
  name: 'Without badge',
  args: {
    title: 'R2-D2',
    subtitle: 'Astromech droid',
    meta: 'Height: 96cm',
  },
}

export const LongTitle: Story = {
  name: 'Long title truncation',
  args: {
    title: 'This is a very long title that should get truncated',
    subtitle: 'Testing truncation behavior',
    badgeLabel: 'Badge',
  },
}
