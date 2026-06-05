import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { DetailPanel } from '../components/DetailPanel/DetailPanel'

const defaultProps = {
  opened: true,
  onClose: jest.fn(),
  title: 'Luke Skywalker',
  fields: [
    { label: 'Height', value: '172' },
    { label: 'Mass', value: '77' },
  ],
}

describe('DetailPanel', () => {
  describe('rendering', () => {
    it('renders title when opened', () => {
      render(<DetailPanel {...defaultProps} />)
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })

    it('renders field labels and values', () => {
      render(<DetailPanel {...defaultProps} />)
      expect(screen.getByText('Height')).toBeInTheDocument()
      expect(screen.getByText('172')).toBeInTheDocument()
      expect(screen.getByText('Mass')).toBeInTheDocument()
      expect(screen.getByText('77')).toBeInTheDocument()
    })

    it('renders dash for null value', () => {
      render(<DetailPanel {...defaultProps} fields={[{ label: 'Height', value: null }]} />)
      expect(screen.getByText('-')).toBeInTheDocument()
    })

    it('does not render when closed', () => {
      render(<DetailPanel {...defaultProps} opened={false} />)
      expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
    })

    it('renders children when provided', () => {
      render(
        <DetailPanel {...defaultProps}>
          <div>Related films</div>
        </DetailPanel>,
      )
      expect(screen.getByText('Related films')).toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders loading container when loading', () => {
      render(<DetailPanel {...defaultProps} isLoading />)
      expect(screen.queryByText('Height')).not.toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onClose when close button clicked', async () => {
      const onClose = jest.fn()
      render(<DetailPanel {...defaultProps} onClose={onClose} />)
      await userEvent.click(screen.getByRole('button'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
