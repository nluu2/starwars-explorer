import { TextInput, ActionIcon, CloseButton } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import styles from './SearchInput.module.css'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isLoading?: boolean
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  isLoading = false,
}: SearchInputProps) => {
  return (
    <TextInput
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      leftSection={<IconSearch size={16} />}
      rightSection={
        value ? (
          <CloseButton size="sm" onClick={() => onChange('')} aria-label="Clear search" />
        ) : null
      }
      disabled={isLoading}
      aria-label={placeholder}
    />
  )
}
