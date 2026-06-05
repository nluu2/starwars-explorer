import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { SearchInput } from '../components/SearchInput/SearchInput'

describe('SearchInput', () => {
  describe('rendering', () => {
    it('renders with placeholder', () => {
      render(<SearchInput value="" onChange={jest.fn()} placeholder="Search characters..." />)
      expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
    })

    it('renders current value', () => {
      render(<SearchInput value="Luke" onChange={jest.fn()} placeholder="Search characters..." />)
      expect(screen.getByDisplayValue('Luke')).toBeInTheDocument()
    })

    it('shows clear button when value is present', () => {
      render(<SearchInput value="Luke" onChange={jest.fn()} placeholder="Search characters..." />)
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
    })

    it('is disabled when isLoading is true', () => {
      render(
        <SearchInput value="" onChange={jest.fn()} placeholder="Search characters..." isLoading />,
      )
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('interactions', () => {
    it('calls onChange when typing', async () => {
      const onChange = jest.fn()
      render(<SearchInput value="" onChange={onChange} />)
      await userEvent.type(screen.getByRole('textbox'), 'luke')
      expect(onChange).toHaveBeenCalled()
    })

    it('calls onChange with empty string when clear button clicked', async () => {
      const onChange = jest.fn()
      render(<SearchInput value="luke" onChange={onChange} />)
      await userEvent.click(screen.getByLabelText('Clear search'))
      expect(onChange).toHaveBeenCalledWith('')
    })
  })
})
