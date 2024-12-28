import React from 'react';
import { Heart } from 'lucide-react';
import { usePokemonStore } from '../store/pokemonStore';
import { Pokemon } from '../types/pokemon';
import { capitalize, cn } from '../lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = usePokemonStore();
  const favorite = isFavorite(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors",
            favorite ? "fill-red-500 text-red-500" : "text-gray-400"
          )}
        />
      </button>
      
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-full h-48 object-contain bg-gray-50"
      />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{capitalize(pokemon.name)}</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium text-white",
                `bg-${type.name}`
              )}
            >
              {capitalize(type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}