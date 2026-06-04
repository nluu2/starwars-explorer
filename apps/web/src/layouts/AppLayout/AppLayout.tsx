import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { AppShell, Group, Title, Tabs } from '@mantine/core'
import { CacheIndicator } from '@starwars/ui'
import { useStore } from '@starwars/store'
import styles from './AppLayout.module.css'

const navItems = [
  { label: 'CHARACTERS', path: '/' },
  { label: 'FILMS', path: '/films' },
  { label: 'STARSHIPS', path: '/starships' },
  { label: 'VEHICLES', path: '/vehicles' },
  { label: 'SPECIES', path: '/species' },
  { label: 'PLANETS', path: '/planets' },
]

const AppLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { people, planets, starships, vehicles, species } = useStore()

  const isRefreshing =
    people.isRefreshing ||
    planets.isRefreshing ||
    starships.isRefreshing ||
    vehicles.isRefreshing ||
    species.isRefreshing

  return (
    <AppShell header={{ height: 130 }} padding="md">
      <AppShell.Header withBorder={false}>
        <Group px="xl" pt="sm" pb={0} justify="center">
          <Title order={1} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className={styles.titleStarWars}>Star Wars</span>
            <span className={styles.titleExplorer}>Explorer</span>
          </Title>
          <div className={styles.cacheIndicator}>
            <CacheIndicator isRefreshing={isRefreshing} />
          </div>
        </Group>
        <Tabs
          value={location.pathname}
          onChange={(value) => navigate(value ?? '/')}
          className={styles.tabs}
        >
          <Tabs.List px="xl" justify="center">
            {navItems.map((item, i) => (
              <Tabs.Tab key={i} value={item.path}>
                {item.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout
