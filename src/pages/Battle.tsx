import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { useBattle } from "../hooks/useBattle";
import { useAuth } from "../hooks/useAuth";
import type { PokemonDetail } from "../types/pokemon";

export default function Battle() {
  const [allPokemons, setAllPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    player,
    enemy,
    logs,
    phase,
    winner,
    startBattle,
    playerAttack,
    resetBattle,
  } = useBattle();
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const resultSent = useRef(false);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );
        const data = await response.json();
        setAllPokemons(data.results);
      } catch (error) {
        console.error("Failed to load pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  const handleSelectPokemon = async (id: number) => {
    let randomId = Math.floor(Math.random() * 151) + 1;
    while (randomId === id) {
      randomId = Math.floor(Math.random() * 151) + 1;
    }

    const [playerData, enemyData] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then((r) =>
        r.json(),
      ),
    ]);

    startBattle(playerData, enemyData);
  };

  const handleSelectRandom = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    await handleSelectPokemon(randomId);
  };

  const sendBattleResult = async (won: boolean) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: won ? 50 : 0,
          wins: won ? 1 : 0,
          losses: won ? 0 : 1,
        }),
      });
    } catch (error) {
      console.error("Failed to save battle result:", error);
    }
  };

  // Auto-select pokemon from URL query
  useEffect(() => {
    const pokemonId = searchParams.get("pokemon");
    if (pokemonId && allPokemons.length > 0) {
      handleSelectPokemon(Number(pokemonId));
    }
  }, [allPokemons]);

  // Send battle result when battle ends
  useEffect(() => {
    if (phase === "result" && winner && !resultSent.current) {
      resultSent.current = true;
      sendBattleResult(winner === "player");
    }
    if (phase === "select") {
      resultSent.current = false;
    }
  }, [phase, winner]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // SELECT PHASE
  if (phase === "select") {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-6">
          ⚔️ Choose Your Pokémon
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleSelectRandom}
            className="btn btn-primary btn-lg"
          >
            🎲 Random Battle
          </button>
        </div>

        <p className="text-center opacity-60 mb-4">Or pick your fighter:</p>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {allPokemons.map((pokemon, index) => {
            const id = index + 1;
            return (
              <div
                key={id}
                onClick={() => handleSelectPokemon(id)}
                className="card bg-base-200 p-2 items-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
                <p className="text-xs capitalize">{pokemon.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // FIGHTING PHASE
  if (phase === "fighting" && player && enemy) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-6">⚔️ Battle!</h1>

        <div className="flex justify-between items-center gap-4 mb-6">
          {/* Player */}
          <div className="flex flex-col items-center flex-1">
            <img
              src={
                player.detail.sprites.other["official-artwork"].front_default
              }
              alt={player.detail.name}
              className="w-32 h-32"
            />
            <h2 className="text-lg font-bold capitalize mt-2">
              {player.detail.name}
            </h2>
            <p className="text-sm">
              HP: {player.currentHp} / {player.maxHp}
            </p>
            <progress
              className="progress progress-success w-full"
              value={player.currentHp}
              max={player.maxHp}
            ></progress>
          </div>

          <span className="text-2xl font-bold">VS</span>

          {/* Enemy */}
          <div className="flex flex-col items-center flex-1">
            <img
              src={enemy.detail.sprites.other["official-artwork"].front_default}
              alt={enemy.detail.name}
              className="w-32 h-32"
            />
            <h2 className="text-lg font-bold capitalize mt-2">
              {enemy.detail.name}
            </h2>
            <p className="text-sm">
              HP: {enemy.currentHp} / {enemy.maxHp}
            </p>
            <progress
              className="progress progress-error w-full"
              value={enemy.currentHp}
              max={enemy.maxHp}
            ></progress>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button onClick={playerAttack} className="btn btn-primary btn-lg">
            ⚡ Attack!
          </button>
        </div>

        {/* Battle Log */}
        <div className="bg-base-200 rounded-lg p-4 max-h-48 overflow-y-auto">
          {logs.map((log, index) => (
            <p
              key={index}
              className={`text-sm mb-1 ${
                log.type === "player"
                  ? "text-success"
                  : log.type === "enemy"
                    ? "text-error"
                    : "text-info"
              }`}
            >
              {log.message}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // RESULT PHASE
  if (phase === "result" && player && enemy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <h1 className="text-4xl font-bold">
          {winner === "player" ? "🎉 Victory!" : "💀 Defeat!"}
        </h1>

        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <img
              src={
                player.detail.sprites.other["official-artwork"].front_default
              }
              alt={player.detail.name}
              className={`w-32 h-32 ${winner === "enemy" ? "grayscale opacity-50" : ""}`}
            />
            <p className="capitalize font-bold mt-2">{player.detail.name}</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={enemy.detail.sprites.other["official-artwork"].front_default}
              alt={enemy.detail.name}
              className={`w-32 h-32 ${winner === "player" ? "grayscale opacity-50" : ""}`}
            />
            <p className="capitalize font-bold mt-2">{enemy.detail.name}</p>
          </div>
        </div>

        {/* Battle Log */}
        <div className="bg-base-200 rounded-lg p-4 max-h-48 overflow-y-auto w-full max-w-md">
          {logs.map((log, index) => (
            <p
              key={index}
              className={`text-sm mb-1 ${
                log.type === "player"
                  ? "text-success"
                  : log.type === "enemy"
                    ? "text-error"
                    : "text-info"
              }`}
            >
              {log.message}
            </p>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={resetBattle} className="btn btn-primary">
            Battle Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
