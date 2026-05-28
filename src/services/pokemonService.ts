import type { PokemonListItem, PokemonDetail } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonListWithDetails(): Promise<PokemonDetail[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
  const data = await response.json();

  const details = await Promise.all(
    data.results.map((_pokemon: PokemonListItem, index: number) =>
      fetch(`${BASE_URL}/pokemon/${index + 1}`).then((res) => res.json()),
    ),
  );

  return details;
}

export async function fetchPokemonDetail(id: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
}
