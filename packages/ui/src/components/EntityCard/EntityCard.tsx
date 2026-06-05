import { Card, Text, Badge, Group, Box } from '@mantine/core'
import styles from './EntityCard.module.css'

export interface EntityCardProps {
  title: string
  subtitle?: string
  meta?: string
  badgeLabel?: string
  badgeColor?: string
  onClick?: () => void
  isLoading?: boolean
}

export const EntityCard = ({
  title,
  subtitle,
  meta,
  badgeLabel,
  badgeColor = 'imperialGold',
  onClick,
  isLoading = false,
}: EntityCardProps) => {
  if (isLoading) {
    return <Box className={styles.skeleton} aria-busy aria-label="Loading" />
  }

  return (
    <Card
      className={styles.card}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <Group justify="space-between" mb="4" wrap="nowrap">
        <Text className={styles.title} fw={500} truncate>
          {title}
        </Text>
        {badgeLabel && (
          <Badge className={styles.badge} color={badgeColor} variant="light" size="sm">
            {badgeLabel}
          </Badge>
        )}
      </Group>
      {subtitle && (
        <Text className={styles.subtitle} size="sm">
          {subtitle}
        </Text>
      )}
      {meta && (
        <Text className={styles.meta} size="xs" mt={6}>
          {meta}
        </Text>
      )}
    </Card>
  )
}
