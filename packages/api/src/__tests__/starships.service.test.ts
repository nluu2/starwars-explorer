import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { starshipsService } from '../starships.service'
import { mockStarship, mockSwapiList } from './mocks'

describe('starshipsService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches the first page by default', async () => {
      const listResponse = mockSwapiList([mockStarship])
      mock.onGet('/starships/').reply(200, listResponse)
      const result = await starshipsService.getAll()
      expect(result).toEqual(listResponse)
    })

    it('fetches a specific page', async () => {
      const listResponse = mockSwapiList([mockStarship])
      mock.onGet('/starships/').reply(200, listResponse)
      const result = await starshipsService.getAll(2)
      expect(result).toEqual(listResponse)
    })

    it('passes search param when provided', async () => {
      const listResponse = mockSwapiList([mockStarship])
      mock.onGet('/starships/').reply(200, listResponse)
      const result = await starshipsService.getAll(1, 'death star')
      expect(result).toEqual(listResponse)
    })

    it('throws on error response', async () => {
      mock.onGet('/starships/').reply(500, { detail: 'Server error' })
      await expect(starshipsService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a starship by id', async () => {
      mock.onGet('/starships/1/').reply(200, mockStarship)
      const result = await starshipsService.getById('1')
      expect(result).toEqual(mockStarship)
    })

    it('throws on 404', async () => {
      mock.onGet('/starships/999/').reply(404, { detail: 'Not found' })
      await expect(starshipsService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
