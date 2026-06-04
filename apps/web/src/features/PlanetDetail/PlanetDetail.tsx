import { observer } from 'mobx-react-lite'
import { Text, Stack, Badge, Group, Loader } from '@mantine/core'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'

const PlanetDetail = observer(() => {
  const { planets, ui } = useStore()
  const planet = planets.selected

  const fields = planet
    ? [
        { label: 'Climate', value: planet.climate },
        { label: 'Terrain', value: planet.terrain },
        { label: 'Population', value: planet.population },
        { label: 'Diameter', value: planet.diameter },
        { label: 'Gravity', value: planet.gravity },
        { label: 'Surface water', value: planet.surface_water },
        { label: 'Rotation period', value: planet.rotation_period },
        { label: 'Orbital period', value: planet.orbital_period },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        planets.clearSelected()
      }}
      title={planet?.name ?? ''}
      badgeLabel="Planet"
      badgeColor="blue"
      fields={fields}
      isLoading={planets.isLoadingDetail}
    >
      {planets.isLoadingRelations ? (
        <Group justify="center" py="md">
          <Loader size="sm" />
        </Group>
      ) : (
        <>
          {/* Residents */}
          {planets.selectedResidents.length > 0 && (
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Residents ({planets.selectedResidents.length})
              </Text>
              <Group gap="xs">
                {planets.selectedResidents.map((r, i) => (
                  <Badge key={i} variant="light" color="blue">
                    {r.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
          )}
        </>
      )}
    </DetailPanel>
  )
})

export default PlanetDetail
