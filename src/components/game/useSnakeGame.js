// useSnakeGame.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, DIRECTIONS, INITIAL_SPEED } from './gameConstants';

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

// --- MODIFICATION ICI : Ajout de 'trainSpawnRate' ---
// Par défaut c'est 0.05 (5%), mais on pourra l'augmenter dans le niveau
export const useSnakeGame = ({ enableHoles = false, holeCount = 5, enableTrain = false, trainSpawnRate = 0.05 } = {}) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  const [train, setTrain] = useState([]);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(DIRECTIONS.RIGHT);

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

  // --- LOGIQUE DU TRAIN ---
  const spawnTrain = () => {
    const row = Math.floor(Math.random() * GRID_SIZE);
    // Un train un peu plus long (5 wagons)
    return [{x: -1, y: row}, {x: -2, y: row}, {x: -3, y: row}, {x: -4, y: row}, {x: -5, y: row}];
  };

  const moveTrain = (currentTrain) => {
    if (currentTrain.length === 0) return [];
    const lastWagon = currentTrain[currentTrain.length - 1];
    if (lastWagon.x >= GRID_SIZE) return []; 
    
    return currentTrain.map(segment => ({ ...segment, x: segment.x + 1 }));
  };
  // ------------------------

  const initializeGame = useCallback(() => {
    const startSnake = [{ x: 10, y: 10 }];
    let startHoles = [];
    
    if (enableHoles) {
      for (let i = 0; i < holeCount; i++) {
        startHoles.push(generateValidPosition([...startSnake, ...startHoles]));
      }
    }

    const startFood = generateValidPosition([...startSnake, ...startHoles]);

    setSnake(startSnake);
    setHoles(startHoles);
    setFood(startFood);
    setTrain([]);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    directionRef.current = DIRECTIONS.RIGHT;
  }, [enableHoles, holeCount, generateValidPosition]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

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

  // BOUCLE DE JEU
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      const currentHead = snake[0];
      const newHead = {
        x: currentHead.x + directionRef.current.x,
        y: currentHead.y + directionRef.current.y,
      };

      // 1. Mouvement du Train
      let newTrain = train;
      if (enableTrain) {
        if (train.length > 0) {
          newTrain = moveTrain(train);
        // --- MODIFICATION ICI : Utilisation du taux personnalisé ---
        } else if (Math.random() < trainSpawnRate) { 
          newTrain = spawnTrain();
        }
      }

      // 2. Vérification Collisions
      const hitWall = newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE;
      const hitSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y);
      const hitHole = holes.some(h => h.x === newHead.x && h.y === newHead.y);
      const hitTrain = newTrain.some(t => t.x === newHead.x && t.y === newHead.y);

      if (hitWall || hitSelf || hitHole || hitTrain) {
        setGameOver(true);
        setTrain(newTrain);
        return;
      }

      const newSnake = [newHead, ...snake];

      // 3. Manger
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateValidPosition([...newSnake, ...holes, ...newTrain]));
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setTrain(newTrain);

    }, INITIAL_SPEED);

    // Ajout de trainSpawnRate aux dépendances
    return () => clearInterval(gameLoop);
  }, [snake, food, holes, train, gameOver, isPaused, enableTrain, trainSpawnRate, generateValidPosition]);

  return { snake, food, holes, train, score, gameOver, isPaused, restartGame: initializeGame };
};