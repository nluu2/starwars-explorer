import { observer } from 'mobx-react-lite'
import { Text, Stack } from '@mantine/core'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'
import styles from './FilmDetail.module.css'

const FilmDetail = observer(() => {
  const { films, ui } = useStore()
  const film = films.selected

  const fields = film
    ? [
        { label: 'Episode', value: `Episode ${film.episode_id}` },
        { label: 'Director', value: film.director },
        { label: 'Producer', value: film.producer },
        { label: 'Release date', value: film.release_date },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        films.clearSelected()
      }}
      title={film?.title ?? ''}
      badgeLabel="Film"
      badgeColor="blue"
      fields={fields}
      isLoading={films.isLoadingDetail}
    >
      {film && (
        <Stack gap="xs" className={styles.relationships}>
          <Text size="sm" fw={500}>
            Opening crawl
          </Text>
          <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-line' }}>
            {film.opening_crawl}
          </Text>
        </Stack>
      )}
    </DetailPanel>
  )
})

export default FilmDetail
