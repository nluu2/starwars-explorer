import { RootStore } from '../RootStore'
import { mockPlanet, createMockRootStore, createMockPlanetsService } from './mocks'

describe('PlanetsStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.planets.list).toEqual([])
    })

    it('starts with no selected planet', () => {
      expect(store.planets.selected).toBeNull()
    })

    it('starts on page 1', () => {
      expect(store.planets.page).toBe(1)
    })

    it('starts with 0 total', () => {
      expect(store.planets.total).toBe(0)
    })

    it('starts with no loading', () => {
      expect(store.planets.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.planets.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('totalPages reflects service response', async () => {
      const service = createMockPlanetsService()
      service.getAll.mockResolvedValue({
        items: [mockPlanet],
        total: 60,
        page: 1,
        totalPages: 5,
        hasNext: true,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, planets: service })
      await store.planets.fetchAll()
      expect(store.planets.totalPages).toBe(5)
    })

    it('isEmpty returns false when list has items', async () => {
      await store.planets.fetchAll()
      expect(store.planets.isEmpty).toBe(false)
    })
  })

  describe('fetchAll', () => {
    it('sets page correctly', async () => {
      await store.planets.fetchAll(2)
      expect(store.planets.page).toBe(2)
    })

    it('sets error on failure', async () => {
      const service = createMockPlanetsService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, planets: service })
      await store.planets.fetchAll()
      expect(store.planets.error).toBe('Network error')
      expect(store.planets.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected planet on success and opens drawer', async () => {
      await store.planets.selectById('1')
      expect(store.planets.selected).toEqual(mockPlanet)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockPlanetsService()
      store = new RootStore({ ...createMockRootStore().services, planets: service })
      await store.planets.selectById('1')
      await store.planets.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected planet and relationships', async () => {
      await store.planets.selectById('1')
      store.planets.clearSelected()
      expect(store.planets.selected).toBeNull()
      expect(store.planets.selectedResidents).toEqual([])
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockPlanetsService()
      store = new RootStore({ ...createMockRootStore().services, planets: service })
      await store.planets.fetchAll(1)
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.planets.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
