import { FavoritePokemons } from "@/pokemons/components/FavoritePokemons";

export default function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokemons Favoritos<small className="text-blue-500">Global State</small>
      </span>
      <FavoritePokemons />
    </div>
  );
}

// https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
