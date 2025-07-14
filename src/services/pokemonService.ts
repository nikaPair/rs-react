export interface PokemonApiResponse {
  name: string;
  url: string;
  id?: string;
  sprites?: {
    front_default: string;
  };
}

class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  public async fetchPokemon(term: string): Promise<PokemonApiResponse[]> {
    let url: string;
    let isSinglePokemon = false;

    if (term === '') {
      url = `${this.baseUrl}?limit=10`;
    } else {
      url = `${this.baseUrl}${term.toLowerCase()}`;
      isSinglePokemon = true;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? 'Pokemon not found' : 'Failed to fetch data'
      );
    }

    const data = await response.json();

    if (isSinglePokemon) {
      return [
        {
          name: data.name,
          url: data.url,
          id: data.id.toString(),
          sprites: data.sprites,
        },
      ];
    } else {
      const detailedPokemonPromises = data.results.map(
        async (pokemon: PokemonApiResponse) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}`);
          }
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            url: pokemonData.url,
            id: pokemonData.id.toString(),
            sprites: pokemonData.sprites,
          };
        }
      );

      return await Promise.all(detailedPokemonPromises);
    }
  }
}

export const pokemonService = new PokemonService();
