import axios, { AxiosError } from "axios";

export const client = axios.create({
    baseURL: "https://swapi.dev/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ detail?: string }>) => {
        const message = error.response?.data?.detail ?? error.message ?? "An unexpected error occurred";
        console.error("API Error:", message);
        return Promise.reject(new Error(message));
    }
);