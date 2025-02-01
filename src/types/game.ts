export type Shape = {
  id: string;
  type: 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';
  color: string;
};

export type GameState = {
  targetSequence: Shape[];
  bottomShapes: Shape[];
  playerSequence: (Shape | null)[];
  matches: boolean[];
  tokensWon: number;
  totalTokens: number;
  gamesPlayed: number;
  lastPlayedDate: string | null;
};

export type GameStatus = 'ready' | 'playing' | 'complete' | 'doubleOrNothing';