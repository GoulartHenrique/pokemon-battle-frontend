import { useState } from "react";
import type { BattlePokemon, BattleLog, BattlePhase } from "../types/battle";
import type { PokemonDetail } from "../types/pokemon";
import {
  calculateDamage,
  getFirstAttacker,
  prepareBattlePokemon,
} from "../utils/battleCalc";

export function useBattle() {
  const [player, setPlayer] = useState<BattlePokemon | null>(null);
  const [enemy, setEnemy] = useState<BattlePokemon | null>(null);
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [phase, setPhase] = useState<BattlePhase>("select");
  const [winner, setWinner] = useState<"player" | "enemy" | null>(null);

  const addLog = (message: string, type: BattleLog["type"]) => {
    setLogs((prev) => [...prev, { message, type }]);
  };

  const startBattle = (
    playerDetail: PokemonDetail,
    enemyDetail: PokemonDetail,
  ) => {
    setPlayer(prepareBattlePokemon(playerDetail));
    setEnemy(prepareBattlePokemon(enemyDetail));
    setLogs([]);
    setWinner(null);
    setPhase("fighting");

    const first = getFirstAttacker(
      prepareBattlePokemon(playerDetail),
      prepareBattlePokemon(enemyDetail),
    );

    addLog(`Battle started!`, "info");
    addLog(
      `${first === "player" ? playerDetail.name : enemyDetail.name} is faster and attacks first!`,
      "info",
    );
  };

  const playerAttack = () => {
    if (!player || !enemy || phase !== "fighting") return;

    const damage = calculateDamage(player, enemy);
    const newEnemyHp = Math.max(0, enemy.currentHp - damage);

    setEnemy({ ...enemy, currentHp: newEnemyHp });
    addLog(
      `${player.detail.name} attacks and deals ${damage} damage!`,
      "player",
    );

    if (newEnemyHp <= 0) {
      addLog(`${enemy.detail.name} fainted! You win!`, "info");
      setWinner("player");
      setPhase("result");
      return;
    }

    // Enemy attacks back
    setTimeout(() => {
      const enemyDamage = calculateDamage(enemy, player);
      const newPlayerHp = Math.max(0, player.currentHp - enemyDamage);

      setPlayer((prev) => (prev ? { ...prev, currentHp: newPlayerHp } : null));
      addLog(
        `${enemy.detail.name} attacks and deals ${enemyDamage} damage!`,
        "enemy",
      );

      if (newPlayerHp <= 0) {
        addLog(`${player.detail.name} fainted! You lose!`, "info");
        setWinner("enemy");
        setPhase("result");
      }
    }, 1000);
  };

  const resetBattle = () => {
    setPlayer(null);
    setEnemy(null);
    setLogs([]);
    setWinner(null);
    setPhase("select");
  };

  return {
    player,
    enemy,
    logs,
    phase,
    winner,
    startBattle,
    playerAttack,
    resetBattle,
  };
}
