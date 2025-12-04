import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSnakeGame } from './useSnakeGame';
import GameBoard from './GameBoard';

const DuckTrainLevel = () => {
  const game = useSnakeGame({
    enableTrain: true,
    trainSpawnRate: 0.5,

    enableHoles: true,
    holeCount: 5,
  });

  const nav = useNavigate();

  useEffect(() => {
    if (game.score > 4) nav('/duck_train_level');
    console.log(game.score);
  }, [game.score, nav]);

  return (
    <GameBoard
      title="🦆 Duck & Crazy Trains"
      {...game}
      onRestart={game.restartGame}
      emojis={{
        head: '🦆', // Le personnage canard
        body: '🐤',
        food: '🐍', // Du pain pour le canard !
        hole: '', // Géré par le CSS .hole
        trainEngine: '🚅', // Un train plus rapide visuellement
        trainBody: '🚃',
      }}
    />
  );
};

export default DuckTrainLevel;
