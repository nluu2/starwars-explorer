import { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Group, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, PaginationBar, LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import SpeciesCard from '../../features/SpeciesCard/SpeciesCard'
import SpeciesDetail from '../../features/SpeciesDetail/SpeciesDetail'
import styles from './SpeciesPage.module.css'

const SpeciesPage = observer(() => {
  const { species: speciesStore, ui } = useStore()
  const [debouncedSearch] = useDebouncedValue(ui.searchQuery, 300)

  // When debounced search changes
  useEffect(() => {
    speciesStore.fetchAll(1)
  }, [debouncedSearch])

  useEffect(() => {
    speciesStore.fetchAll(1)
  }, [])

  useEffect(() => {
    if (!speciesStore.isLoading && speciesStore.list.length > 0) {
      speciesStore.prefetchNextPage()
    }
  }, [speciesStore.isLoading, speciesStore.page])

  const handleSearchChange = useCallback(
    (value: string) => {
      ui.setSearch(value)
    },
    [ui],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      speciesStore.fetchAll(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [speciesStore],
  )

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Search */}
        <Group justify="center">
          <SearchInput
            value={ui.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search species..."
            isLoading={speciesStore.isLoading}
          />
        </Group>

        {/* Error state */}
        {speciesStore.error && (
          <ErrorBanner message={speciesStore.error} onRetry={() => speciesStore.refresh()} />
        )}

        {/* Loading state */}
        {speciesStore.isLoading && (
          <LoadingContainer count={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
        )}

        {/* Empty state */}
        {speciesStore.isEmpty && !speciesStore.error && (
          <Stack className={styles.empty} align="center" gap="xs">
            <Text fw={500}>No species found</Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search term
            </Text>
          </Stack>
        )}

        {/* Results grid */}
        {!speciesStore.isLoading && !speciesStore.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {speciesStore.list.map((species, i) => (
              <SpeciesCard key={i} species={species} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        <PaginationBar
          page={speciesStore.page}
          totalPages={speciesStore.totalPages}
          total={speciesStore.total}
          onPageChange={handlePageChange}
        />
      </Stack>

      {/* Detail drawer */}
      <SpeciesDetail />
    </Container>
  )
})

export default SpeciesPage
