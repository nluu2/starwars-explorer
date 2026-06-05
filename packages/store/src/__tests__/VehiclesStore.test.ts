import { RootStore } from '../RootStore'
import { mockVehicle, createMockRootStore, createMockVehiclesService } from './mocks'

describe('VehiclesStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.vehicles.list).toEqual([])
    })

    it('starts with no selected vehicle', () => {
      expect(store.vehicles.selected).toBeNull()
    })

    it('starts on page 1', () => {
      expect(store.vehicles.page).toBe(1)
    })

    it('starts with 0 total', () => {
      expect(store.vehicles.total).toBe(0)
    })

    it('starts with no loading', () => {
      expect(store.vehicles.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.vehicles.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('totalPages reflects service response', async () => {
      const service = createMockVehiclesService()
      service.getAll.mockResolvedValue({
        items: [mockVehicle],
        total: 39,
        page: 1,
        totalPages: 4,
        hasNext: true,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, vehicles: service })
      await store.vehicles.fetchAll()
      expect(store.vehicles.totalPages).toBe(4)
    })

    it('isEmpty returns false when list has items', async () => {
      await store.vehicles.fetchAll()
      expect(store.vehicles.isEmpty).toBe(false)
    })
  })

  describe('fetchAll', () => {
    it('sets page correctly', async () => {
      await store.vehicles.fetchAll(2)
      expect(store.vehicles.page).toBe(2)
    })

    it('sets error on failure', async () => {
      const service = createMockVehiclesService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, vehicles: service })
      await store.vehicles.fetchAll()
      expect(store.vehicles.error).toBe('Network error')
      expect(store.vehicles.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected vehicle on success and opens drawer', async () => {
      await store.vehicles.selectById('1')
      expect(store.vehicles.selected).toEqual(mockVehicle)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockVehiclesService()
      store = new RootStore({ ...createMockRootStore().services, vehicles: service })
      await store.vehicles.selectById('1')
      await store.vehicles.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected vehicle', async () => {
      await store.vehicles.selectById('1')
      store.vehicles.clearSelected()
      expect(store.vehicles.selected).toBeNull()
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockVehiclesService()
      store = new RootStore({ ...createMockRootStore().services, vehicles: service })
      await store.vehicles.fetchAll(1)
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.vehicles.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
