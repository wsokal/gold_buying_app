import { KaratPurity } from '../types/gold';

export const KARAT_PURITIES: KaratPurity[] = [
  { karat: 24, purity: 0.999 },
  { karat: 22, purity: 0.916 },
  { karat: 18, purity: 0.750 },
  { karat: 14, purity: 0.585 },
  { karat: 10, purity: 0.417 },
  { karat: 9, purity: 0.375 },
];

// Convert troy ounces to grams
export const ouncesToGrams = (ounces: number): number => ounces * 31.1035;

// Convert grams to troy ounces
export const gramsToOunces = (grams: number): number => grams / 31.1035;

export const calculatePricePerGram = (
  spotPricePerOunce: number,
  karatPurity: number,
  exchangeRate: number = 1
): number => {
  const purityFactor = KARAT_PURITIES.find(k => k.karat === karatPurity)?.purity || 1;
  return ((spotPricePerOunce * purityFactor) / 31.1035) * exchangeRate;
};

export const calculateBuyPrice = (
  spotPricePerOunce: number,
  weightInGrams: number,
  karatPurity: number,
  buyDiscount: number = 0.10, // 10% default discount
  exchangeRate: number = 1
): number => {
  const pricePerGram = calculatePricePerGram(spotPricePerOunce, karatPurity, exchangeRate);
  const basePrice = pricePerGram * weightInGrams;
  return basePrice * (1 - buyDiscount);
};

export const calculateSellPrice = (
  spotPricePerOunce: number,
  weightInGrams: number,
  karatPurity: number,
  premium: number = 0.10, // 10% default premium
  exchangeRate: number = 1
): number => {
  const pricePerGram = calculatePricePerGram(spotPricePerOunce, karatPurity, exchangeRate);
  const basePrice = pricePerGram * weightInGrams;
  return basePrice * (1 + premium);
};