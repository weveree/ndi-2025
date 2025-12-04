import React, { useState, useEffect, useRef } from 'react';
import styles from './Hole_board.module.css';
import clsx from 'clsx';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const HOLE_COUNT = 5;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const AppleGame = () => {
  const [apple, setApple] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(DIRECTIONS.RIGHT);

  const getRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  // --- CORRECTION 1 : generateFood vérifie maintenant les collisions ---
  const generateFood = (currentApple, currentHoles) => {
    let newFood;
    let isInvalid = true;

    while (isInvalid) {
      newFood = getRandomPosition();

      // Vérifier si c'est sur un trou
      const isOnHole = currentHoles.some((h) => h.x === newFood.x && h.y === newFood.y);
      // Vérifier si c'est sur le joueur (apple)
      const isOnApple = currentApple.some((a) => a.x === newFood.x && a.y === newFood.y);

      // Si la case est libre, on valide et on sort de la boucle
      if (!isOnHole && !isOnApple) {
        isInvalid = false;
      }
    }
    return newFood;
  };

  const generateHoles = (appleBody) => {
    const newHoles = [];
    while (newHoles.length < HOLE_COUNT) {
      const position = getRandomPosition();
      const isOnApple = appleBody.some((s) => s.x === position.x && s.y === position.y);
      const isDuplicate = newHoles.some((h) => h.x === position.x && h.y === position.y);

      if (!isOnApple && !isDuplicate) {
        newHoles.push(position);
      }
    }
    return newHoles;
  };

  // Initialisation au chargement
  useEffect(() => {
    const initialApple = [{ x: 10, y: 10 }];
    const initialHoles = generateHoles(initialApple);
    setHoles(initialHoles);
    // On génère la première nourriture en tenant compte des trous
    setFood(generateFood(initialApple, initialHoles));
  }, []);

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
        case ' ':
          setIsPaused((prev) => !prev);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveApple = () => {
      setDirection(directionRef.current);
      const newHead = {
        x: apple[0].x + directionRef.current.x,
        y: apple[0].y + directionRef.current.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        apple.some((segment) => segment.x === newHead.x && segment.y === newHead.y) ||
        holes.some((hole) => hole.x === newHead.x && hole.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      const newApple = [newHead, ...apple];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 1);
        // --- CORRECTION 2 : On passe les trous actuels et le nouveau serpent pour générer la nourriture ---
        setFood(generateFood(newApple, holes));
      } else {
        newApple.pop();
      }

      setApple(newApple);
    };

    const gameLoop = setInterval(moveApple, INITIAL_SPEED);
    return () => clearInterval(gameLoop);
  }, [apple, food, gameOver, isPaused, holes]);

  // --- CORRECTION 3 : Logique de redémarrage robuste ---
  const restartGame = () => {
    const initialApple = [{ x: 10, y: 10 }];

    // 1. On génère d'abord les trous
    const newHoles = generateHoles(initialApple);

    // 2. On génère la nourriture en évitant ces nouveaux trous
    const newFood = generateFood(initialApple, newHoles);

    // 3. On met tout à jour
    setApple(initialApple);
    setHoles(newHoles);
    setFood(newFood);

    setDirection(DIRECTIONS.RIGHT);
    directionRef.current = DIRECTIONS.RIGHT;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  return (
    <div className={styles.appleContainer}>
      <h1>🐍 React Apple</h1>
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

          const isAppleHead = apple[0].x === x && apple[0].y === y;
          const isAppleBody = apple.some((s, i) => i !== 0 && s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const isHole = holes.some((h) => h.x === x && h.y === y);

          return (
            <div
              key={index}
              className={clsx(
                styles.cell,
                isAppleHead && styles.appleHead,
                isAppleBody && styles.appleBody,
                isFood && styles.food,
                isHole && styles.hole,
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
    </div>
  );
};

export default AppleGame;
