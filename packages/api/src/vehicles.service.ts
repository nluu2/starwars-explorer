import type { SwapiList, Vehicle } from "@starwars/domain";
import { client } from "./client";

export const vehiclesService = {
    getAll: (page = 1, search = ''): Promise<SwapiList<Vehicle>> =>
        client.get<SwapiList<Vehicle>>("/vehicles/", {
            params: { page, search: search || undefined }
        }).then(response => response.data),
    getById: (id: string): Promise<Vehicle> =>
        client.get<Vehicle>(`/vehicles/${id}/`).then(response => response.data)
};

export type VehiclesService = typeof vehiclesService;