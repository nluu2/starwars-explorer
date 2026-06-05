import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { EntityCard } from '../components/EntityCard/EntityCard'

describe('EntityCard', () => {
  describe('rendering', () => {
    it('renders title', () => {
      render(<EntityCard title="Luke Skywalker" />)
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })

    it('renders subtitle when provided', () => {
      render(<EntityCard title="Luke Skywalker" subtitle="Tatooine" />)
      expect(screen.getByText('Tatooine')).toBeInTheDocument()
    })

    it('renders badge when provided', () => {
      render(<EntityCard title="Luke Skywalker" badgeLabel="Male" />)
      expect(screen.getByText('Male')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders loading container when loading', () => {
      render(<EntityCard title="Luke Skywalker" isLoading />)
      expect(screen.getByLabelText('Loading')).toBeInTheDocument()
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onclick when clicked', async () => {
      const onClick = jest.fn()
      render(<EntityCard title="Luke Skywalker" onClick={onClick} />)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
