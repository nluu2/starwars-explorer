export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string; // "YYYY-MM-DD"
    species: string[]; // URL refs to Species
    starships: string[]; // URL refs to Starships
    vehicles: string[]; // URL refs to Vehicles
    characters: string[]; // URL refs to People
    planets: string[]; // URL refs to Planets
    url: string;
    created: string;
    edited: string;
}