import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function DuckShooter({ onNextLevel }) {
  const game = useSnakeGame({
    enableShooting: true,
    enableTrain: true,
    trainSpawnRate: 0.15,
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
      title="🦆 Duck Shooter"
      {...game}
      onRestart={game.restartGame}
      instruction="Appuyez sur la touche 'F' pour tirer !"
      emojis={{
        head: '🦆',
        body: '🪶',
        food: '🎯',
        shoot: '🥚',
        hole: '',
        trainEngine: '🔥',
        trainBody: '🔥',
      }}
    />
  );
}
