import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'
import { filmsService } from '../films.service'
import { mockFilm, mockPaginatedResult } from './mocks'

describe('filmsService', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(client, { onNoMatch: 'throwException' })
  })

  afterEach(() => {
    mock.restore()
  })

  describe('getAll', () => {
    it('fetches all films', async () => {
      mock.onGet('/films').reply(200, [mockFilm])
      const result = await filmsService.getAll()
      expect(result).toEqual(mockPaginatedResult([mockFilm]))
    })

    it('throws on error response', async () => {
      mock.onGet('/films').reply(500, { detail: 'Server error' })
      await expect(filmsService.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches a film by id', async () => {
      mock.onGet('/films/1').reply(200, mockFilm)
      const result = await filmsService.getById('1')
      expect(result).toEqual(mockFilm)
    })

    it('throws on 404', async () => {
      mock.onGet('/films/999').reply(404, { detail: 'Not found' })
      await expect(filmsService.getById('999')).rejects.toThrow('Not found')
    })
  })
})
