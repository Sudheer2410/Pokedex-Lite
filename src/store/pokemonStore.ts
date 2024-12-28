import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import type { Pokemon } from '../types/pokemon';

interface PokemonStore {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id) => set((state) => ({
        favorites: [...state.favorites, id]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((favId) => favId !== id)
      })),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'pokemon-favorites',
    }
  )
);