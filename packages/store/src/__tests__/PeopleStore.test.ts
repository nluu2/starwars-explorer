import { RootStore } from '../RootStore'
import { mockPerson, createMockRootStore, createMockPeopleService } from './mocks'

describe('PeopleStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('initial state', () => {
    it('starts with empty list', () => {
      expect(store.people.list).toEqual([])
    })

    it('starts with no selected person', () => {
      expect(store.people.selected).toBeNull()
    })

    it('starts on page 1', () => {
      expect(store.people.page).toBe(1)
    })

    it('starts with 0 total', () => {
      expect(store.people.total).toBe(0)
    })

    it('starts with no loading', () => {
      expect(store.people.isLoading).toBe(false)
    })

    it('stars with no error', () => {
      expect(store.people.error).toBeNull()
    })
  })

  describe('computed', () => {
    it('totalPages reflects service response', async () => {
      const service = createMockPeopleService()
      service.getAll.mockResolvedValue({
        items: [mockPerson],
        total: 82,
        page: 1,
        totalPages: 9,
        hasNext: true,
        hasPrevious: false,
      })
      store = new RootStore({ ...createMockRootStore().services, people: service })
      await store.people.fetchAll()
      expect(store.people.totalPages).toBe(9)
    })

    it('isEmpty returns false when list has items', async () => {
      await store.people.fetchAll()
      expect(store.people.isEmpty).toBe(false)
    })
  })

  describe('fetchAll', () => {
    it('sets page correctly', async () => {
      await store.people.fetchAll(2)
      expect(store.people.page).toBe(2)
    })

    it('sets error on failure', async () => {
      const service = createMockPeopleService()
      service.getAll.mockRejectedValue(new Error('Network error'))
      store = new RootStore({ ...createMockRootStore().services, people: service })
      await store.people.fetchAll()
      expect(store.people.error).toBe('Network error')
      expect(store.people.list).toEqual([])
    })
  })

  describe('selectById', () => {
    it('sets selected person on success and opens drawer', async () => {
      await store.people.selectById('1')
      expect(store.people.selected).toEqual(mockPerson)
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('uses cache on second call', async () => {
      const service = createMockPeopleService()
      store = new RootStore({ ...createMockRootStore().services, people: service })
      await store.people.selectById('1')
      await store.people.selectById('1')
      expect(service.getById).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearSelected', () => {
    it('clears selected person and relationships', async () => {
      await store.people.selectById('1')
      store.people.clearSelected()
      expect(store.people.selected).toBeNull()
      expect(store.people.selectedFilms).toEqual([])
      expect(store.people.selectedHomeworld).toBeNull()
    })
  })

  describe('refresh', () => {
    it('invalidates cache and refetches', async () => {
      const service = createMockPeopleService()
      store = new RootStore({ ...createMockRootStore().services, people: service })
      await store.people.fetchAll(1)
      expect(service.getAll).toHaveBeenCalledTimes(1)
      await store.people.refresh()
      expect(service.getAll).toHaveBeenCalledTimes(2)
    })
  })
})
