import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getPokemons {
    pokemons: pokemon_v2_pokemon(where: { id: { _lt: 3000 } }) {
      name
      id
      weight
      height
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          name
        }
        base_stat
      }
      moves: pokemon_v2_pokemonmoves(limit: 2) {
        move: pokemon_v2_move {
          name
        }
      }
      specy: pokemon_v2_pokemonspecy {
        is_legendary
        is_mythical
        is_baby
        description: pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 }, version_id: { _eq: 1 } }
        ) {
          flavor_text
        }
      }
    }
  }
`;
