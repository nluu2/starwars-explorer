import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, SimpleGrid, Stack, Text } from '@mantine/core'
import { LoadingContainer, ErrorBanner } from '@starwars/ui'
import { useStore } from '@starwars/store'
import FilmCard from '../../features/FilmCard/FilmCard'
import FilmDetail from '../../features/FilmDetail/FilmDetail'
import styles from './FilmsPage.module.css'

const FilmsPage = observer(() => {
  const { films } = useStore()

  useEffect(() => {
    films.fetchAll()
  }, [])

  return (
    <Container className={styles.container} size="xl">
      <Stack gap="xl">
        {/* Error state */}
        {films.error && <ErrorBanner message={films.error} onRetry={() => films.refresh()} />}

        {/* Loading state */}
        {films.isLoading && <LoadingContainer count={6} cols={{ base: 1, sm: 2, md: 3 }} />}

        {/* Empty state */}
        {films.isEmpty && !films.error && (
          <Stack align="center" gap="xs">
            <Text fw={500}>No Films found</Text>
          </Stack>
        )}

        {/* Results grid */}
        {!films.isLoading && !films.isEmpty && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {films.sortedByEpisode.map((film, i) => (
              <FilmCard key={i} film={film} />
            ))}
          </SimpleGrid>
        )}
      </Stack>

      {/* Detail drawer */}
      <FilmDetail />
    </Container>
  )
})

export default FilmsPage
