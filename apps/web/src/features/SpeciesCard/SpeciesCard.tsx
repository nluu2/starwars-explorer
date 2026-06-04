import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Species } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './SpeciesCard.module.css'

interface SpeciesCardProps {
  species: Species
}

const SpeciesCard = observer(({ species }: SpeciesCardProps) => {
  const { species: speciesStore } = useStore()
  const id = extractId(species.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={species.name}
        subtitle={`Classification: ${species.classification}`}
        meta={`Language: ${species.language}`}
        onClick={() => speciesStore.selectById(id)}
      />
    </div>
  )
})

export default SpeciesCard
