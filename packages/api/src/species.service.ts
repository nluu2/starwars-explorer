import type { SwapiList, Species } from "@starwars/domain";
import { client } from "./client";

export const speciesService = {
    getAll: (page = 1, search = ''): Promise<SwapiList<Species>> =>
        client.get<SwapiList<Species>>("/species/", {
            params: { page, search: search || undefined }
        }).then(response => response.data),
    getById: (id: string): Promise<Species> =>
        client.get<Species>(`/species/${id}/`).then(response => response.data)
};

export type SpeciesService = typeof speciesService;