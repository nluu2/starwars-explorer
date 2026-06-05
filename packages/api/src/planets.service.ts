import type { PaginatedResult, Planet } from '@starwars/domain'
import { client } from './client'

const PAGE_SIZE = 12

export const planetsService = {
  getAll: async (page = 1, search = ''): Promise<PaginatedResult<Planet>> => {
    const response = await client.get<Planet[]>('/planets')
    let items = response.data
    if (search) {
      items = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    }

    const total = items.length
    const totalPages = Math.ceil(total / PAGE_SIZE)
    const start = (page - 1) * PAGE_SIZE
    const paginated = items.slice(start, start + PAGE_SIZE)

    return {
      items: paginated,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    }
  },
  getById: (id: string): Promise<Planet> =>
    client.get<Planet>(`/planets/${id}`).then((response) => response.data),
}

export type PlanetsService = typeof planetsService
