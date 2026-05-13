import api from '../api/axios.config';
import { type APIResponse, type Character } from '../interfaces/character.interface';

export const characterService = {
  // Obtenemos la lista paginada
  getCharacters: async (page = 1, limit = 10): Promise<APIResponse<Character>> => {
    const { data } = await api.get<APIResponse<Character>>(`/characters`, {
      params: { page, limit }
    });
    return data;
  },

  // Obtener un personaje por ID (para el detalle)
  getCharacterById: async (id: number): Promise<Character> => {
    const { data } = await api.get<Character>(`/characters/${id}`);
    return data;
  }
};
