import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { speciesService } from '../species.service'
import { mockSpecies, mockSwapiList } from './mocks'

describe('speciesService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches the first page by default', async () => {
      const listResponse = mockSwapiList([mockSpecies])
      mock.onGet('/species/').reply(200, listResponse)
      const result = await speciesService.getAll()
      expect(result).toEqual(listResponse)
    })

    it('fetches a specific page', async () => {
      const listResponse = mockSwapiList([mockSpecies])
      mock.onGet('/species/').reply(200, listResponse)
      const result = await speciesService.getAll(3)
      expect(result).toEqual(listResponse)
    })

    it('passes search param when provided', async () => {
      const listResponse = mockSwapiList([mockSpecies])
      mock.onGet('/species/').reply(200, listResponse)
      const result = await speciesService.getAll(1, 'wookie')
      expect(result).toEqual(listResponse)
    })

    it('throws on error response', async () => {
      mock.onGet('/species/').reply(500, { detail: 'Server error' })
      await expect(speciesService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a species by id', async () => {
      mock.onGet('/species/1/').reply(200, mockSpecies)
      const result = await speciesService.getById('1')
      expect(result).toEqual(mockSpecies)
    })

    it('throws on 404', async () => {
      mock.onGet('/species/999/').reply(404, { detail: 'Not found' })
      await expect(speciesService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
