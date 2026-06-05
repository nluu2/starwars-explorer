import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from './utils'
import { StatBadge } from '../components/StatBadge/StatBadge'

describe('StatBadge', () => {
  it('renders label and value', () => {
    render(<StatBadge label="Height" value="172" />)
    expect(screen.getByText('Height:')).toBeInTheDocument()
    expect(screen.getByText('172')).toBeInTheDocument()
  })

  it('renders tooltip when provided', async () => {
    render(<StatBadge label="MGLT" value="75" tooltip="Megalights per hour" />)
    await userEvent.hover(screen.getByText('MGLT:'))
    expect(await screen.findByText('Megalights per hour')).toBeInTheDocument()
  })
})
