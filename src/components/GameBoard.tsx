import React from 'react';
import { Shape as ShapeComponent } from './Shape';
import { Shape, GameState, GameStatus } from '../types/game';
import { Wallet } from 'lucide-react';

interface GameBoardProps {
  gameState: GameState;
  gameStatus: GameStatus;
  onFeelLuckyClick: () => void;
  onDoubleOrNothing: () => void;
  onPlayAgain: () => void;
  walletAddress: string | null;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  gameStatus,
  onFeelLuckyClick,
  onDoubleOrNothing,
  onPlayAgain,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const { targetSequence, bottomShapes, playerSequence, matches, tokensWon, totalTokens } = gameState;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">
          Total Balance: {totalTokens} tokens
        </div>
        {walletAddress ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Wallet className="w-4 h-4" />
              <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </div>
            <button
              onClick={onDisconnectWallet}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={onConnectWallet}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* Target Sequence */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Target Sequence</h3>
          <div className="grid grid-cols-12 gap-2">
            {targetSequence.map((shape, index) => (
              <div key={shape.id} className="flex justify-center">
                <ShapeComponent shape={shape} size={32} />
              </div>
            ))}
          </div>
        </div>

        {/* Player Sequence */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-12 gap-2">
            {playerSequence.map((shape, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-12 w-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  {shape && <ShapeComponent shape={shape} size={32} />}
                </div>
                {gameStatus === 'complete' && (
                  <div className={`mt-2 ${matches[index] ? 'text-green-500' : 'text-red-500'}`}>
                    {matches[index] ? 'MATCH' : 'X'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Shapes */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-12 gap-2">
            {bottomShapes.map((shape) => (
              <div key={shape.id} className="flex justify-center">
                <ShapeComponent shape={shape} size={32} />
              </div>
            ))}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col items-center space-y-4">
          {gameStatus === 'ready' && (
            <button
              onClick={onFeelLuckyClick}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transform transition hover:scale-105"
            >
              I FEEL LUCKY
            </button>
          )}
          
          {gameStatus === 'complete' && (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">
                {tokensWon === 25100 ? 'JACKPOT! 🎉' : `You won ${tokensWon} tokens!`}
              </p>
              <div className="space-x-4">
                <button
                  onClick={onDoubleOrNothing}
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transform transition hover:scale-105"
                >
                  Double or Nothing
                </button>
                <button
                  onClick={onPlayAgain}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transform transition hover:scale-105"
                >
                  Play Again Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};