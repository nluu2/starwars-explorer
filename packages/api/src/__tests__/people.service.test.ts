import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { peopleService } from '../people.service'
import { mockPerson, mockSwapiList } from './mocks'

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
      const listResponse = mockSwapiList([mockPerson])
      mock.onGet('/people/').reply(200, listResponse)
      const result = await peopleService.getAll()
      expect(result).toEqual(listResponse)
    })

    it('fetches a specific page', async () => {
      const listResponse = mockSwapiList([mockPerson])
      mock.onGet('/people/').reply(200, listResponse)
      const result = await peopleService.getAll(2)
      expect(result).toEqual(listResponse)
    })

    it('passes search param when provided', async () => {
      const listResponse = mockSwapiList([mockPerson])
      mock.onGet('/people/').reply(200, listResponse)
      const result = await peopleService.getAll(1, 'luke')
      expect(result).toEqual(listResponse)
    })

    it('throws on error response', async () => {
      mock.onGet('/people/').reply(500, { detail: 'Server error' })
      await expect(peopleService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a person by id', async () => {
      mock.onGet('/people/1/').reply(200, mockPerson)
      const result = await peopleService.getById('1')
      expect(result).toEqual(mockPerson)
    })

    it('throws on 404', async () => {
      mock.onGet('/people/999/').reply(404, { detail: 'Not found' })
      await expect(peopleService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
