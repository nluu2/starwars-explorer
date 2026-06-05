import type { PaginatedResult, Film } from '@starwars/domain'
import { client } from './client'

export const filmsService = {
  getAll: async (): Promise<PaginatedResult<Film>> => {
    const response = await client.get<Film[]>('/films')
    const items = response.data

    return {
      items,
      total: items.length,
      page: 1,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    }
  },
  getById: (id: string): Promise<Film> =>
    client.get<Film>(`/films/${id}`).then((response) => response.data),
}

export type FilmsService = typeof filmsService
