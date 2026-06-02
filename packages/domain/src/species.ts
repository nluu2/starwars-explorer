export interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_colors: string | 'none';
    hair_colors: string | 'none';
    skin_colors: string | 'none';
    language: string;
    homeworld: string; // URL ref to a Planet
    people: string[]; // URL refs to People
    films: string[]; // URL refs to Films
    url: string;
    created: string;
    edited: string;
}