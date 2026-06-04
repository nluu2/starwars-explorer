import { observer } from 'mobx-react-lite'
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
      fields={fields}
      isLoading={planets.isLoadingDetail}
    />
  )
})

export default PlanetDetail
