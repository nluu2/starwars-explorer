import { makeAutoObservable, runInAction } from 'mobx'
import type { StarshipsService } from '@starwars/api'
import type { Starship, SwapiList } from '@starwars/domain'
import { CacheStore } from './CacheStore'
import type { RootStore } from './RootStore'

export class StarshipsStore {
  list: Starship[] = []
  selected: Starship | null = null
  page: number = 1
  total: number = 0
  isLoading: boolean = false
  isLoadingDetail: boolean = false
  error: string | null = null

  constructor(
    private root: RootStore,
    private service: StarshipsService,
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
    const cacheKey = `starships:list:${page}:${this.root.ui.searchQuery}`
    const cached = this.root.cache.get<SwapiList<Starship>>(cacheKey)

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
      this.root.cache.set(cacheKey, data, CacheStore.TTL.starships)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
        this.page = page
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load starships'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  selectById = async (id: string): Promise<void> => {
    const cacheKey = `starships:detail:${id}`
    const cached = this.root.cache.get<Starship>(cacheKey)

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
      const starship = await this.service.getById(id)
      this.root.cache.set(cacheKey, starship, CacheStore.TTL.starships)
      runInAction(() => {
        this.selected = starship
      })
      this.root.ui.openDrawer(id)
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to load starship details'
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
    this.root.cache.invalidate('starships:')
    return this.fetchAll(this.page)
  }
}
