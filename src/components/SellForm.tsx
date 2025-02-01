import React, { useState } from 'react';
import { GoldRate, Currency } from '../types/gold';
import { KARAT_PURITIES, calculateSellPrice } from '../utils/goldCalculations';

interface SellFormProps {
  currentRate: GoldRate;
  currency: Currency;
  onSubmit: (transaction: any) => void;
}

export const SellForm: React.FC<SellFormProps> = ({ currentRate, currency, onSubmit }) => {
  const [weight, setWeight] = useState<number>(0);
  const [karat, setKarat] = useState<number>(24);
  const [premium, setPremium] = useState<number>(10); // 10% default premium

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = calculateSellPrice(
      currentRate.rates.XAU,
      weight,
      karat,
      premium / 100,
      currency === 'CAD' ? currentRate.rates.CAD : 1
    );

    onSubmit({
      type: 'sell',
      weight,
      karat,
      price,
      currency,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sell Gold</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (grams)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Karat</label>
          <select
            value={karat}
            onChange={(e) => setKarat(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
          >
            {KARAT_PURITIES.map(({ karat }) => (
              <option key={karat} value={karat}>{karat}K</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Seller Premium (%)</label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="100"
            value={premium}
            onChange={(e) => setPremium(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Recommended Price</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {currency === 'USD' ? '$' : 'C$'}
            {calculateSellPrice(
              currentRate.rates.XAU,
              weight,
              karat,
              premium / 100,
              currency === 'CAD' ? currentRate.rates.CAD : 1
            ).toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          List for Sale
        </button>
      </div>
    </form>
  );
};