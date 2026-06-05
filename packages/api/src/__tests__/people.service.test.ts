import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { peopleService } from '../people.service'
import { mockPerson, mockPaginatedResult } from './mocks'

describe('peopleService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches the first page by default', async () => {
      mock.onGet('/people').reply(200, [mockPerson])
      const result = await peopleService.getAll()
      expect(result).toEqual(mockPaginatedResult([mockPerson]))
    })

    it('fetches a specific page', async () => {
      mock.onGet('/people').reply(200, [mockPerson])
      const result = await peopleService.getAll(2)
      expect(result.page).toBe(2)
    })

    it('filters results by search param when provided', async () => {
      mock.onGet('/people').reply(200, [mockPerson])
      const result = await peopleService.getAll(1, 'luke')
      expect(result.items).toEqual([mockPerson])
    })

    it('throws on error response', async () => {
      mock.onGet('/people').reply(500, { detail: 'Server error' })
      await expect(peopleService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a person by id', async () => {
      mock.onGet('/people/1').reply(200, mockPerson)
      const result = await peopleService.getById('1')
      expect(result).toEqual(mockPerson)
    })

    it('throws on 404', async () => {
      mock.onGet('/people/999').reply(404, { detail: 'Not found' })
      await expect(peopleService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
