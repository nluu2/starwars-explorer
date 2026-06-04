import { observer } from 'mobx-react-lite'
import { Text, Stack, Badge, Group, Loader } from '@mantine/core'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'
import { extractId } from '@starwars/utils'
import styles from './CharacterDetail.module.css'

const CharacterDetail = observer(() => {
  const { people, ui } = useStore()
  const person = people.selected

  const fields = person
    ? [
        { label: 'Birth year', value: person.birth_year },
        { label: 'Height', value: person.height },
        { label: 'Mass', value: person.mass },
        { label: 'Gender', value: person.gender },
        { label: 'Hair color', value: person.hair_color },
        { label: 'Skin color', value: person.skin_color },
        { label: 'Eye color', value: person.eye_color },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        people.clearSelected()
      }}
      title={person?.name ?? ''}
      badgeLabel="Character"
      badgeColor="blue"
      fields={fields}
      isLoading={people.isLoadingDetail}
    >
      {people.isLoadingRelations ? (
        <Group justify="center" py="md">
          <Loader size="sm" />
        </Group>
      ) : (
        <Stack gap="lg" className={styles.relationships}>
          {/* Homeworld */}
          {people.selectedHomeworld && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Homeworld
              </Text>
              <Badge
                variant="light"
                color="green"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const id = extractId(people.selectedHomeworld!.url)
                  ui.closeDrawer()
                  people.clearSelected()
                  setTimeout(() => ui.openDrawer(id), 100)
                }}
              >
                {people.selectedHomeworld.name}
              </Badge>
            </Stack>
          )}

          {/* Species */}
          {people.selectedSpecies.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Species
              </Text>
              <Group gap="xs">
                {people.selectedSpecies.map((s, i) => (
                  <Badge key={i} variant="light" color="grape">
                    {s.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          )}

          {/* Films */}
          {people.selectedFilms.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Films ({people.selectedFilms.length})
              </Text>
              <Stack gap={4}>
                {people.selectedFilms.map((f, i) => (
                  <Text key={i} size="sm" c="dimmed">
                    Episode {f.episode_id} - {f.title}
                  </Text>
                ))}
              </Stack>
            </Stack>
          )}

          {/* Starships */}
          {people.selectedStarships.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Starships ({people.selectedStarships.length})
              </Text>
              <Group gap="xs">
                {people.selectedStarships.map((s, i) => (
                  <Badge key={i} variant="light" color="blue">
                    {s.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          )}

          {/* Vehicles */}
          {people.selectedVehicles.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Vehicles ({people.selectedVehicles.length})
              </Text>
              <Group gap="xs">
                {people.selectedVehicles.map((v, i) => (
                  <Badge key={i} variant="light" color="orange">
                    {v.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          )}
        </Stack>
      )}
    </DetailPanel>
  )
})

export default CharacterDetail
