import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function HoleGame({ onNextLevel }) {
  const game = useSnakeGame({ enableHoles: true, holeCount: 15 });

  useEffect(() => {
    if (game.score > 1) onNextLevel();
  }, [game.score, onNextLevel]);

  return (
    <GameBoard
      title="🕳️ Hole Snake"
      {...game}
      onRestart={game.restartGame}
      emojis={{ head: '🍎', body: '🍎', food: '🐍', hole: '' }}
    />
  );
}
