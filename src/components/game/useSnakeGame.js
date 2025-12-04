// useSnakeGame.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, DIRECTIONS, INITIAL_SPEED } from './gameConstants';

// Fonction utilitaire pour position aléatoire
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export const useSnakeGame = ({ enableHoles = false, holeCount = 5 } = {}) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef(DIRECTIONS.RIGHT);

  // Génération intelligente (évite les collisions)
  const generateValidPosition = useCallback((occupiedPositions) => {
    let position;
    let isValid = false;
    while (!isValid) {
      position = getRandomPosition();
      const isOccupied = occupiedPositions.some(
        (p) => p.x === position.x && p.y === position.y
      );
      if (!isOccupied) isValid = true;
    }
    return position;
  }, []);

  // Initialisation du jeu
  const initializeGame = useCallback(() => {
    const startSnake = [{ x: 10, y: 10 }];
    let currentHoles = [];

    // Générer les trous si activés
    if (enableHoles) {
      for (let i = 0; i < holeCount; i++) {
        currentHoles.push(generateValidPosition([...startSnake, ...currentHoles]));
      }
    }

    const startFood = generateValidPosition([...startSnake, ...currentHoles]);

    setSnake(startSnake);
    setHoles(currentHoles);
    setFood(startFood);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    directionRef.current = DIRECTIONS.RIGHT;
  }, [enableHoles, holeCount, generateValidPosition]);

  // Démarrage initial
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Gestion Clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (directionRef.current !== DIRECTIONS.DOWN) directionRef.current = DIRECTIONS.UP; break;
        case 'ArrowDown': if (directionRef.current !== DIRECTIONS.UP) directionRef.current = DIRECTIONS.DOWN; break;
        case 'ArrowLeft': if (directionRef.current !== DIRECTIONS.RIGHT) directionRef.current = DIRECTIONS.LEFT; break;
        case 'ArrowRight': if (directionRef.current !== DIRECTIONS.LEFT) directionRef.current = DIRECTIONS.RIGHT; break;
        case ' ': setIsPaused((prev) => !prev); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Boucle de Jeu
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      const currentHead = snake[0];
      const newHead = {
        x: currentHead.x + directionRef.current.x,
        y: currentHead.y + directionRef.current.y,
      };

      // Vérification Collisions (Murs, Soi-même, Trous)
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        snake.some(s => s.x === newHead.x && s.y === newHead.y) ||
        holes.some(h => h.x === newHead.x && h.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // Manger la nourriture
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateValidPosition([...newSnake, ...holes]));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, food, holes, gameOver, isPaused, generateValidPosition]);

  return {
    snake,
    food,
    holes,
    score,
    gameOver,
    isPaused,
    restartGame: initializeGame
  };
};