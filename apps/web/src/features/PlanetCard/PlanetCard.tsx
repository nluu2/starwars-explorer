import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Planet } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './PlanetCard.module.css'

interface PlanetCardProps {
  planet: Planet
}

const PlanetCard = observer(({ planet }: PlanetCardProps) => {
  const { planets } = useStore()
  const id = extractId(planet.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={planet.name}
        subtitle={`Climate: ${planet.climate}`}
        meta={`Terrain: ${planet.terrain}`}
        onClick={() => planets.selectById(id)}
      />
    </div>
  )
})

export default PlanetCard
