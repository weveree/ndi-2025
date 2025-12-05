import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function HappyEnd({ onNextLevel }) {
  const game = useSnakeGame();

  return (
    <GameBoard
      title="🦆 Peaceful Duck"
      {...game}
      onRestart={game.restartGame}
      instruction="Détendez-vous et mangez de l'herbe."
      emojis={{
        head: '🦆',
        body: '🐤',
        food: '🌿',
        hole: '',
        trainEngine: '',
        trainBody: '',
        egg: '',
        enemy: '',
      }}
    />
  );
}
