import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function Train({ onNextLevel }) {
  const game = useSnakeGame({ enableTrain: true });

  useEffect(() => {
    if (game.score > 6) onNextLevel();
  }, [game.score, onNextLevel]);

  return (
    <GameBoard
      title="🚂 Danger Station"
      {...game}
      onRestart={game.restartGame}
      emojis={{
        head: '🦆',
        body: '🐤',
        food: '🍎',
        hole: '',
        trainEngine: '🚂',
        trainBody: '🚃',
      }}
    />
  );
}
