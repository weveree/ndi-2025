// Snake.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const SnakeGame = () => {
  const game = useSnakeGame();
  const nav = useNavigate();

  useEffect(() => {
    if (game.score > 2) nav('/Apple'); // Passage au niveau suivant après 3 points
  }, [game.score, nav]);

  // On définit l'apparence : des carrés colorés (div) au lieu d'emojis
  const appearance = {
    head: <div style={{ width: '100%', height: '100%', background: '#2ecc71', borderRadius: '4px' }} />,
    body: <div style={{ width: '100%', height: '100%', background: '#27ae60', borderRadius: '2px' }} />,
    food: '🍎',
    hole: '',
  };

  return <GameBoard title="🐍 Classic Snake" {...game} onRestart={game.restartGame} emojis={appearance} />;
};
export default SnakeGame;
