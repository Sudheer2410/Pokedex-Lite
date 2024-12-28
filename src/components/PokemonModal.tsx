// import React from 'react';
import { X } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { capitalize } from '../lib/utils';

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{capitalize(pokemon.name)}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-64 h-64 object-contain bg-gray-50 rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Types</h3>
                <div className="flex gap-2">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className="px-3 py-1 rounded-full text-sm font-medium text-white bg-gray-600"
                    >
                      {capitalize(type.name)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {capitalize(stat.stat.name)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(({ ability }) => (
                    <span
                      key={ability.name}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {capitalize(ability.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}