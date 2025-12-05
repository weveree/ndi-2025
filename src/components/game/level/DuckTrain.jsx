import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function DuckTrain({ onNextLevel }) {
  const game = useSnakeGame({
    enableTrain: true,
    trainSpawnRate: 0.5,
    enableHoles: true,
    holeCount: 5,
  });

  useEffect(() => {
    if (game.score > 6) {
      onNextLevel();
    }
  }, [game.score, onNextLevel]);

  return (
    <GameBoard
      title="🦆 Duck & Crazy Trains"
      {...game}
      onRestart={game.restartGame}
      emojis={{
        head: '🦆',
        body: '🐤',
        food: '🐍',
        hole: '🕳️',
        trainEngine: '🚅',
        trainBody: '🚃',
      }}
    />
  );
}
