export interface Person {
  name: string;
  birth_year: string;
  eye_color: string | 'unknown' | 'n/a';
  gender: 'Male' | 'Female' | 'unknown' | 'n/a';
  hair_color: string | 'unknown' | 'n/a';
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string; // URL ref to a Planet
  films: string[]; // URL refs to Films
  species: string[]; // URL refs to Species
  starships: string[]; // URL refs to Starships
  vehicles: string[]; // URL refs to Vehicles
  url: string;
  created: string;
  edited: string;
}