// GameBoard.jsx
import React from 'react';
import clsx from 'clsx';
import styles from './GameBoard.module.css'; // Voir CSS ci-dessous
import { GRID_SIZE, CELL_SIZE } from './gameConstants';

const GameBoard = ({
  title,
  score,
  isPaused,
  gameOver,
  snake,
  food,
  holes,
  onRestart,
  emojis = { head: '🐍', body: '🟩', food: '🍎', hole: '' },
}) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.scoreBoard}>
        <span>Score : {score}</span>
        {isPaused && <span className={styles.pauseBadge}>PAUSE</span>}
      </div>

      <div
        className={styles.board}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);

          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const isHole = holes.some((h) => h.x === x && h.y === y);

          return (
            <div
              key={index}
              className={clsx(
                styles.cell,
                isHead && styles.head,
                isBody && styles.body,
                isFood && styles.food,
                isHole && styles.hole,
              )}
            >
              {isHead && emojis.head}
              {isBody && emojis.body}
              {isFood && emojis.food}
              {isHole && emojis.hole}
            </div>
          );
        })}

        {gameOver && (
          <div className={styles.overlay}>
            <h2>Game Over!</h2>
            <p>Score final : {score}</p>
            <button onClick={onRestart}>Rejouer</button>
          </div>
        )}
      </div>
      <p className={styles.info}>Flèches pour bouger, Espace pour pause.</p>
    </div>
  );
};

export default GameBoard;
