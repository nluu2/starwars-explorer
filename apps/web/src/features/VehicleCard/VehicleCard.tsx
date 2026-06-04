import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Vehicle } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './VehicleCard.module.css'

interface VehicleCardProps {
  vehicle: Vehicle
}

const VehicleCard = observer(({ vehicle }: VehicleCardProps) => {
  const { vehicles } = useStore()
  const id = extractId(vehicle.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={vehicle.name}
        subtitle={vehicle.model}
        meta={`Class: ${vehicle.vehicle_class}`}
        onClick={() => vehicles.selectById(id)}
      />
    </div>
  )
})

export default VehicleCard
