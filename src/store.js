import { writable, derived } from "svelte/store";

//create svelt store for api data
export const apiData = writable({});

export const matchIds = writable([]);

export const matchData = writable([]);

export const rankedData = writable([]);

export const runeData = writable([]);

export const itemData = writable([]);

export const summonerData = writable({});

export const mostPlayedData = writable();

export const spellsList = writable([]);
