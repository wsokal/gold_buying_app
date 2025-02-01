import React, { useState, useEffect } from 'react';
import { GoldRate, Currency, Transaction } from './types/gold';
import { PriceDisplay } from './components/PriceDisplay';
import { BuyForm } from './components/BuyForm';
import { SellForm } from './components/SellForm';
import { Scale } from 'lucide-react';

function App() {
  const [currentRate, setCurrentRate] = useState<GoldRate>({
    timestamp: new Date().toISOString(),
    rates: { 
      XAU: 2000,
      USD: 1,
      CAD: 1.35 // Default CAD/USD exchange rate
    },
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Fetch gold prices and exchange rates (in production, replace with actual API call)
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // In production, replace with actual API endpoints
        // const goldResponse = await fetch('https://api.metals.live/v1/spot/gold');
        // const exchangeResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        // For demo, simulate price updates
        setCurrentRate({
          timestamp: new Date().toISOString(),
          rates: {
            XAU: 2000 + Math.random() * 100,
            USD: 1,
            CAD: 1.35 // In production, fetch real exchange rate
          },
        });
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, { ...transaction, id: crypto.randomUUID() }]);
    alert(`${transaction.type === 'buy' ? 'Purchase' : 'Sale'} recorded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-yellow-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale size={32} />
              <h1 className="text-2xl font-bold">Gold Trading App</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <PriceDisplay 
          currentRate={currentRate} 
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        <div className="mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === 'buy'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Buy Gold
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === 'sell'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sell Gold
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {activeTab === 'buy' ? (
            <BuyForm 
              currentRate={currentRate} 
              currency={currency}
              onSubmit={handleTransaction} 
            />
          ) : (
            <SellForm 
              currentRate={currentRate} 
              currency={currency}
              onSubmit={handleTransaction} 
            />
          )}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet</p>
              ) : (
                transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="border-l-4 border-yellow-600 bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.weight}g of{' '}
                          {transaction.karat}K Gold
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="font-bold text-yellow-600">
                        {transaction.currency === 'USD' ? '$' : 'C$'}
                        {transaction.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;