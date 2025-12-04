import React, { useState, useEffect, useRef } from 'react';
import styles from './Snake.module.css';
import clsx from 'clsx';

const GRID_SIZE = 20; // Taille de la grille (20x20)
const CELL_SIZE = 20; // Taille d'une case en pixels
const INITIAL_SPEED = 200; // Vitesse initiale (ms)

// Directions possibles
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Utiliser useRef pour la direction afin d'éviter les bugs de touches rapides
  const directionRef = useRef(DIRECTIONS.RIGHT);

  // Fonction pour générer de la nourriture aléatoire
  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  // Gestion des touches du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== DIRECTIONS.DOWN) directionRef.current = DIRECTIONS.UP;
          break;
        case 'ArrowDown':
          if (directionRef.current !== DIRECTIONS.UP) directionRef.current = DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          if (directionRef.current !== DIRECTIONS.RIGHT) directionRef.current = DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          if (directionRef.current !== DIRECTIONS.LEFT) directionRef.current = DIRECTIONS.RIGHT;
          break;
        case ' ': // Espace pour pause
          setIsPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Boucle principale du jeu
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setDirection(directionRef.current);
      const newHead = {
        x: snake[0].x + directionRef.current.x,
        y: snake[0].y + directionRef.current.y,
      };

      // 1. Vérifier les collisions (Murs ou Soi-même)
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // 2. Vérifier si on mange la pomme
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        setFood(generateFood());
        // On ne retire pas la queue, donc le serpent grandit
      } else {
        newSnake.pop(); // On retire la queue pour garder la même taille
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, food, gameOver, isPaused]);

  // Redémarrer le jeu
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection(DIRECTIONS.RIGHT);
    directionRef.current = DIRECTIONS.RIGHT;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className={styles.snakeContainer}>
      <h1>🐍 Snake</h1>
      <div className={styles.scoreBoard}>
        <span>Score : {score}</span>
        {isPaused && <span className={styles.pauseBadge}>PAUSE</span>}
      </div>

      <div
        className={styles.gameBoard}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);

          const isSnakeHead = snake[0].x === x && snake[0].y === y;
          const isSnakeBody = snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={clsx(
                styles.cell,
                isSnakeHead && styles.snakeHead,
                isSnakeBody && styles.snakeBody,
                isFood && styles.food,
              )}
            ></div>
          );
        })}

        {gameOver && (
          <div className={styles.gameOverOverlay}>
            <h2>Game Over!</h2>
            <p>Score final : {score}</p>
            <button onClick={restartGame}>Rejouer</button>
          </div>
        )}
      </div>
      <p className={styles.controlsInfo}>Utilisez les flèches pour bouger, Espace pour pause.</p>
    </div>
  );
};

export default SnakeGame;
