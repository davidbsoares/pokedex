export const COLORS: { [key: string]: any } = {
  primary: '#F2BB07',
  second: '#F28F16',
  third: '#F5DB13',
  danger: '#D93E30',
  white: '#F6F7F9',
  dark: '#212121',
  types: {
    stile: '#A1A1A1', // stile, dark, rock
    grass: '#70A83B', // grass, bug
    ice: '#A2CFF0', // ice, water
    fire: '#F76545', // fire, fighting, dragon
    normal: '#76AADB', // normal, gosth
    poison: '#A974BC', // poison, psychic, fairy, ghost
    ground: '#9B897B', // ground
    electric: '#F7C545', // electric
  },
} as const;

export default COLORS;
