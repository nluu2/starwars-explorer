import type { SwapiList, Planet } from "@starwars/domain";
import { client } from "./client";

export const planetsService = {
    getAll: (page = 1, search = ''): Promise<SwapiList<Planet>> =>
        client.get<SwapiList<Planet>>("/planets/", {
            params: { page, search: search || undefined }
        }).then(response => response.data),
    getById: (id: string): Promise<Planet> =>
        client.get<Planet>(`/planets/${id}/`).then(response => response.data)
};

export type PlanetsService = typeof planetsService;