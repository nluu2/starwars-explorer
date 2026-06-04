import {
  peopleService,
  planetsService,
  filmsService,
  starshipsService,
  vehiclesService,
  speciesService,
} from '@starwars/api'
import type {
  PeopleService,
  PlanetsService,
  FilmsService,
  StarshipsService,
  VehiclesService,
  SpeciesService,
} from '@starwars/api'
import { CacheStore } from './CacheStore'
import { UIStore } from './UIStore'
import { PeopleStore } from './PeopleStore'
import { PlanetsStore } from './PlanetsStore'
import { FilmsStore } from './FilmsStore'
import { StarshipsStore } from './StarshipsStore'
import { VehiclesStore } from './VehiclesStore'
import { SpeciesStore } from './SpeciesStore'
import { extractId } from '@starwars/utils'

export interface RootStoreServices {
  people: PeopleService
  planets: PlanetsService
  films: FilmsService
  starships: StarshipsService
  vehicles: VehiclesService
  species: SpeciesService
}

const defaultServices: RootStoreServices = {
  people: peopleService,
  planets: planetsService,
  films: filmsService,
  starships: starshipsService,
  vehicles: vehiclesService,
  species: speciesService,
}

type EntityType = 'people' | 'planets' | 'films' | 'starships' | 'vehicles' | 'species'

export class RootStore {
  cache: CacheStore
  ui: UIStore
  people: PeopleStore
  planets: PlanetsStore
  films: FilmsStore
  starships: StarshipsStore
  vehicles: VehiclesStore
  species: SpeciesStore

  private services: RootStoreServices

  constructor(services: RootStoreServices = defaultServices) {
    this.services = services
    this.cache = new CacheStore()
    this.ui = new UIStore(this)
    this.people = new PeopleStore(this, services.people)
    this.planets = new PlanetsStore(this, services.planets)
    this.films = new FilmsStore(this, services.films)
    this.starships = new StarshipsStore(this, services.starships)
    this.vehicles = new VehiclesStore(this, services.vehicles)
    this.species = new SpeciesStore(this, services.species)
  }

  // Resolve single URL to an entity, usingn cache if available
  resolveUrl = async <T>(url: string, type: EntityType): Promise<T | null> => {
    if (!url) return null

    const id = extractId(url)
    if (!id) return null

    const cacheKey = `${type}:detail:${id}`
    const cached = this.cache.get<T>(cacheKey)

    if (cached) return cached

    try {
      const ttl = CacheStore.TTL[type as keyof typeof CacheStore.TTL]
      const data = (await this.services[type].getById(id)) as T
      this.cache.set(cacheKey, data, ttl)
      return data
    } catch {
      return null
    }
  }

  resolveUrls = async <T>(urls: string[], type: EntityType): Promise<T[]> => {
    if (!urls.length) return []
    const results = await Promise.all(urls.map((url) => this.resolveUrl<T>(url, type)))
    return results.filter((r) => r !== null)
  }
}
