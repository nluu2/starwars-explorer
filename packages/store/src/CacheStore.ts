import { makeAutoObservable } from 'mobx'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

const STORAGE_KEY = 'swapi_cache'
const STORAGE_VERSION = 1

export type CacheStatus = 'fresh' | 'stale' | 'missing'

export class CacheStore {
  private entries = new Map<string, CacheEntry<unknown>>()

  static readonly TTL = {
    people: 5 * 60 * 1000,
    planets: 10 * 60 * 1000,
    films: 30 * 60 * 1000,
    species: 10 * 60 * 1000,
    starships: 10 * 60 * 1000,
    vehicles: 10 * 60 * 1000,
  } as const

  // Stale-while-revalidate window
  static readonly SWR_WINDOW = {
    people: 2 * 60 * 1000,
    planets: 5 * 60 * 1000,
    films: 10 * 60 * 1000,
    species: 5 * 60 * 1000,
    starships: 5 * 60 * 1000,
    vehicles: 5 * 60 * 1000,
  } as const

  constructor() {
    makeAutoObservable(this)
    this.rehydrate()
  }

  set<T>(key: string, data: T, ttl: number): void {
    this.entries.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.entries.get(key)
    if (!entry) return null

    const age = Date.now() - entry.timestamp
    const swrWindow = entry.ttl + this.getSwrWindow(key)

    // Completely expired
    if (age > swrWindow) {
      this.entries.delete(key)
      this.persist()
      return null
    }

    return entry.data as T
  }

  // Fresh - within TTL, no refetch needed
  // Stale - past TTL but within SWR window, serve but refetch in background
  // Missing - beyond SWR window and not in cache
  getStatus(key: string): CacheStatus {
    const entry = this.entries.get(key)
    if (!entry) return 'missing'

    const age = Date.now() - entry.timestamp
    const swrWindow = entry.ttl + this.getSwrWindow(key)

    if (age > swrWindow) return 'missing'
    if (age > entry.ttl) return 'stale'
    return 'fresh'
  }

  isStale(key: string): boolean {
    return this.getStatus(key) !== 'fresh'
  }

  invalidate(prefix: string): void {
    for (const key of this.entries.keys()) {
      if (key.startsWith(prefix)) this.entries.delete(key)
    }
    this.persist()
  }

  clear(): void {
    this.entries.clear()
    this.persist()
  }

  // Persist cache to localStorage so it survives page refresh
  private persist(): void {
    try {
      const serialized = JSON.stringify({
        version: STORAGE_VERSION,
        entries: Object.fromEntries(this.entries),
      })
      localStorage.setItem(STORAGE_KEY, serialized)
    } catch {
      console.log('There was an issue persisting to local storage.')
    }
  }

  // Rehydrate cache from localStorage on startup
  private rehydrate(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw)
      if (parsed.version !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY)
        return
      }

      for (const [key, entry] of Object.entries(parsed.entries)) {
        this.entries.set(key, entry as CacheEntry<unknown>)
      }
    } catch {
      // Corrupted storage, remove to start fresh
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  private getSwrWindow(key: string): number {
    const type = key.split(':')[0] as keyof typeof CacheStore.SWR_WINDOW
    return CacheStore.SWR_WINDOW[type] ?? 2 * 60 * 1000
  }
}
