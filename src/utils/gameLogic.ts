import { Shape, GameState } from '../types/game';

const ZODIAC_SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
] as const;

const COLORS = [
  '#FF6B6B', // Fire signs (Aries, Leo, Sagittarius)
  '#4ECDC4', // Earth signs (Taurus, Virgo, Capricorn)
  '#45B7D1', // Air signs (Gemini, Libra, Aquarius)
  '#96CEB4', // Water signs (Cancer, Scorpio, Pisces)
];

export const generateRandomShape = (): Shape => {
  const type = ZODIAC_SIGNS[Math.floor(Math.random() * ZODIAC_SIGNS.length)];
  
  // Assign colors based on element
  let color;
  if (['aries', 'leo', 'sagittarius'].includes(type)) {
    color = COLORS[0]; // Fire
  } else if (['taurus', 'virgo', 'capricorn'].includes(type)) {
    color = COLORS[1]; // Earth
  } else if (['gemini', 'libra', 'aquarius'].includes(type)) {
    color = COLORS[2]; // Air
  } else {
    color = COLORS[3]; // Water
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    color,
  };
};

export const generateSequence = (length: number): Shape[] => {
  return Array.from({ length }, () => generateRandomShape());
};

export const calculateTokens = (matches: number): number => {
  // Base 100 tokens for playing
  const baseTokens = 100;
  
  // Additional tokens for matches
  const tokenValues = {
    1: 100,    // Minimum 100 tokens per match
    2: 200,
    3: 500,
    4: 1000,
    5: 2000,
    6: 5000,
    7: 8000,
    8: 12000,
    9: 15000,
    10: 18000,
    11: 22000,
    12: 25000
  };
  
  return baseTokens + (tokenValues[matches as keyof typeof tokenValues] || 0);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const checkMatches = (targetSequence: Shape[], playerSequence: (Shape | null)[]): boolean[] => {
  return playerSequence.map((shape, index) => 
    shape?.type === targetSequence[index].type && shape?.color === targetSequence[index].color
  );
};