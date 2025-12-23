import { writable } from "svelte/store";

export type Song = {
    id: string,
    name: string,
    startSinging: number | undefined,
    endSinging: number | undefined
}

export type House = {
    id: string,
    name: string,
    arrival: number,
    departure: number | undefined
    songs: Song[]
}

export const houses = writable<House[]>([]);