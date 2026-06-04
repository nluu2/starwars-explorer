import { Drawer, Text, Group, Stack, Divider, Badge, ScrollArea, Box } from '@mantine/core'
import styles from './DetailPanel.module.css'

export interface DetailField {
  label: string
  value: string | number | null | undefined
}

export interface DetailPanelProps {
  opened: boolean
  onClose: () => void
  title: string
  badgeLabel?: string
  badgeColor?: string
  fields: DetailField[]
  isLoading?: boolean
  children?: React.ReactNode
}

export const DetailPanel = ({
  opened,
  onClose,
  title,
  badgeLabel,
  badgeColor = 'imperialGold',
  fields,
  isLoading = false,
  children,
}: DetailPanelProps) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="md"
      title={
        <Group gap="sm">
          <Text className={styles.title} fw={600}>
            {title}
          </Text>
          {badgeLabel && (
            <Badge color={badgeColor} variant="light">
              {badgeLabel}
            </Badge>
          )}
        </Group>
      }
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {isLoading ? (
        <Stack gap="md">
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} className={styles.fieldSkeleton} />
          ))}
        </Stack>
      ) : (
        <Stack gap={0}>
          {fields.map(({ label, value }, i) => (
            <div key={i}>
              <Group className={styles.field} justify="space-between" py="sm">
                <Text className={styles.fieldLabel} size="sm" c="dimmed">
                  {label}
                </Text>
                <Text className={styles.fieldValue} size="sm" fw={500}>
                  {value ?? '-'}
                </Text>
              </Group>
              {i < fields.length - 1 && <Divider />}
            </div>
          ))}
          {children && (
            <>
              <Divider my="md" />
              {children}
            </>
          )}
        </Stack>
      )}
    </Drawer>
  )
}
