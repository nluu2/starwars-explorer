import { screen } from '@testing-library/react'
import { render } from './utils'
import { CacheIndicator } from '../components/CacheIndicator/CacheIndicator'

describe('CacheIndicator', () => {
  describe('rendering', () => {
    it('renders nothing when not refreshing', () => {
      render(<CacheIndicator isRefreshing={false} />)
      expect(screen.queryByText('Updating...')).not.toBeInTheDocument()
    })

    it('renders the updating label when refreshing', () => {
      render(<CacheIndicator isRefreshing={true} />)
      expect(screen.getByText('Updating...')).toBeInTheDocument()
    })
  })
})
