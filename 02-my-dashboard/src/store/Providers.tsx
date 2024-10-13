"use client";

import { Provider } from "react-redux";
import { store } from ".";
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemons/pokemonsSlice";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const favoritePokemons = JSON.parse(
      localStorage.getItem("favorite-pokemons") ?? "{}"
    );

    store.dispatch(setFavoritePokemons(favoritePokemons));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
