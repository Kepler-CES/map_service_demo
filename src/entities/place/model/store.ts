/**
 * 관심 장소 Store
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Place } from '@/shared/types';

interface FavoritesState {
  favorites: Place[];
  addFavorite: (place: Place) => void;
  removeFavorite: (id: string) => void;
  updateFavorite: (id: string, place: Partial<Place>) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (place) =>
        set((state) => ({
          favorites: [...state.favorites, place],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((place) => place.id !== id),
        })),

      updateFavorite: (id, updatedPlace) =>
        set((state) => ({
          favorites: state.favorites.map((place) =>
            place.id === id ? { ...place, ...updatedPlace } : place
          ),
        })),

      isFavorite: (id) => {
        return get().favorites.some((place) => place.id === id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
