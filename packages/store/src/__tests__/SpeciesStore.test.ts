import { RootStore } from '../RootStore'
import { mockSpecies, createMockRootStore, createMockSpeciesService } from './mocks'

describe('SpeciesStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.species.list).toEqual([])
    })

    it('starts with no selected species', () => {
      expect(store.species.selected).toBeNull()
    })

    it('starts on page 1', () => {
      expect(store.species.page).toBe(1)
    })

    it('starts with 0 total', () => {
      expect(store.species.total).toBe(0)
    })

    it('starts with no loading', () => {
      expect(store.species.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.species.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('totalPages reflects service response', async () => {
      const service = createMockSpeciesService()
      service.getAll.mockResolvedValue({
        items: [mockSpecies],
        total: 36,
        page: 1,
        totalPages: 3,
        hasNext: true,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, species: service })
      await store.species.fetchAll()
      expect(store.species.totalPages).toBe(3)
    })

    it('isEmpty returns false when list has items', async () => {
      await store.species.fetchAll()
      expect(store.species.isEmpty).toBe(false)
    })
  })

  describe('fetchAll', () => {
    it('sets page correctly', async () => {
      await store.species.fetchAll(2)
      expect(store.species.page).toBe(2)
    })

    it('sets error on failure', async () => {
      const service = createMockSpeciesService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, species: service })
      await store.species.fetchAll()
      expect(store.species.error).toBe('Network error')
      expect(store.species.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected species on success and opens drawer', async () => {
      await store.species.selectById('1')
      expect(store.species.selected).toEqual(mockSpecies)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockSpeciesService()
      store = new RootStore({ ...createMockRootStore().services, species: service })
      await store.species.selectById('1')
      await store.species.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected species', async () => {
      await store.species.selectById('1')
      store.species.clearSelected()
      expect(store.species.selected).toBeNull()
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockSpeciesService()
      store = new RootStore({ ...createMockRootStore().services, species: service })
      await store.species.fetchAll(1)
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.species.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
