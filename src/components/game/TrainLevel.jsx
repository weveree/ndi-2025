import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const TrainLevel = () => {
  const game = useSnakeGame({ enableTrain: true });
  const nav = useNavigate();

  useEffect(() => {
    if (game.score > 4) nav('/duck_train_level');
    console.log(game.score);
  }, [game.score, nav]);

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
};

export default TrainLevel;
