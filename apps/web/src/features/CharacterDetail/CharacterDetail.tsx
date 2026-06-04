import { observer } from 'mobx-react-lite'
import { Text, Stack } from '@mantine/core'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'
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
      {person && (
        <Stack gap="xs" className={styles.relationships}>
          <Text size="sm" fw={500}>
            Films appeared in
          </Text>
          <Text size="sm" c="dimmed">
            {person.films.length > 0
              ? `${person.films.length} film${person.films.length ? 's' : ''}`
              : 'None'}
          </Text>
        </Stack>
      )}
    </DetailPanel>
  )
})

export default CharacterDetail
