import { MiddlewareAPI, Action, Dispatch } from "@reduxjs/toolkit";

export const localStorageMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    if (action.type === "pokemons/toggleFavorite") {
      const { pokemons } = store.getState();

      localStorage.setItem(
        "favorite-pokemons",
        JSON.stringify(pokemons.entities)
      );
    }
    next(action);
    return;
  };
