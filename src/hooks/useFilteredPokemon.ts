import { useMemo } from 'react';
import { Pokemon } from '../types/pokemon';

interface UseFilteredPokemonResult {
  paginatedPokemons: Pokemon[];
  totalPages: number;
}

export function useFilteredPokemon(
  allPokemons: Pokemon[],
  searchTerm: string,
  selectedTypes: string[],
  currentPage: number,
  itemsPerPage: number
): UseFilteredPokemonResult {
  const filteredPokemons = useMemo(() => {
    return allPokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.types.some((type) =>
          selectedTypes.includes(type.type.name)
        );
      return matchesSearch && matchesType;
    });
  }, [allPokemons, searchTerm, selectedTypes]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemons = filteredPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return {
    paginatedPokemons,
    totalPages,
  };
}