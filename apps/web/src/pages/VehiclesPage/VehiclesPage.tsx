import { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Group, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, PaginationBar, LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import VehicleCard from '../../features/VehicleCard/VehicleCard'
import VehicleDetail from '../../features/VehicleDetail/VehicleDetail'
import styles from './VehiclesPage.module.css'

const VehiclesPage = observer(() => {
  const { vehicles, ui } = useStore()
  const [debouncedSearch] = useDebouncedValue(ui.searchQuery, 300)

  // When debounced search changes
  useEffect(() => {
    vehicles.fetchAll(1)
  }, [debouncedSearch])

  useEffect(() => {
    vehicles.fetchAll(1)
  }, [])

  useEffect(() => {
    if (!vehicles.isLoading && vehicles.list.length > 0) {
      vehicles.prefetchNextPage()
    }
  }, [vehicles.isLoading, vehicles.page])

  const handleSearchChange = useCallback(
    (value: string) => {
      ui.setSearch(value)
    },
    [ui],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      vehicles.fetchAll(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [vehicles],
  )

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Search */}
        <Group justify="center">
          <SearchInput
            value={ui.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search vehicles..."
            isLoading={vehicles.isLoading}
          />
        </Group>

        {/* Error state */}
        {vehicles.error && (
          <ErrorBanner message={vehicles.error} onRetry={() => vehicles.refresh()} />
        )}

        {/* Loading state */}
        {vehicles.isLoading && (
          <LoadingContainer count={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
        )}

        {/* Empty state */}
        {vehicles.isEmpty && !vehicles.error && (
          <Stack className={styles.empty} align="center" gap="xs">
            <Text fw={500}>No vehicles found</Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search term
            </Text>
          </Stack>
        )}

        {/* Results grid */}
        {!vehicles.isLoading && !vehicles.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {vehicles.list.map((vehicle, i) => (
              <VehicleCard key={i} vehicle={vehicle} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        <PaginationBar
          page={vehicles.page}
          totalPages={vehicles.totalPages}
          total={vehicles.total}
          onPageChange={handlePageChange}
        />
      </Stack>

      {/* Detail drawer */}
      <VehicleDetail />
    </Container>
  )
})

export default VehiclesPage
