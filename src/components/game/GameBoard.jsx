import clsx from 'clsx';
import styles from './GameBoard.module.css';
import { CELL_SIZE, GRID_SIZE } from './gameConstants';

const GameBoard = ({
  title,
  score,
  isPaused,
  gameOver,
  snake,
  food,
  holes,
  train = [],
  shoots = [],
  enemies = [],
  onRestart,
  instruction = null,
  emojis = {
    head: '🐍',
    body: '🟩',
    food: '🍎',
    hole: '',
    trainEngine: '🚂',
    trainBody: '🚃',
    shoot: '🥚',
    enemy: '',
  },
}) => {
  const isTrainVertical = train.length > 1 && train[0].x === train[1].x;

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.scoreBoard}>
        <span>Score : {score}</span>
        {isPaused && <span className={styles.pauseBadge}>PAUSE</span>}
      </div>

      {instruction && (
        <p style={{ fontSize: '0.9rem', margin: '5px 0', color: '#f1c40f', fontWeight: 'bold' }}>{instruction}</p>
      )}

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

          const trainIndex = train.findIndex((t) => t.x === x && t.y === y);
          const isTrainEngine = trainIndex === 0;
          const isTrainBody = trainIndex > 0;

          const isShoot = shoots.some((e) => e.x === x && e.y === y);

          const isEnemy = enemies.some((e) => e.x === x && e.y === y);

          return (
            <div key={index} className={clsx(styles.cell, isHole && styles.hole)}>
              {isHead && emojis.head}
              {isBody && emojis.body}
              {isFood && emojis.food}
              {isHole && emojis.hole}

              {isTrainEngine && (
                <div style={{ transform: isTrainVertical ? 'rotate(90deg)' : 'none' }}>{emojis.trainEngine}</div>
              )}
              {isTrainBody && emojis.trainBody}

              {isShoot && !isHead && !isFood && emojis.shoot}

              {/* Affichage de l'ennemi (Priorité basse par rapport au train mais haute par rapport au sol) */}
              {isEnemy && !isTrainEngine && !isTrainBody && emojis.enemy}
            </div>
          );
        })}

        {gameOver && (
          <div className={styles.overlay}>
            <h2>Game Over!</h2>
            <p>Score final : {score}</p>
            <button className={styles.button} onClick={onRestart}>Rejouer</button>
          </div>
        )}
      </div>
      <p className={styles.info}>Flèches pour bouger, Espace pour pause.</p>
    </div>
  );
};

export default GameBoard;
