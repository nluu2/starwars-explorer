import { RootStore } from '../RootStore'
import { createMockRootStore } from './mocks'

describe('UIStore', () => {
  let store: RootStore

  beforeEach(() => {
    const { services } = createMockRootStore()
    store = new RootStore(services)
  })

  describe('searchQuery', () => {
    it('starts empty', () => {
      expect(store.ui.searchQuery).toBe('')
    })

    it('updates on setSearch', () => {
      store.ui.setSearch('luke')
      expect(store.ui.searchQuery).toBe('luke')
    })

    it('can be cleared', () => {
      store.ui.setSearch('luke')
      store.ui.setSearch('')
      expect(store.ui.searchQuery).toBe('')
    })
  })

  describe('drawer', () => {
    it('starts closed', () => {
      expect(store.ui.activeDrawerId).toBeNull()
    })

    it('opens with an id', () => {
      store.ui.openDrawer('1')
      expect(store.ui.activeDrawerId).toBe('1')
    })

    it('closes', () => {
      store.ui.openDrawer('1')
      store.ui.closeDrawer()
      expect(store.ui.activeDrawerId).toBeNull()
    })

    it('switches to a different id when opened again', () => {
      store.ui.openDrawer('1')
      store.ui.openDrawer('2')
      expect(store.ui.activeDrawerId).toBe('2')
    })
  })

  describe('sidebar', () => {
    it('starts open', () => {
      expect(store.ui.sideBarOpen).toBe(true)
    })

    it('toggles closed', () => {
      store.ui.toggleSidebar()
      expect(store.ui.sideBarOpen).toBe(false)
    })

    it('toggles back open', () => {
      store.ui.toggleSidebar()
      store.ui.toggleSidebar()
      expect(store.ui.sideBarOpen).toBe(true)
    })
  })

  describe('colorScheme', () => {
    it('starts dark', () => {
      expect(store.ui.colorScheme).toBe('dark')
    })

    it('can be set to light', () => {
      store.ui.setColorScheme('light')
      expect(store.ui.colorScheme).toBe('light')
    })

    it('can be set back to dark', () => {
      store.ui.setColorScheme('light')
      store.ui.setColorScheme('dark')
      expect(store.ui.colorScheme).toBe('dark')
    })
  })

  describe('notifications', () => {
    it('starts with no notifications', () => {
      expect(store.ui.notifications).toEqual([])
    })

    it('adds a notification', () => {
      store.ui.addNotification({ type: 'success', message: 'Saved!' })
      expect(store.ui.notifications).toHaveLength(1)
      expect(store.ui.notifications[0]!.message).toBe('Saved!')
      expect(store.ui.notifications[0]!.type).toBe('success')
    })

    it('assigns a unique id to each notification', () => {
      store.ui.addNotification({ type: 'info', message: 'First' })
      store.ui.addNotification({ type: 'info', message: 'Second' })
      const [first, second] = store.ui.notifications
      expect(first!.id).not.toBe(second!.id)
    })

    it('removes a notification by id', () => {
      store.ui.addNotification({ type: 'error', message: 'Something went wrong' })
      const id = store.ui.notifications[0]!.id
      store.ui.removeNotification(id)
      expect(store.ui.notifications).toEqual([])
    })

    it('only removes the targeted notification', () => {
      store.ui.addNotification({ type: 'info', message: 'First' })
      store.ui.addNotification({ type: 'info', message: 'Second' })
      const id = store.ui.notifications[0]!.id
      store.ui.removeNotification(id)
      expect(store.ui.notifications).toHaveLength(1)
      expect(store.ui.notifications[0]!.message).toBe('Second')
    })
  })
})
