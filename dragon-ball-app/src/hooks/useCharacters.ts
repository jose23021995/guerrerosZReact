import { useState, useEffect } from 'react';
import { type Character } from '@/interfaces/character.interface';
import { characterService } from '@/services/character.service';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      const data = await characterService.getCharacters();
      setCharacters(data.items);
      setError(null);
    } catch (err: any) { 
      setError('Error al cargar los personajes de Dragon Ball');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar automáticamente al montar el componente
  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    isLoading,
    error,
    refetch: fetchCharacters // Por si queremos un botón de "Recargar"
  };
};
