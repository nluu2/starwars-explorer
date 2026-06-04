import type { SwapiList, Film } from '@starwars/domain'
import { client } from './client'

export const filmsService = {
  getAll: (): Promise<SwapiList<Film>> =>
    client.get<SwapiList<Film>>('/films/').then((response) => response.data),
  getById: (id: string): Promise<Film> =>
    client.get<Film>(`/films/${id}/`).then((response) => response.data),
}

export type FilmsService = typeof filmsService
