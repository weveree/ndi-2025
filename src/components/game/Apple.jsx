import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const AppleGame = () => {
  const game = useSnakeGame();
  const nav = useNavigate();

  useEffect(() => {
    if (game.score > 3) nav('/Hole_board');
  }, [game.score, nav]);

  return (
    <GameBoard
      title="🍎 Evil Apple"
      {...game}
      onRestart={game.restartGame}
      emojis={{ head: '🍎', body: '🍎', food: '🐍', hole: '' }}
    />
  );
};
export default AppleGame;
