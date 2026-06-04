import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { RootStore, StoreProvider } from '@starwars/store'
import { starwarsTheme } from '@starwars/ui'
import App from './App.tsx'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

const store = new RootStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <MantineProvider theme={starwarsTheme} defaultColorScheme="dark">
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </StoreProvider>
  </StrictMode>,
)
