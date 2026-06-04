import { Badge, Tooltip } from '@mantine/core'
import styles from './StatBadge.module.css'

export interface StatBadgeProps {
  label: string
  value: string | number
  color?: string
  tooltip?: string
}

export const StatBadge = ({ label, value, color = 'gray', tooltip }: StatBadgeProps) => {
  const badge = (
    <Badge className={styles.badge} color={color} variant="light" size="md">
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
    </Badge>
  )

  if (tooltip) {
    return (
      <Tooltip label={tooltip} withArrow>
        {badge}
      </Tooltip>
    )
  }

  return badge
}
