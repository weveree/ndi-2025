import React from 'react';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const HoleGame = () => {
  // On active les trous ici
  const game = useSnakeGame({ enableHoles: true, holeCount: 5 });

  return (
    <GameBoard
      title="🕳️ Hole Snake"
      {...game}
      onRestart={game.restartGame}
      emojis={{ head: '🍎', body: '🍎', food: '🐍', hole: '' }} // Trous gérés par CSS .hole
    />
  );
};
export default HoleGame;
