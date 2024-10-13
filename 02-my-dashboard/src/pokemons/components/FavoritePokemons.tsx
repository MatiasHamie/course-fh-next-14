"use client";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritePokemons = () => {
  const favoritesPokemons = useAppSelector((state) =>
    Object.values(state.pokemons.favorites)
  );

  return (
    <>
      {!favoritesPokemons.length ? (
        <NoFavorites />
      ) : (
        <PokemonGrid pokemons={favoritesPokemons} />
      )}
    </>
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline className="text-9xl text-red-500" />
      <span className="text-3xl">No hay pokemons favoritos</span>
    </div>
  );
};
