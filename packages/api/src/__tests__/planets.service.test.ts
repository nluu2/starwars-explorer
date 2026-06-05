import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { planetsService } from '../planets.service'
import { mockPlanet, mockPaginatedResult } from './mocks'

describe('planetsService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches the first page by default', async () => {
      mock.onGet('/planets').reply(200, [mockPlanet])
      const result = await planetsService.getAll()
      expect(result).toEqual(mockPaginatedResult([mockPlanet]))
    })

    it('fetches a specific page', async () => {
      mock.onGet('/planets').reply(200, [mockPlanet])
      const result = await planetsService.getAll(3)
      expect(result.page).toBe(3)
    })

    it('filters results by search param when provided', async () => {
      mock.onGet('/planets').reply(200, [mockPlanet])
      const result = await planetsService.getAll(1, 'tatooine')
      expect(result.items).toEqual([mockPlanet])
    })

    it('throws on error response', async () => {
      mock.onGet('/planets').reply(500, { detail: 'Server error' })
      await expect(planetsService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a planet by id', async () => {
      mock.onGet('/planets/1').reply(200, mockPlanet)
      const result = await planetsService.getById('1')
      expect(result).toEqual(mockPlanet)
    })

    it('throws on 404', async () => {
      mock.onGet('/planets/999').reply(404, { detail: 'Not found' })
      await expect(planetsService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
