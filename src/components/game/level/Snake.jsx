import { useEffect } from 'react';
import GameBoard from '../GameBoard';
import { useSnakeGame } from '../useSnakeGame';

export default function Snake({ onNextLevel }) {
  const game = useSnakeGame();

  useEffect(() => {
    if (game.score > 3) onNextLevel();
  }, [game.score, onNextLevel]);

  const appearance = {
    head: <div style={{ width: '100%', height: '100%', background: '#2ecc71', borderRadius: '4px' }} />,
    body: <div style={{ width: '100%', height: '100%', background: '#27ae60', borderRadius: '2px' }} />,
    food: '🍎',
    hole: '',
  };

  return <GameBoard title="🐍 Classic Snake" {...game} onRestart={game.restartGame} emojis={appearance} />;
}
