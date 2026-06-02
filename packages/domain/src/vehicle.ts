export interface Vehicle {
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: string[]; // URL refs to Films
    pilots: string[]; // URL refs to People
    url: string;
    created: string;
    edited: string;
}