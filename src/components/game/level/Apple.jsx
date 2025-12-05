import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function Apple({ onNextLevel }) {
  const game = useSnakeGame();

  useEffect(() => {
    if (game.score > 6) onNextLevel();
  }, [game.score, onNextLevel]);

  return (
    <GameBoard
      title="🍎 Bad Apple"
      {...game}
      onRestart={game.restartGame}
      emojis={{ head: '🍎', body: '🍎', food: '🐍', hole: '' }}
    />
  );
}
