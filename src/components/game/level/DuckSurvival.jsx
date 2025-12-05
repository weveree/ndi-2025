import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function DuckSurvival({ onNextLevel }) {
  const game = useSnakeGame({
    enableShooting: true,
    enableTrain: true,
    enableVerticalTrain: true,
    enableHoles: true,
    holeCount: 5,

    enableEnemies: true,
    enemySpawnRate: 0.1,
    enemySpeedDelay: 2,
  });

  return (
    <GameBoard
      title="🦊 Survie"
      {...game}
      onRestart={game.restartGame}
      instruction="Tirez sur les Renards avec 'F' !"
      emojis={{
        head: '🦆',
        body: '🪶',
        food: '',
        shoot: '🔪',
        hole: '',
        trainEngine: '🔥',
        trainBody: '🔥',
        enemy: '🦊',
      }}
    />
  );
}
