import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { AppShell, Group, Title, NavLink } from '@mantine/core'
import { CacheIndicator } from '@starwars/ui'
import { useStore } from '@starwars/store'
import styles from './AppLayout.module.css'

const navItems = [
  { label: 'Characters', path: '/' },
  { label: 'Films', path: '/films' },
  { label: 'Starships', path: '/starships' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Species', path: '/species' },
  { label: 'Planets', path: '/planets' },
]

const AppLayout = observer(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const { people, planets, starships, vehicles, species, ui } = useStore()

  const isRefreshing =
    people.isRefreshing ||
    planets.isRefreshing ||
    starships.isRefreshing ||
    vehicles.isRefreshing ||
    species.isRefreshing

  return (
    <AppShell header={{ height: 130 }} navbar={{ width: 200, breakpoint: 'sm' }} padding={0}>
      <AppShell.Header withBorder={false}>
        <Group px="xl" py="xl" justify="space-between" align="center">
          <Title order={1}>
            <span className={styles.titleStarWars}>Star Wars</span>
            <span className={styles.titleExplorer}>Explorer</span>
          </Title>
          <CacheIndicator isRefreshing={isRefreshing} />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className={styles.navbar}>
        {navItems.map((item, i) => (
          <NavLink
            key={i}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => {
              ui.setSearch('')
              navigate(item.path)
            }}
            className={styles.navLink}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
})

export default AppLayout
