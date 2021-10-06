import { gql } from 'graphql-request';

export const GET_POKEMONS = gql`
  query {
    pokemon: pokemon_v2_pokemon {
      name
      id
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats(
        where: { pokemon_v2_stat: { name: { _in: ["attack", "defense"] } } }
      ) {
        stat: pokemon_v2_stat {
          name
        }
        base_stat
      }
    }
  }
`;
