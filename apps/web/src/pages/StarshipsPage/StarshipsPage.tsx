import { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Group, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, PaginationBar, LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import StarshipCard from '../../features/StarshipCard/StarshipCard'
import StarshipDetail from '../../features/StarshipDetail/StarshipDetail'
import styles from './starshipsPage.module.css'

const StarshipsPage = observer(() => {
  const { starships, ui } = useStore()
  const [debouncedSearch] = useDebouncedValue(ui.searchQuery, 300)

  // When debounced search changes
  useEffect(() => {
    starships.fetchAll(1)
  }, [debouncedSearch])

  useEffect(() => {
    starships.fetchAll(1)
  }, [])

  useEffect(() => {
    if (!starships.isLoading && starships.list.length > 0) {
      starships.prefetchNextPage()
    }
  }, [starships.isLoading, starships.page])

  const handleSearchChange = useCallback(
    (value: string) => {
      ui.setSearch(value)
    },
    [ui],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      starships.fetchAll(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [starships],
  )

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Search */}
        <Group justify="center">
          <SearchInput
            value={ui.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search starships..."
            isLoading={starships.isLoading}
          />
        </Group>

        {/* Error state */}
        {starships.error && (
          <ErrorBanner message={starships.error} onRetry={() => starships.refresh()} />
        )}

        {/* Loading state */}
        {starships.isLoading && (
          <LoadingContainer count={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
        )}

        {/* Empty state */}
        {starships.isEmpty && !starships.error && (
          <Stack className={styles.empty} align="center" gap="xs">
            <Text fw={500}>No starships found</Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search term
            </Text>
          </Stack>
        )}

        {/* Results grid */}
        {!starships.isLoading && !starships.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {starships.list.map((starship, i) => (
              <StarshipCard key={i} starship={starship} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        <PaginationBar
          page={starships.page}
          totalPages={starships.totalPages}
          total={starships.total}
          onPageChange={handlePageChange}
        />
      </Stack>

      {/* Detail drawer */}
      <StarshipDetail />
    </Container>
  )
})

export default StarshipsPage
