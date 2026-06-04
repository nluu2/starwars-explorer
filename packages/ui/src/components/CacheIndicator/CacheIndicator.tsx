import { Group, Loader, Text } from '@mantine/core'
import styles from './CacheIndicator.module.css'

export interface CacheIndicatorProps {
  isRefreshing: boolean
}

export const CacheIndicator = ({ isRefreshing }: CacheIndicatorProps) => {
  if (!isRefreshing) return null

  return (
    <Group className={styles.indicator} gap={6}>
      <Loader size={10} color="gray" />
      <Text size="xs" c="dimmed">
        Updating...
      </Text>
    </Group>
  )
}
