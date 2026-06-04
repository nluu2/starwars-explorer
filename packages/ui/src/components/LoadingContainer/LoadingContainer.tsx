import { SimpleGrid } from '@mantine/core'
import { EntityCard } from '../EntityCard/EntityCard'
import styles from './LoadingContainer.module.css'

export interface LoadingContainerProps {
  count?: number
  cols?: { base?: number; sm?: number; md?: number; lg?: number }
}

export const LoadingContainer = ({
  count = 10,
  cols = { base: 1, sm: 2, md: 3, lg: 4 },
}: LoadingContainerProps) => {
  return (
    <SimpleGrid cols={cols} className={styles.grid} aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <EntityCard key={i} title="" isLoading />
      ))}
    </SimpleGrid>
  )
}
