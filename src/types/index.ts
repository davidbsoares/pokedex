export type PokemonsProps = {
  pokemons: Array<{
    name: string;
    id: number;
    weight?: number | null | undefined;
    height?: number | null | undefined;
    types: Array<{
      type?: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat?: { name: string | null | undefined };
    }>;
    moves: Array<{
      move?: { name: string | null | undefined };
    }>;
    specy?:
      | {
          is_legendary: boolean;
          is_mythical: boolean;
          is_baby: boolean;
          description: Array<{
            flavor_text: string;
          }>;
        }
      | null
      | undefined;
  }>;
};

export type PokemonProps = {
  name: string;
  id: number;
  weight?: number | null | undefined;
  height?: number | null | undefined;
  types: Array<{
    type?: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string | null | undefined };
  }>;
  moves: Array<{
    move?: { name: string | null | undefined };
  }>;
  specy?:
    | {
        is_legendary: boolean;
        is_mythical: boolean;
        is_baby: boolean;
        description: Array<{
          flavor_text: string;
        }>;
      }
    | null
    | undefined;
};
