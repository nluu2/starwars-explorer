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

export class RootStore {
  cache: CacheStore
  ui: UIStore
  people: PeopleStore
  planets: PlanetsStore
  films: FilmsStore
  starships: StarshipsStore
  vehicles: VehiclesStore
  species: SpeciesStore

  constructor(services: RootStoreServices = defaultServices) {
    this.cache = new CacheStore()
    this.ui = new UIStore(this)
    this.people = new PeopleStore(this, services.people)
    this.planets = new PlanetsStore(this, services.planets)
    this.films = new FilmsStore(this, services.films)
    this.starships = new StarshipsStore(this, services.starships)
    this.vehicles = new VehiclesStore(this, services.vehicles)
    this.species = new SpeciesStore(this, services.species)
  }
}
