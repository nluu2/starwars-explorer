import { makeAutoObservable, runInAction } from 'mobx'
import type { SpeciesService } from '@starwars/api'
import type { Species, SwapiList } from '@starwars/domain'
import { CacheStore } from './CacheStore'
import type { RootStore } from './RootStore'

export class SpeciesStore {
  list: Species[] = []
  selected: Species | null = null
  page: number = 1
  total: number = 0
  isLoading: boolean = false
  isLoadingDetail: boolean = false
  isRefreshing: boolean = false
  error: string | null = null

  constructor(
    private root: RootStore,
    private service: SpeciesService,
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
    const cacheKey = `species:list:${page}:${this.root.ui.searchQuery}`
    const status = this.root.cache.getStatus(cacheKey)
    const cached = this.root.cache.get<SwapiList<Species>>(cacheKey)

    if (cached) {
      runInAction(() => {
        this.list = cached.results
        this.total = cached.count
        this.page = page
      })
      if (status === 'stale') this.backgroundRefresh(page)
      return
    }

    runInAction(() => {
      this.isLoading = true
      this.error = null
    })

    try {
      const data = await this.service.getAll(page, this.root.ui.searchQuery)
      this.root.cache.set(cacheKey, data, CacheStore.TTL.species)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
        this.page = page
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load species'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  selectById = async (id: string): Promise<void> => {
    const cacheKey = `species:detail:${id}`
    const cached = this.root.cache.get<Species>(cacheKey)

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
      const species = await this.service.getById(id)
      this.root.cache.set(cacheKey, species, CacheStore.TTL.species)
      runInAction(() => {
        this.selected = species
      })
      this.root.ui.openDrawer(id)
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load species details'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false
      })
    }
  }

  // Silently refetch in the background without affecting isLoading
  private backgroundRefresh = async (page: number): Promise<void> => {
    if (this.isRefreshing) return

    runInAction(() => {
      this.isRefreshing = true
    })

    try {
      const data = await this.service.getAll(page, this.root.ui.searchQuery)
      const cacheKey = `species:list:${page}:${this.root.ui.searchQuery}`
      this.root.cache.set(cacheKey, data, CacheStore.TTL.species)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
      })
    } catch {
      console.log('An error occurred with the background refresh.')
    } finally {
      runInAction(() => {
        this.isRefreshing = false
      })
    }
  }

  // Prefetch next page in background
  prefetchNextPage = (): void => {
    const nextPage = this.page + 1
    if (nextPage > this.totalPages) return

    const cacheKey = `species:list:${nextPage}:${this.root.ui.searchQuery}`
    const status = this.root.cache.getStatus(cacheKey)

    if (status === 'missing') {
      this.service
        .getAll(nextPage, this.root.ui.searchQuery)
        .then((data) => {
          this.root.cache.set(cacheKey, data, CacheStore.TTL.species)
        })
        .catch(() => {})
    }
  }

  clearSelected = (): void => {
    this.selected = null
  }

  refresh = (): Promise<void> => {
    this.root.cache.invalidate('species:')
    return this.fetchAll(this.page)
  }
}
