import { observer } from 'mobx-react-lite'
import { Text, Stack, Badge, Group, Loader } from '@mantine/core'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'

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
        <Stack gap="lg">
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Opening crawl
            </Text>
            <Text size="sm" c="dimmed" style={{ whiteSpace: 'pre-line' }}>
              {film.opening_crawl}
            </Text>
          </Stack>

          {films.isLoadingRelations ? (
            <Group justify="center" py="md">
              <Loader size="sm" />
            </Group>
          ) : (
            <>
              {/* Characters */}
              {films.selectedCharacters.length > 0 && (
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    Characters ({films.selectedCharacters.length})
                  </Text>
                  <Group gap="xs">
                    {films.selectedCharacters.map((c, i) => (
                      <Badge key={i} variant="light" color="blue">
                        {c.name}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              )}

              {/* Planets */}
              {films.selectedPlanets.length > 0 && (
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    Planets ({films.selectedPlanets.length})
                  </Text>
                  <Group gap="xs">
                    {films.selectedPlanets.map((p, i) => (
                      <Badge key={i} variant="light" color="green">
                        {p.name}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              )}
            </>
          )}
        </Stack>
      )}
    </DetailPanel>
  )
})

export default FilmDetail
