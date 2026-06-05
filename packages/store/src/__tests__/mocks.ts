import type {
  Person,
  Planet,
  Film,
  Starship,
  Vehicle,
  Species,
  PaginatedResult,
} from '@starwars/domain'
import type {
  PeopleService,
  PlanetsService,
  FilmsService,
  StarshipsService,
  VehiclesService,
  SpeciesService,
} from '@starwars/api'

export const mockPerson: Person = {
  birth_year: '19BBY',
  eye_color: 'Blue',
  films: ['https://swapi.info/api/films/1/'],
  gender: 'Male',
  hair_color: 'Blond',
  height: '172',
  homeworld: 'https://swapi.info/api/planets/1/',
  mass: '77',
  name: 'Luke Skywalker',
  skin_color: 'Fair',
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-10T13:52:43.172000Z',
  species: ['https://swapi.info/api/species/1/'],
  starships: ['https://swapi.info/api/starships/12/'],
  url: 'https://swapi.info/api/people/1/',
  vehicles: ['https://swapi.info/api/vehicles/14/'],
}

export const mockPlanet: Planet = {
  climate: 'Arid',
  created: '2014-12-09T13:50:49.641000Z',
  diameter: '10465',
  edited: '2014-12-15T13:48:16.167217Z',
  films: ['https://swapi.info/api/films/1/'],
  gravity: '1',
  name: 'Tatooine',
  orbital_period: '304',
  population: '120000',
  residents: ['https://swapi.info/api/people/1/'],
  rotation_period: '23',
  surface_water: '1',
  terrain: 'Dessert',
  url: 'https://swapi.info/api/planets/1/',
}

export const mockFilm: Film = {
  characters: ['https://swapi.info/api/people/1/'],
  created: '2014-12-10T14:23:31.880000Z',
  director: 'George Lucas',
  edited: '2014-12-12T11:24:39.858000Z',
  episode_id: 4,
  opening_crawl:
    "It is a period of civil war.\n\nRebel spaceships, striking\n\nfrom a hidden base, have won\n\ntheir first victory against\n\nthe evil Galactic Empire.\n\n\n\nDuring the battle, Rebel\n\nspies managed to steal secret\r\nplans to the Empire's\n\nultimate weapon, the DEATH\n\nSTAR, an armored space\n\nstation with enough power\n\nto destroy an entire planet.\n\n\n\nPursued by the Empire's\n\nsinister agents, Princess\n\nLeia races home aboard her\n\nstarship, custodian of the\n\nstolen plans that can save her\n\npeople and restore\n\nfreedom to the galaxy....",
  planets: ['https://swapi.info/api/planets/1/'],
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  species: ['https://swapi.info/api/species/1/'],
  starships: ['https://swapi.info/api/starships/2/'],
  title: 'A New Hope',
  url: 'https://swapi.info/api/films/1/',
  vehicles: ['https://swapi.info/api/vehicles/4/'],
}

export const mockStarship: Starship = {
  MGLT: '10 MGLT',
  cargo_capacity: '1000000000000',
  consumables: '3 years',
  cost_in_credits: '1000000000000',
  created: '2014-12-10T16:36:50.509000Z',
  crew: '342953',
  edited: '2014-12-10T16:36:50.509000Z',
  hyperdrive_rating: '4.0',
  length: '120000',
  manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
  max_atmosphering_speed: 'n/a',
  model: 'DS-1 Orbital Battle Station',
  name: 'Death Star',
  passengers: '843342',
  films: ['https://swapi.info/api/films/1/'],
  pilots: [],
  starship_class: 'Deep Space Mobile Battlestation',
  url: 'https://swapi.info/api/starships/9/',
}

export const mockVehicle: Vehicle = {
  cargo_capacity: '50000',
  consumables: '2 months',
  cost_in_credits: '150000',
  created: '2014-12-10T15:36:25.724000Z',
  crew: '46',
  edited: '2014-12-10T15:36:25.724000Z',
  length: '36.8',
  manufacturer: 'Corellia Mining Corporation',
  max_atmosphering_speed: '30',
  model: 'Digger Crawler',
  name: 'Sand Crawler',
  passengers: '30',
  pilots: [],
  films: ['https://swapi.info/api/films/1/'],
  url: 'https://swapi.info/api/vehicles/4/',
  vehicle_class: 'wheeled',
}

export const mockSpecies: Species = {
  average_height: '2.1',
  average_lifespan: '400',
  classification: 'Mammal',
  created: '2014-12-10T16:44:31.486000Z',
  designation: 'Sentient',
  edited: '2014-12-10T16:44:31.486000Z',
  eye_colors: 'blue, green, yellow, brown, golden, red',
  hair_colors: 'black, brown',
  homeworld: 'https://swapi.info/api/planets/14/',
  language: 'Shyriiwook',
  name: 'Wookie',
  people: ['https://swapi.info/api/people/13/'],
  films: ['https://swapi.info/api/films/1/', 'https://swapi.info/api/films/2/'],
  skin_colors: 'gray',
  url: 'https://swapi.info/api/species/3/',
}

export const mockPaginatedResult = <T>(items: T[]): PaginatedResult<T> => ({
  items,
  total: items.length,
  page: 1,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
})

export const createMockPeopleService = (): jest.Mocked<PeopleService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockPerson])),
  getById: jest.fn().mockResolvedValue(mockPerson),
})

export const createMockPlanetsService = (): jest.Mocked<PlanetsService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockPlanet])),
  getById: jest.fn().mockResolvedValue(mockPlanet),
})

export const createMockFilmsService = (): jest.Mocked<FilmsService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockFilm])),
  getById: jest.fn().mockResolvedValue(mockFilm),
})

export const createMockStarshipsService = (): jest.Mocked<StarshipsService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockStarship])),
  getById: jest.fn().mockResolvedValue(mockStarship),
})

export const createMockVehiclesService = (): jest.Mocked<VehiclesService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockVehicle])),
  getById: jest.fn().mockResolvedValue(mockVehicle),
})

export const createMockSpeciesService = (): jest.Mocked<SpeciesService> => ({
  getAll: jest.fn().mockResolvedValue(mockPaginatedResult([mockSpecies])),
  getById: jest.fn().mockResolvedValue(mockSpecies),
})

export const createMockRootStore = () => {
  const services = {
    people: createMockPeopleService(),
    planets: createMockPlanetsService(),
    films: createMockFilmsService(),
    starships: createMockStarshipsService(),
    vehicles: createMockVehiclesService(),
    species: createMockSpeciesService(),
  }
  return { services }
}
