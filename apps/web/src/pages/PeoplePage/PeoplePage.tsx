import { useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Group, Title, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { SearchInput, PaginationBar, LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import CharacterCard from '../../features/CharacterCard/CharacterCard'
import CharacterDetail from '../../features/CharacterDetail/CharacterDetail'
import styles from './PeoplePage.module.css'

const PeoplePage = observer(() => {
  const { people, ui } = useStore()
  const [debouncedSearch] = useDebouncedValue(ui.searchQuery, 300)

  // When debounced search changes
  useEffect(() => {
    people.fetchAll(1)
  }, [debouncedSearch])

  useEffect(() => {
    people.fetchAll(1)
  }, [])

  useEffect(() => {
    if (!people.isLoading && people.list.length > 0) {
      people.prefetchNextPage()
    }
  }, [people.isLoading, people.page])

  const handleSearchChange = useCallback((value: string) => { ui.setSearch(value) }, [ui])

  const handlePageChange = useCallback(
    (page: number) => {
      people.fetchAll(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [people],
  )

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Page title */}
        <Group justify="space-between" align="center">
          <Group align="baseline" gap="sm">
            <Title order={2} c="white">Characters</Title>
            {!people.isLoading && people.total > 0 && (
              <Text size="sm" c="dimmed">{people.total} total</Text>
            )}
          </Group>
          <div style={{ width: 420 }}>
            <SearchInput
              value={ui.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search characters..."
              isLoading={people.isLoading}
            />
          </div>
        </Group>

        {/* Error state */}
        {people.error && <ErrorBanner message={people.error} onRetry={() => people.refresh()} />}

        {/* Loading state */}
        {people.isLoading && (
          <LoadingContainer count={10} cols={{ base: 1, sm: 2, md: 3, lg: 4 }} />
        )}

        {/* Empty state */}
        {people.isEmpty && !people.error && (
          <Stack className={styles.empty} align="center" gap="xs">
            <Text fw={500}>No characters found</Text>
            <Text size="sm" c="dimmed">
              Try adjusting your search term
            </Text>
          </Stack>
        )}

        {/* Results grid */}
        {!people.isLoading && !people.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {people.list.map((person, i) => (
              <CharacterCard key={i} person={person} />
            ))}
          </SimpleGrid>
        )}

        {/* Pagination */}
        <PaginationBar
          page={people.page}
          totalPages={people.totalPages}
          total={people.total}
          onPageChange={handlePageChange}
        />
      </Stack>

      {/* Detail drawer */}
      <CharacterDetail />
    </Container>
  )
})

export default PeoplePage
