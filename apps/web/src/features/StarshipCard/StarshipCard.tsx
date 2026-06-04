import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Starship } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './StarshipCard.module.css'

interface StarshipCardProps {
  starship: Starship
}

const StarshipCard = observer(({ starship }: StarshipCardProps) => {
  const { starships } = useStore()
  const id = extractId(starship.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={starship.name}
        subtitle={starship.model}
        meta={`Class: ${starship.starship_class}`}
        onClick={() => starships.selectById(id)}
      />
    </div>
  )
})

export default StarshipCard
