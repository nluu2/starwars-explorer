import type { SwapiList, Person } from '@starwars/domain'
import { client } from './client'

export const peopleService = {
  getAll: (page = 1, search = ''): Promise<SwapiList<Person>> =>
    client
      .get<SwapiList<Person>>('/people/', {
        params: { page, search: search || undefined },
      })
      .then((response) => response.data),
  getById: (id: string): Promise<Person> =>
    client.get<Person>(`/people/${id}/`).then((response) => response.data),
}

export type PeopleService = typeof peopleService
