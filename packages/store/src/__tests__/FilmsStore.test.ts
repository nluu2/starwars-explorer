import { RootStore } from '../RootStore'
import { mockFilm, createMockRootStore, createMockFilmsService } from './mocks'

describe('FilmsStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.films.list).toEqual([])
    })

    it('starts with no selected film', () => {
      expect(store.films.selected).toBeNull()
    })

    it('starts with no loading', () => {
      expect(store.films.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.films.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('isEmpty returns false when list has items', async () => {
      await store.films.fetchAll()
      expect(store.films.isEmpty).toBe(false)
    })

    it('sortedByEpisode returns films sorted by episode_id', async () => {
      const service = createMockFilmsService()
      const filmEp4 = { ...mockFilm, episode_id: 4 }
      const filmEp1 = { ...mockFilm, episode_id: 1, title: 'The Phantom Menace' }
      service.getAll.mockResolvedValue({
        items: [filmEp4, filmEp1],
        total: 2,
        page: 1,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, films: service })
      await store.films.fetchAll()
      const [first, second] = store.films.sortedByEpisode
      expect(first!.episode_id).toBe(1)
      expect(second!.episode_id).toBe(4)
    })
  })

  describe('fetchAll', () => {
    it('populates list on success', async () => {
      await store.films.fetchAll()
      expect(store.films.list).toEqual([mockFilm])
    })

    it('sets error on failure', async () => {
      const service = createMockFilmsService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, films: service })
      await store.films.fetchAll()
      expect(store.films.error).toBe('Network error')
      expect(store.films.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected film on success and opens drawer', async () => {
      await store.films.selectById('1')
      expect(store.films.selected).toEqual(mockFilm)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockFilmsService()
      store = new RootStore({ ...createMockRootStore().services, films: service })
      await store.films.selectById('1')
      await store.films.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected film and relationships', async () => {
      await store.films.selectById('1')
      store.films.clearSelected()
      expect(store.films.selected).toBeNull()
      expect(store.films.selectedCharacters).toEqual([])
      expect(store.films.selectedPlanets).toEqual([])
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockFilmsService()
      store = new RootStore({ ...createMockRootStore().services, films: service })
      await store.films.fetchAll()
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.films.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
