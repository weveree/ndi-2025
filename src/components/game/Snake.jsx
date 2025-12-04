import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const SnakeGame = () => {
  const game = useSnakeGame();
  const nav = useNavigate();

  useEffect(() => {
    if (game.score > 1) nav('/Apple');
  }, [game.score, nav]);

  // On crée des "composants" visuels pour la tête et le corps
  const snakeSkin = {
    head: <div style={{ width: '100%', height: '100%', backgroundColor: '#2ecc71', borderRadius: '4px' }} />,
    body: <div style={{ width: '100%', height: '100%', backgroundColor: '#27ae60', borderRadius: '2px' }} />,
    food: '🍎',
    hole: '',
  };

  return (
    <GameBoard
      title="🐍 Snake"
      {...game}
      onRestart={game.restartGame}
      emojis={snakeSkin} // On passe nos divs colorées ici
    />
  );
};

export default SnakeGame;
