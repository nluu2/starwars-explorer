import { observer } from 'mobx-react-lite'
import { EntityCard } from '@starwars/ui'
import type { Film } from '@starwars/domain'
import { extractId, toRoman } from '@starwars/utils'
import { useStore } from '@starwars/store'
import styles from './FilmCard.module.css'

interface FilmCardProps {
  film: Film
}

const FilmCard = observer(({ film }: FilmCardProps) => {
  const { films } = useStore()
  const id = extractId(film.url)

  return (
    <div className={styles.wrapper}>
      <EntityCard
        title={film.title}
        subtitle={`Directed by ${film.director}`}
        meta={`Episode ${toRoman(film.episode_id)} · ${film.release_date.split('-')[0]}`}
        onClick={() => films.selectById(id)}
      />
    </div>
  )
})

export default FilmCard
