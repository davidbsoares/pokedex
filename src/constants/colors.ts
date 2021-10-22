type ColorsProps = {
  [key: string]: any;
};

export const COLORS: ColorsProps = {
  primary: '#F2BB07',
  second: '#F28F16',
  third: '#F5DB13',
  danger: '#D93E30',
  white: '#F6F7F9',
  dark: '#212121',
  types: {
    steel: '#A1A1A1',
    dark: '#A1A1A1',
    rock: '#A1A1A1',
    shadow: '#A1A1A1',
    grass: '#70A83B',
    bug: '#70A83B',
    ice: '#A2CFF0',
    water: '#A2CFF0',
    fire: '#F76545',
    fighting: '#F76545',
    dragon: '#F76545',
    normal: '#76AADB',
    flying: '#76AADB',
    ghost: '#A974BC',
    poison: '#A974BC',
    psychic: '#A974BC',
    fairy: '#A974BC',
    unknown: '#A974BC',
    ground: '#9B897B',
    electric: '#F7C545',
  },
} as const;

export default COLORS;
