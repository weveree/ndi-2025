import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function DuckShooter({ onNextLevel }) {
  const game = useSnakeGame({
    enableShooting: true,
    enableTrain: true,
    enableVerticalTrain: true,
    trainSpawnRate: 0.25,
    enableHoles: true,
    holeCount: 10,
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
      instruction="Attention aux trains dans TOUS les sens ! 'F' pour tirer."
      emojis={{
        head: '🦆',
        body: '🪶',
        food: '🎯',
        shoot: '🥚',
        hole: '',
        trainEngine: '🚄',
        trainBody: '🚃',
      }}
    />
  );
}
