import React from 'react';
import { Shape as ShapeType } from '../types/game';

interface ShapeProps {
  shape: ShapeType;
  size?: number;
}

export const Shape: React.FC<ShapeProps> = ({ shape, size = 24 }) => {
  const zodiacSymbols: Record<ShapeType['type'], string> = {
    aries: '♈',
    taurus: '♉',
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓'
  };

  return (
    <div 
      className="transition-transform hover:scale-110"
      style={{ 
        fontSize: `${size}px`,
        color: shape.color,
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {zodiacSymbols[shape.type]}
    </div>
  );
};