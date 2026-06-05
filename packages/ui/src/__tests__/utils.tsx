import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import { starwarsTheme } from '../theme/theme'

// Provides MantineProvider to every component test
const Wrapper = ({ children }: { children: ReactNode }) => (
  <MantineProvider theme={starwarsTheme}>{children}</MantineProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: Wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render }
