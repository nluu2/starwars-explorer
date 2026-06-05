import { screen } from '@testing-library/react'
import { render } from './utils'
import { LoadingContainer } from '../components/LoadingContainer/LoadingContainer'

describe('LoadingContainer', () => {
  describe('rendering', () => {
    it('renders the loading grid', () => {
      render(<LoadingContainer />)
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument()
    })

    it('renders 10 skeleton cards by default', () => {
      render(<LoadingContainer />)
      expect(screen.getAllByLabelText('Loading')).toHaveLength(10)
    })

    it('renders the correct number of cards when count is provided', () => {
      render(<LoadingContainer count={4} />)
      expect(screen.getAllByLabelText('Loading')).toHaveLength(4)
    })
  })
})
