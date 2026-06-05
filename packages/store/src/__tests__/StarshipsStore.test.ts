import { RootStore } from '../RootStore'
import { mockStarship, createMockRootStore, createMockStarshipsService } from './mocks'

describe('StarshipsStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.starships.list).toEqual([])
    })

    it('starts with no selected starship', () => {
      expect(store.starships.selected).toBeNull()
    })

    it('starts on page 1', () => {
      expect(store.starships.page).toBe(1)
    })

    it('starts with 0 total', () => {
      expect(store.starships.total).toBe(0)
    })

    it('starts with no loading', () => {
      expect(store.starships.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.starships.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('totalPages reflects service response', async () => {
      const service = createMockStarshipsService()
      service.getAll.mockResolvedValue({
        items: [mockStarship],
        total: 36,
        page: 1,
        totalPages: 3,
        hasNext: true,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, starships: service })
      await store.starships.fetchAll()
      expect(store.starships.totalPages).toBe(3)
    })

    it('isEmpty returns false when list has items', async () => {
      await store.starships.fetchAll()
      expect(store.starships.isEmpty).toBe(false)
    })
  })

  describe('fetchAll', () => {
    it('sets page correctly', async () => {
      await store.starships.fetchAll(2)
      expect(store.starships.page).toBe(2)
    })

    it('sets error on failure', async () => {
      const service = createMockStarshipsService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, starships: service })
      await store.starships.fetchAll()
      expect(store.starships.error).toBe('Network error')
      expect(store.starships.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected starship on success and opens drawer', async () => {
      await store.starships.selectById('1')
      expect(store.starships.selected).toEqual(mockStarship)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockStarshipsService()
      store = new RootStore({ ...createMockRootStore().services, starships: service })
      await store.starships.selectById('1')
      await store.starships.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected starship', async () => {
      await store.starships.selectById('1')
      store.starships.clearSelected()
      expect(store.starships.selected).toBeNull()
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockStarshipsService()
      store = new RootStore({ ...createMockRootStore().services, starships: service })
      await store.starships.fetchAll(1)
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.starships.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
