import { observer } from 'mobx-react-lite'
import { DetailPanel } from '@starwars/ui'
import { useStore } from '@starwars/store'

const SpeciesDetail = observer(() => {
  const { species: speciesStore, ui } = useStore()
  const species = speciesStore.selected

  const fields = species
    ? [
        { label: 'Classification', value: species.classification },
        { label: 'Designation', value: species.designation },
        { label: 'Language', value: species.language },
        { label: 'Average height', value: species.average_height },
        { label: 'Average lifespan', value: species.average_lifespan },
        { label: 'Eye colors', value: species.eye_colors },
        { label: 'Hair colors', value: species.hair_colors },
        { label: 'Skin colors', value: species.skin_colors },
      ]
    : []

  return (
    <DetailPanel
      opened={ui.activeDrawerId !== null}
      onClose={() => {
        ui.closeDrawer()
        speciesStore.clearSelected()
      }}
      title={species?.name ?? ''}
      fields={fields}
      isLoading={speciesStore.isLoadingDetail}
    />
  )
})

export default SpeciesDetail
