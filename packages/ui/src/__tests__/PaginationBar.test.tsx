import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { PaginationBar } from '../components/PaginationBar/PaginationBar'

describe('PaginationBar', () => {
  describe('rendering', () => {
    it('renders pagination summary', () => {
      render(<PaginationBar page={1} totalPages={7} total={82} onPageChange={jest.fn()} />)
      expect(screen.getByText('Showing 1-12 of 82')).toBeInTheDocument()
    })

    it('renders correct summary for middle page', () => {
      render(<PaginationBar page={2} totalPages={7} total={82} onPageChange={jest.fn()} />)
      expect(screen.getByText('Showing 13-24 of 82')).toBeInTheDocument()
    })

    it('renders correct summary for last page', () => {
      render(<PaginationBar page={7} totalPages={7} total={82} onPageChange={jest.fn()} />)
      expect(screen.getByText('Showing 73-82 of 82')).toBeInTheDocument()
    })

    it('renders nothing when totalPages is 1', () => {
      render(<PaginationBar page={1} totalPages={1} total={6} onPageChange={jest.fn()} />)
      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
    })

    it('renders nothing when totalPages is 0', () => {
      render(<PaginationBar page={1} totalPages={0} total={0} onPageChange={jest.fn()} />)
      expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onPageChange when page button clicked', async () => {
      const onPageChange = jest.fn()
      render(<PaginationBar page={1} totalPages={9} total={82} onPageChange={onPageChange} />)
      await userEvent.click(screen.getByRole('button', { name: '2' }))
      expect(onPageChange).toHaveBeenCalledWith(2)
    })
  })
})
