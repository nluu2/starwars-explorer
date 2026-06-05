import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Person, Planet, Species } from '@starwars/domain'
import { extractId } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './CharacterCard.module.css'

interface CharacterCardProps {
  person: Person
}

const CharacterCard = observer(({ person }: CharacterCardProps) => {
  const store = useStore()
  const id = extractId(person.url)

  const [speciesName, setSpeciesName] = useState('Human')
  const [homeworldName, setHomeworldName] = useState<string | null>(null)

  const speciesUrl = person.species[0]

  useEffect(() => {
    setSpeciesName('Human')
    if (speciesUrl) {
      store.resolveUrl<Species>(speciesUrl, 'species').then((s) => {
        if (s) setSpeciesName(s.name)
      })
    }
  }, [speciesUrl])

  useEffect(() => {
    setHomeworldName(null)
    if (person.homeworld) {
      store.resolveUrl<Planet>(person.homeworld, 'planets').then((p) => {
        if (p) setHomeworldName(p.name)
      })
    }
  }, [person.homeworld])

  const subtitle = [speciesName, homeworldName].filter(Boolean).join(' · ')

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={person.name}
        subtitle={subtitle}
        meta={`${person.height}cm · ${person.mass}kg`}
        onClick={() => store.people.selectById(id)}
      />
    </div>
  )
})

export default CharacterCard
