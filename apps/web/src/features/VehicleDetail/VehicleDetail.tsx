import { observer } from 'mobx-react-lite'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'

const VehicleDetail = observer(() => {
  const { vehicles, ui } = useStore()
  const vehicle = vehicles.selected

  const fields = vehicle
    ? [
        { label: 'Model', value: vehicle.model },
        { label: 'Class', value: vehicle.vehicle_class },
        { label: 'Manufacturer', value: vehicle.manufacturer },
        { label: 'Cost', value: vehicle.cost_in_credits },
        { label: 'Length', value: vehicle.length },
        { label: 'Crew', value: vehicle.crew },
        { label: 'Passengers', value: vehicle.passengers },
        { label: 'Cargo capacity', value: vehicle.cargo_capacity },
        { label: 'Max speed', value: vehicle.max_atmosphering_speed },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        vehicles.clearSelected()
      }}
      title={vehicle?.name ?? ''}
      fields={fields}
      isLoading={vehicles.isLoadingDetail}
    />
  )
})

export default VehicleDetail
