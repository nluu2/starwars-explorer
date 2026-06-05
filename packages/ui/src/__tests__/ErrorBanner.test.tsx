import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { ErrorBanner } from '../components/ErrorBanner/ErrorBanner'

describe('ErrorBanner', () => {
  describe('rendering', () => {
    it('renders the error message', () => {
      render(<ErrorBanner message="Something failed" />)
      expect(screen.getByText('Something failed')).toBeInTheDocument()
    })

    it('renders the title', () => {
      render(<ErrorBanner message="Something failed" />)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders the retry button when onRetry is provided', () => {
      render(<ErrorBanner message="Something failed" onRetry={jest.fn()} />)
      expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
    })

    it('does not render the retry button when onRetry is not provided', () => {
      render(<ErrorBanner message="Something failed" />)
      expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onRetry when the retry button is clicked', async () => {
      const onRetry = jest.fn()
      render(<ErrorBanner message="Something failed" onRetry={onRetry} />)
      await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
      expect(onRetry).toHaveBeenCalledTimes(1)
    })
  })
})
