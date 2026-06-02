export interface Starship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string | 'N/A';
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[]; // URL refs to Films
    pilots: string[]; // URL refs to People
    url: string;
    created: string;
    edited: string;
}