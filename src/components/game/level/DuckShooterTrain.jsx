import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function DuckShooterTrain({ onNextLevel }) {
  const game = useSnakeGame({
    enableShooting: true,
    enableTrain: true,
    enableVerticalTrain: true,
    trainSpawnRate: 0.25,
    enableHoles: true,
    holeCount: 10,
  });

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
        egg: '🥚',
        hole: '',
        trainEngine: '🚄',
        trainBody: '🚃',
      }}
    />
  );
}
