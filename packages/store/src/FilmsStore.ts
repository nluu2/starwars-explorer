import { makeAutoObservable, runInAction } from "mobx";
import type { FilmsService } from "@starwars/api";
import type { Film, SwapiList } from "@starwars/domain";
import { CacheStore } from "./CacheStore";
import type { RootStore } from "./RootStore";

export class FilmsStore {
    list: Film[] = [];
    selected: Film | null = null;
    isLoading: boolean = false;
    isLoadingDetail: boolean = false;
    error: string | null = null;

    constructor(
        private root: RootStore,
        private service: FilmsService,
    ) {
        makeAutoObservable(this);
    }

    get isEmpty(): boolean {
        return !this.isLoading && this.list.length === 0;
    }

    get sortedByEpisode(): Film[] {
        return [...this.list].sort((a, b) => a.episode_id - b.episode_id);
    }

    fetchAll = async (): Promise<void> => {
        const cacheKey = 'films:list';
        const cached = this.root.cache.get<SwapiList<Film>>(cacheKey);

        if (cached) {
            runInAction(() => {
                this.list = cached.results;
            });
            return;
        }

        runInAction(() => {
            this.isLoading = true;
            this.error = null;
        });

        try {
            const data = await this.service.getAll();
            this.root.cache.set(cacheKey, data, CacheStore.TTL.films);
            runInAction(() => {
                this.list = data.results;
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Failed to load films";
                this.root.ui.addNotification({ type: "error", message: this.error! });
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }

    };

    selectById = async (id: string): Promise<void> => {
        const cacheKey = `films:detail:${id}`;
        const cached = this.root.cache.get<Film>(cacheKey);
    
        if (cached) {
            runInAction(() => {
                this.selected = cached;
            });
            this.root.ui.openDrawer(id);
            return;
        }
    
        runInAction(() => {
            this.isLoadingDetail = true;
        });
    
        try {
            const film = await this.service.getById(id);
            this.root.cache.set(cacheKey, film, CacheStore.TTL.films);
            runInAction(() => {
                this.selected = film;
            });
            this.root.ui.openDrawer(id);
        } catch (e) {
            this.error = e instanceof Error ? e.message : "Failed to load film";
            runInAction(() => {
                this.root.ui.addNotification({ type: "error", message: this.error! });
            });
        } finally {
            runInAction(() => {
                this.isLoadingDetail = false;
            });
        }
    }
    
    clearSelected = (): void => {
        this.selected = null;
    }
    
    refresh = (): Promise<void> => {
        this.root.cache.invalidate("films:");
        return this.fetchAll();
    }
}
