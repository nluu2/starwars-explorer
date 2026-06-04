import MockAdapter from 'axios-mock-adapter'
import { client } from '../client'

const mock = new MockAdapter(client)

afterEach(() => {
  mock.reset()
})

describe('api client', () => {
  it('has the correct baseURL', () => {
    expect(client.defaults.baseURL).toBe('https://swapi.dev/api')
  })

  it('returns response data on success', async () => {
    mock.onGet('/test').reply(200, { name: 'Luke' })
    const response = await client.get('/test')
    expect(response.data).toEqual({ name: 'Luke' })
  })

  it('normalizes error response into an Error', async () => {
    mock.onGet('/test').reply(404, { detail: 'Not found' })
    await expect(client.get('/test')).rejects.toThrow('Not found')
  })

  it('normalizes network error into an Error', async () => {
    mock.onGet('/test').networkError()
    await expect(client.get('/test')).rejects.toThrow()
  })

  it('uses detail from error response when available', async () => {
    mock.onGet('/test').reply(500, { detail: 'Server error' })
    await expect(client.get('/test')).rejects.toThrow('Server error')
  })
})
