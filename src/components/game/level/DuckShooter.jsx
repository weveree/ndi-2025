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
        egg: '🥚',
        hole: '',
        trainEngine: '🔥',
        trainBody: '🔥',
      }}
    />
  );
}
