import type { PokemonDetail } from "./pokemon";

export interface BattlePokemon {
  detail: PokemonDetail;
  currentHp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface BattleLog {
  message: string;
  type: "player" | "enemy" | "info";
}

export type BattlePhase = "select" | "fighting" | "result";
