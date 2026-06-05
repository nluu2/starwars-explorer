import type { PaginatedResult, Starship } from '@starwars/domain'
import { client } from './client'

const PAGE_SIZE = 12

export const starshipsService = {
  getAll: async (page = 1, search = ''): Promise<PaginatedResult<Starship>> => {
    const response = await client.get<Starship[]>('/starships')
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
  getById: (id: string): Promise<Starship> =>
    client.get<Starship>(`/starships/${id}`).then((response) => response.data),
}

export type StarshipsService = typeof starshipsService
