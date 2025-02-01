import React from 'react';
import { GoldRate, Currency } from '../types/gold';
import { KARAT_PURITIES, calculatePricePerGram } from '../utils/goldCalculations';

interface PriceDisplayProps {
  currentRate: GoldRate;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  currentRate, 
  currency,
  onCurrencyChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Current Gold Prices</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="currency" className="text-sm font-medium text-gray-700">
            Currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {KARAT_PURITIES.map(({ karat, purity }) => (
          <div key={karat} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">{karat}K Gold</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {currency === 'USD' ? '$' : 'C$'}
              {calculatePricePerGram(
                currentRate.rates.XAU,
                karat,
                currency === 'CAD' ? currentRate.rates.CAD : 1
              ).toFixed(2)}
              <span className="text-sm text-gray-500">/g</span>
            </p>
            <p className="text-xs text-gray-500">Purity: {(purity * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Last updated: {new Date(currentRate.timestamp).toLocaleString()}
      </p>
    </div>
  );
};