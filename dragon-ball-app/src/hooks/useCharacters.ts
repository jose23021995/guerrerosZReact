import { useState, useEffect } from 'react';
import { type Character } from '../interfaces/character.interface';
import { characterService } from '../services/character.service';

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

  // FUNCION PARA REACTIVIDAD LOCAL
  // Esta función busca al personaje por ID y lo reemplaza en el estado local
  const updateCharacterLocal = (updatedChar: Character) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === updatedChar.id ? updatedChar : char
      )
    );
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { 
    characters, 
    isLoading, 
    error, 
    refetch: fetchCharacters,
    updateCharacterLocal // <-- Exportamos esto para el modal
  };
};
