import { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Group, Title, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, PaginationBar, LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import PlanetCard from '../../features/PlanetCard/PlanetCard'
import PlanetDetail from '../../features/PlanetDetail/PlanetDetail'
import styles from './PlanetsPage.module.css'

const PlanetsPage = observer(() => {
  const { planets, ui } = useStore()
  const [debouncedSearch] = useDebouncedValue(ui.searchQuery, 300)

  // When debounced search changes
  useEffect(() => {
    planets.fetchAll(1)
  }, [debouncedSearch])

  useEffect(() => {
    planets.fetchAll(1)
  }, [])

  useEffect(() => {
    if (!planets.isLoading && planets.list.length > 0) {
      planets.prefetchNextPage()
    }
  }, [planets.isLoading, planets.page])

  const handleSearchChange = useCallback((value: string) => { ui.setSearch(value) }, [ui])

  const handlePageChange = useCallback(
    (page: number) => {
      planets.fetchAll(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [planets],
  )

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Page title */}
        <Group justify="space-between" align="center">
          <Group align="baseline" gap="sm">
            <Title order={2} c="white">Planets</Title>
            {!planets.isLoading && planets.total > 0 && (
              <Text size="sm" c="dimmed">{planets.total} total</Text>
            )}
          </Group>
          <div style={{ width: 420 }}>
            <SearchInput
              value={ui.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search planets..."
              isLoading={planets.isLoading}
            />
          </div>
        </Group>

        {/* Error state */}
        {planets.error && <ErrorBanner message={planets.error} onRetry={() => planets.refresh()} />}

        {/* Loading state */}
        {planets.isLoading && (
          <LoadingContainer count={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
        )}

        {/* Empty state */}
        {planets.isEmpty && !planets.error && (
          <Stack className={styles.empty} align="center" gap="xs">
            <Text fw={500}>No planets found</Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search term
            </Text>
          </Stack>
        )}

        {/* Results grid */}
        {!planets.isLoading && !planets.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {planets.list.map((planet, i) => (
              <PlanetCard key={i} planet={planet} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        <PaginationBar
          page={planets.page}
          totalPages={planets.totalPages}
          total={planets.total}
          onPageChange={handlePageChange}
        />
      </Stack>

      {/* Detail drawer */}
      <PlanetDetail />
    </Container>
  )
})

export default PlanetsPage
