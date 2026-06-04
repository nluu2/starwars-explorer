import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Person } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './CharacterCard.module.css'

interface CharacterCardProps {
  person: Person
}

const CharacterCard = observer(({ person }: CharacterCardProps) => {
  const { people } = useStore()
  const id = extractId(person.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={person.name}
        subtitle={`Born: ${person.birth_year}`}
        meta={`Height: ${person.height}cm / Mass: ${person.mass}kg`}
        badgeLabel={person.gender !== 'n/a' ? person.gender : undefined}
        badgeColor="blue"
        onClick={() => people.selectById(id)}
      />
    </div>
  )
})

export default CharacterCard
