import { makeAutoObservable, runInAction } from 'mobx'
import type { PlanetsService } from '@starwars/api'
import type { Planet, Person, SwapiList } from '@starwars/domain'
import { CacheStore } from './CacheStore'
import type { RootStore } from './RootStore'

export class PlanetsStore {
  list: Planet[] = []
  selected: Planet | null = null
  page: number = 1
  total: number = 0
  isLoading: boolean = false
  isLoadingDetail: boolean = false
  isLoadingRelations: boolean = false
  error: string | null = null

  selectedResidents: Person[] = []

  constructor(
    private root: RootStore,
    private service: PlanetsService,
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
    const cacheKey = `planets:list:${page}:${this.root.ui.searchQuery}`
    const cached = this.root.cache.get<SwapiList<Planet>>(cacheKey)

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
      this.root.cache.set(cacheKey, data, CacheStore.TTL.planets)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
        this.page = page
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load planets'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  selectById = async (id: string): Promise<void> => {
    const cacheKey = `planets:detail:${id}`
    const cached = this.root.cache.get<Planet>(cacheKey)

    if (cached) {
      runInAction(() => {
        this.selected = cached
      })
      this.root.ui.openDrawer(id)
      await this.resolveRelations(cached)
      return
    }

    runInAction(() => {
      this.isLoadingDetail = true
    })

    try {
      const planet = await this.service.getById(id)
      this.root.cache.set(cacheKey, planet, CacheStore.TTL.planets)
      runInAction(() => {
        this.selected = planet
      })
      this.root.ui.openDrawer(id)
      await this.resolveRelations(planet)
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load planet details'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false
      })
    }
  }

  private resolveRelations = async (planet: Planet): Promise<void> => {
    runInAction(() => {
      this.isLoadingRelations = true
      this.selectedResidents = []
    })

    try {
      const residents = await this.root.resolveUrls<Person>(planet.residents, 'people')
      runInAction(() => {
        this.selectedResidents = residents
      })
    } finally {
      runInAction(() => {
        this.isLoadingRelations = false
      })
    }
  }

  clearSelected = (): void => {
    this.selected = null
    this.selectedResidents = []
  }

  refresh = (): Promise<void> => {
    this.root.cache.invalidate('planets:')
    return this.fetchAll(this.page)
  }
}
