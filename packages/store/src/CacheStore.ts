import { makeAutoObservable } from "mobx";

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl: number;
}

export class CacheStore {
    private entries = new Map<string, CacheEntry<any>>();

    static readonly TTL = {
        people: 5 * 60 * 1000, // 5 minutes
        planets: 10 * 60 * 1000, // 10 minutes
        films: 30 * 60 * 1000, // 15 minutes
        species: 10 * 60 * 1000, // 20 minutes
        starships: 10 * 60 * 1000, // 25 minutes
        vehicles: 10 * 60 * 1000, // 30 minutes
    }

    constructor() {
        makeAutoObservable(this);
    }

    set<T>(key: string, data: T, ttl: number): void {
        this.entries.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        });
    }

    get<T>(key: string): T | null {
        const entry = this.entries.get(key);
        if (!entry) return null;
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.entries.delete(key);
            return null;
        }
        return entry.data as T;
    }

    isStale(key: string): boolean {
        return this.get(key) === null;
    }

    invalidate(prefix: string): void {
        for (const key of this.entries.keys()) {
            if (key.startsWith(prefix)) {
                this.entries.delete(key);
            }
        }
    }

    clear(): void {
        this.entries.clear();
    }
}