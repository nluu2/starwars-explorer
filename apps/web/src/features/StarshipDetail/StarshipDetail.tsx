import { observer } from 'mobx-react-lite'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'

const StarshipDetail = observer(() => {
  const { starships, ui } = useStore()
  const starship = starships.selected

  const fields = starship
    ? [
        { label: 'Model', value: starship.model },
        { label: 'Class', value: starship.starship_class },
        { label: 'Manufacturer', value: starship.manufacturer },
        { label: 'Cost', value: starship.cost_in_credits },
        { label: 'Length', value: starship.length },
        { label: 'Crew', value: starship.crew },
        { label: 'Passengers', value: starship.passengers },
        { label: 'Cargo capacity', value: starship.cargo_capacity },
        { label: 'Hyperdrive rating', value: starship.hyperdrive_rating },
        { label: 'MGLT', value: starship.MGLT },
        { label: 'Max speed', value: starship.max_atmosphering_speed },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        starships.clearSelected()
      }}
      title={starship?.name ?? ''}
      badgeLabel="Starship"
      badgeColor="blue"
      fields={fields}
      isLoading={starships.isLoadingDetail}
    />
  )
})

export default StarshipDetail
