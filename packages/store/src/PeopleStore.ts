import { makeAutoObservable, runInAction } from 'mobx'
import type { PeopleService } from '@starwars/api'
import type { Person, Film, Planet, Species, Starship, Vehicle, SwapiList } from '@starwars/domain'
import { CacheStore } from './CacheStore'
import type { RootStore } from './RootStore'

export class PeopleStore {
  list: Person[] = []
  selected: Person | null = null
  page: number = 1
  total: number = 0
  isLoading: boolean = false
  isLoadingDetail: boolean = false
  isLoadingRelations: boolean = false
  error: string | null = null

  selectedFilms: Film[] = []
  selectedHomeworld: Planet | null = null
  selectedSpecies: Species[] = []
  selectedStarships: Starship[] = []
  selectedVehicles: Vehicle[] = []

  constructor(
    private root: RootStore,
    private service: PeopleService,
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
    const cacheKey = `people:list:${page}:${this.root.ui.searchQuery}`
    const cached = this.root.cache.get<SwapiList<Person>>(cacheKey)

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
      this.root.cache.set(cacheKey, data, CacheStore.TTL.people)
      runInAction(() => {
        this.list = data.results
        this.total = data.count
        this.page = page
      })
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load characters'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  selectById = async (id: string): Promise<void> => {
    const cacheKey = `people:detail:${id}`
    const cached = this.root.cache.get<Person>(cacheKey)

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
      const person = await this.service.getById(id)
      this.root.cache.set(cacheKey, person, CacheStore.TTL.people)
      runInAction(() => {
        this.selected = person
      })
      this.root.ui.openDrawer(id)
      await this.resolveRelations(person)
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'Failed to load character details'
        this.root.ui.addNotification({ type: 'error', message: this.error! })
      })
    } finally {
      runInAction(() => {
        this.isLoadingDetail = false
      })
    }
  }

  private resolveRelations = async (person: Person): Promise<void> => {
    runInAction(() => {
      this.isLoadingRelations = true
      this.selectedFilms = []
      this.selectedHomeworld = null
      this.selectedSpecies = []
      this.selectedStarships = []
      this.selectedVehicles = []
    })

    try {
      const [films, homeworld, species, starships, vehicles] = await Promise.all([
        this.root.resolveUrls<Film>(person.films, 'films'),
        this.root.resolveUrl<Planet>(person.homeworld, 'planets'),
        this.root.resolveUrls<Species>(person.species, 'species'),
        this.root.resolveUrls<Starship>(person.starships, 'starships'),
        this.root.resolveUrls<Vehicle>(person.vehicles, 'vehicles'),
      ])

      runInAction(() => {
        this.selectedFilms = films
        this.selectedHomeworld = homeworld
        this.selectedSpecies = species
        this.selectedStarships = starships
        this.selectedVehicles = vehicles
      })
    } finally {
      runInAction(() => {
        this.isLoadingRelations = false
      })
    }
  }

  clearSelected = (): void => {
    this.selected = null
    this.selectedFilms = []
    this.selectedHomeworld = null
    this.selectedSpecies = []
    this.selectedStarships = []
    this.selectedVehicles = []
  }

  refresh = (): Promise<void> => {
    this.root.cache.invalidate('people:')
    return this.fetchAll(this.page)
  }
}
