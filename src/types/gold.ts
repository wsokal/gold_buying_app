export interface GoldRate {
  timestamp: string;
  rates: {
    XAU: number; // Gold price in USD per troy ounce
    USD: number;
    CAD: number;
  };
}

export interface KaratPurity {
  karat: number;
  purity: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  weight: number;
  karat: number;
  price: number;
  timestamp: string;
  tested: boolean;
  currency: 'USD' | 'CAD';
}

export interface PriceCalculation {
  spotPrice: number;
  purityFactor: number;
  weight: number;
  fees: number;
  total: number;
}

export type Currency = 'USD' | 'CAD';