import type { BattlePokemon } from "../types/battle";

export function calculateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
): number {
  const baseDamage = attacker.attack - defender.defense / 2;
  const randomFactor = 0.85 + Math.random() * 0.3;
  const damage = Math.max(1, Math.floor(baseDamage * randomFactor));
  return damage;
}

export function getFirstAttacker(
  player: BattlePokemon,
  enemy: BattlePokemon,
): "player" | "enemy" {
  return player.speed >= enemy.speed ? "player" : "enemy";
}

export function prepareBattlePokemon(detail: any): BattlePokemon {
  const hp =
    detail.stats.find((s: any) => s.stat.name === "hp")?.base_stat || 100;
  const attack =
    detail.stats.find((s: any) => s.stat.name === "attack")?.base_stat || 50;
  const defense =
    detail.stats.find((s: any) => s.stat.name === "defense")?.base_stat || 50;
  const speed =
    detail.stats.find((s: any) => s.stat.name === "speed")?.base_stat || 50;

  return {
    detail,
    currentHp: hp,
    maxHp: hp,
    attack,
    defense,
    speed,
  };
}
