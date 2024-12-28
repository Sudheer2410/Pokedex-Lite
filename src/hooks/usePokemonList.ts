import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { getPokemonList, getPokemonDetails } from '../services/api';

interface UsePokemonListResult {
  allPokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

export function usePokemonList(): UsePokemonListResult {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        setLoading(true);
        setError(null);

        // Fetch first to get total count
        const initial = await getPokemonList(1, 20);
        const totalCount = Math.min(initial.count, 151); // Limit to first generation for better performance
        
        // Fetch all pokemon
        const listData = await getPokemonList(1, totalCount);
        const pokemonDetails = await Promise.all(
          listData.results.map((pokemon) => getPokemonDetails(pokemon.url))
        );

        setAllPokemons(pokemonDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchAllPokemons();
  }, []);

  return { allPokemons, loading, error };
}