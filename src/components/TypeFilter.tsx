import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { POKEMON_TYPES } from '../lib/utils';

interface TypeFilterProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

export function TypeFilter({ selectedTypes, onChange }: TypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onChange(newTypes);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 
                   flex items-center gap-2 transition-colors duration-200"
      >
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700">
          {selectedTypes.length ? `${selectedTypes.length} selected` : 'Filter by type'}
        </span>
      </button>

      {selectedTypes.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 
                        p-3 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {POKEMON_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:scale-105 active:scale-95",
                  selectedTypes.includes(type)
                    ? `bg-${type} text-white`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}