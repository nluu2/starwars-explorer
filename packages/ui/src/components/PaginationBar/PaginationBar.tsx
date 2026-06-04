import { Group, Pagination, Text } from '@mantine/core'
import styles from './PaginationBar.module.css'

export interface PaginationBarProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export const PaginationBar = ({ page, totalPages, total, onPageChange }: PaginationBarProps) => {
  if (totalPages <= 1) return null

  const from = (page - 1) * 10 + 1
  const to = Math.min(page * 10, total)

  return (
    <Group className={styles.container} justify="space-between" align="center">
      <Text className={styles.summary} size="sm" c="dimmed">
        Showing {from}-{to} of {total}
      </Text>
      <Pagination value={page} total={totalPages} onChange={onPageChange} size="sm" withEdges />
    </Group>
  )
}
