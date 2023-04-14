import { pokeApi } from '@/api';
import { Pokemon as IPokemon } from '@/interfaces';

export const getPokemonInfo = async (idOrName: string) => {
  try {
    const {data} = await pokeApi.get<IPokemon>(`/pokemon/${idOrName}`)
    return{
      id: data.id,
      name: data.name,
      sprites: data.sprites
    }
    
  } catch (error) {
    return null
  }

}
