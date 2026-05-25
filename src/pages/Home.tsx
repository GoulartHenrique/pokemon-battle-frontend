import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { PokemonDetail } from "../types/pokemon";
import { fetchPokemonListWithDetails } from "../services/pokemonService";
const typeColorHex: Record<string, string> = {
  normal: "#9CA3AF",
  fire: "#EF4444",
  water: "#3B82F6",
  electric: "#EAB308",
  grass: "#22C55E",
  ice: "#67E8F9",
  fighting: "#C2410C",
  poison: "#A855F7",
  ground: "#D97706",
  flying: "#818CF8",
  psychic: "#EC4899",
  bug: "#84CC16",
  rock: "#78716C",
  ghost: "#6D28D9",
  dragon: "#4338CA",
  dark: "#374151",
  steel: "#9CA3AF",
  fairy: "#F9A8D4",
};

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchPokemonListWithDetails();
        setPokemons(data);
      } catch (error) {
        console.error("Failed to fetch pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = typeFilter
      ? pokemon.types.some((t) => t.type.name === typeFilter)
      : true;

    return matchesName && matchesType;
  });

  const allTypes = [
    ...new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name))),
  ].sort();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Pokédex</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          className={`btn btn-sm ${typeFilter === "" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setTypeFilter("")}
        >
          All
        </button>
        {allTypes.map((type) => (
          <button
            key={type}
            className={`btn btn-sm capitalize ${typeFilter === type ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPokemons.map((pokemon) => {
          const mainType = pokemon.types[0].type.name;
          const color = typeColorHex[mainType] || "#6b7280";
          return (
            <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <div className="card hover:shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden">
                <div
                  className="flex justify-center pt-6 pb-4"
                  style={{
                    background: `linear-gradient(180deg, ${color}20, ${color}10)`,
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="w-24 h-24 drop-shadow-lg"
                  />
                </div>
                <div className="card-body items-center p-4 bg-base-200">
                  <p className="text-xs opacity-50">
                    #{String(pokemon.id).padStart(3, "0")}
                  </p>
                  <h2 className="card-title text-sm capitalize">
                    {pokemon.name}
                  </h2>
                  <div className="flex gap-1">
                    {pokemon.types.map((t) => (
                      <span
                        key={t.type.name}
                        className="badge badge-sm capitalize text-white"
                        style={{
                          backgroundColor:
                            typeColorHex[t.type.name] || "#6b7280",
                        }}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
