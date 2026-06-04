import { Alert, Button, Group } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import styles from './ErrorBanner.module.css'

export interface ErrorBannerProps {
  message: string
  onRetry?: () => void
}

export const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <Alert
      className={styles.banner}
      icon={<IconAlertCircle size={16} />}
      title="Something went wrong"
      color="red"
      variant="light"
    >
      <Group justify="space-between" align="center">
        {message}
        {onRetry && (
          <Button size="xs" variant="subtle" color="red" onClick={onRetry}>
            Try again
          </Button>
        )}
      </Group>
    </Alert>
  )
}
