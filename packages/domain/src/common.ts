export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}
