import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { vehiclesService } from '../vehicles.service'
import { mockVehicle, mockPaginatedResult } from './mocks'

describe('vehiclesService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches the first page by default', async () => {
      mock.onGet('/vehicles').reply(200, [mockVehicle])
      const result = await vehiclesService.getAll()
      expect(result).toEqual(mockPaginatedResult([mockVehicle]))
    })

    it('fetches a specific page', async () => {
      mock.onGet('/vehicles').reply(200, [mockVehicle])
      const result = await vehiclesService.getAll(3)
      expect(result.page).toBe(3)
    })

    it('filters results by search param when provided', async () => {
      mock.onGet('/vehicles').reply(200, [mockVehicle])
      const result = await vehiclesService.getAll(1, 'sand crawler')
      expect(result.items).toEqual([mockVehicle])
    })

    it('throws on error response', async () => {
      mock.onGet('/vehicles').reply(500, { detail: 'Server error' })
      await expect(vehiclesService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a vehicle by id', async () => {
      mock.onGet('/vehicles/1').reply(200, mockVehicle)
      const result = await vehiclesService.getById('1')
      expect(result).toEqual(mockVehicle)
    })

    it('throws on 404', async () => {
      mock.onGet('/vehicles/999').reply(404, { detail: 'Not found' })
      await expect(vehiclesService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
