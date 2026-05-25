import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { PokemonDetail as PokemonDetailType } from "../types/pokemon";
import { fetchPokemonDetail } from "../services/pokemonService";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await fetchPokemonDetail(id!);
        setPokemon(data);
      } catch (error) {
        setError("Failed to load Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!pokemon) {
    return <p className="text-center mt-10">Pokémon not found</p>;
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xl text-error">{error}</p>
        <Link to="/" className="btn btn-primary">
          Back to Pokédex
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm mb-4">
        ← Back to Pokédex
      </Link>

      <div className="card bg-base-200 shadow-xl">
        <figure className="pt-6">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-48 h-48"
          />
        </figure>

        <div className="card-body items-center text-center">
          <p className="text-sm opacity-50">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h1 className="card-title text-3xl capitalize">{pokemon.name}</h1>

          <div className="flex gap-2 my-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="badge badge-primary capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="flex gap-8 my-4">
            <div>
              <p className="text-sm opacity-50">Height</p>
              <p className="font-bold">{pokemon.height / 10} m</p>
            </div>
            <div>
              <p className="text-sm opacity-50">Weight</p>
              <p className="font-bold">{pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className="w-full mt-4">
            <h2 className="text-lg font-bold mb-3">Stats</h2>
            <div className="flex flex-col gap-2">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-3">
                  <span className="w-32 text-sm capitalize">{s.stat.name}</span>
                  <progress
                    className="progress progress-primary flex-1"
                    value={s.base_stat}
                    max={255}
                  ></progress>
                  <span className="text-sm w-10 text-right">{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/battle" className="btn btn-primary mt-6">
            Choose for Battle ⚔️
          </Link>
        </div>
      </div>
    </div>
  );
}
