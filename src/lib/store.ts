import { writable } from "svelte/store";

export type Song = {
    name: string,
    startSinging: number,
    endSinging: number | undefined
}

export type House = {
    name: string,
    arrival: number,
    departure: number | undefined
    songs: Song[]
}

export const houses = writable<House[]>([]);