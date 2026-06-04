import React from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Preview } from '@storybook/react-vite'
import { starwarsTheme } from '../src/theme/theme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
  decorators: [
    (Story, context) => {
      const colorScheme = context.globals.colorScheme ?? 'dark'
      return (
        <MantineProvider theme={starwarsTheme} defaultColorScheme={colorScheme}>
          <div style={{ padding: '1rem' }}>
            <Story />
          </div>
        </MantineProvider>
      )
    },
  ],
  globalTypes: {
    colorScheme: {
      name: 'Color scheme',
      description: 'Toggle light/dark mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
}

export default preview
