import { makeAutoObservable } from 'mobx'
import type { RootStore } from './RootStore'

export type ColorScheme = 'light' | 'dark'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export class UIStore {
  searchQuery: string = ''
  activeDrawerId: string | null = null
  colorScheme: ColorScheme = 'dark'
  sideBarOpen: boolean = true
  notifications: Notification[] = []

  constructor(private root: RootStore) {
    makeAutoObservable(this)
  }

  setSearch = (query: string): void => {
    this.searchQuery = query
  }

  openDrawer = (id: string): void => {
    this.activeDrawerId = id
  }

  closeDrawer = (): void => {
    this.activeDrawerId = null
  }

  toggleSidebar = (): void => {
    this.sideBarOpen = !this.sideBarOpen
  }

  setColorScheme = (scheme: ColorScheme): void => {
    this.colorScheme = scheme
  }

  addNotification = (notif: Omit<Notification, 'id'>): void => {
    const id = crypto.randomUUID()
    this.notifications.push({ ...notif, id })
    setTimeout(() => this.removeNotification(id), 5000)
  }

  removeNotification = (id: string): void => {
    this.notifications = this.notifications.filter((n) => n.id !== id)
  }
}
