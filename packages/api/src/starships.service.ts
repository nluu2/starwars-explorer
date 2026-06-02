import type { SwapiList, Starship } from "@starwars/domain";
import { client } from "./client";

export const starshipsService = {
    getAll: (page = 1, search = ''): Promise<SwapiList<Starship>> =>
        client.get<SwapiList<Starship>>("/starships/", {
            params: { page, search: search || undefined }
        }).then(response => response.data),
    getById: (id: string): Promise<Starship> =>
        client.get<Starship>(`/starships/${id}/`).then(response => response.data)
};

export type StarshipsService = typeof starshipsService;