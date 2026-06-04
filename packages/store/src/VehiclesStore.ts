import { makeAutoObservable, runInAction } from 'mobx'
import type { VehiclesService } from '@starwars/api'
import type { Vehicle, SwapiList } from '@starwars/domain'
import { CacheStore } from './CacheStore'
import type { RootStore } from './RootStore'

export class VehiclesStore {
  list: Vehicle[] = []
  selected: Vehicle | null = null
  page: number = 1
  total: number = 0
  isLoading: boolean = false
  isLoadingDetail: boolean = false
  error: string | null = null

  constructor(
    private root: RootStore,
    private service: VehiclesService,
  ) {
    makeAutoObservable(this)
  }

  get totalPages(): number {
    return Math.ceil(this.total / 10)
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.list.length === 0
  }

  fetchAll = async (page = 1): Promise<void> => {
    const cacheKey = `vehicles:list:${page}:${this.root.ui.searchQuery}`
    const cached = this.root.cache.get<SwapiList<Vehicle>>(cacheKey)

    if (cached) {
      runInAction(() => {
        this.list = cached.results
        this.total = cached.count
        this.page = page
      })
      return
    }

    runInAction(() => {
      this.isLoading = true
      this.error = null
    })

    try {
      const data = await this.service.getAll(page, this.root.ui.searchQuery)
      this.root.cache.set(cacheKey, data, CacheStore.TTL.vehicles)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
        this.page = page
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load vehicles'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  selectById = async (id: string): Promise<void> => {
    const cacheKey = `vehicles:detail:${id}`
    const cached = this.root.cache.get<Vehicle>(cacheKey)

    if (cached) {
      runInAction(() => {
        this.selected = cached
      })
      this.root.ui.openDrawer(id)
      return
    }

    runInAction(() => {
      this.isLoadingDetail = true
    })

    try {
      const vehicle = await this.service.getById(id)
      this.root.cache.set(cacheKey, vehicle, CacheStore.TTL.vehicles)
      runInAction(() => {
        this.selected = vehicle
      })
      this.root.ui.openDrawer(id)
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to load vehicle details'
      runInAction(() => {
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false
      })
    }
  }

  clearSelected = (): void => {
    this.selected = null
  }

  refresh = (): Promise<void> => {
    this.root.cache.invalidate('vehicles:')
    return this.fetchAll(this.page)
  }
}
