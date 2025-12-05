import { useCallback, useEffect, useRef, useState } from 'react';
import { DIRECTIONS, GRID_SIZE, INITIAL_SPEED } from './gameConstants';

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export const useSnakeGame = ({ 
  enableHoles = false, 
  holeCount = 5, 
  enableTrain = false, 
  enableVerticalTrain = false,
  trainSpawnRate = 0.05,
  enableShooting = false 
} = {}) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  
  const [train, setTrain] = useState([]);

  const [trainDir, setTrainDir] = useState('H'); 

  const [eggs, setEggs] = useState([]); 
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(DIRECTIONS.RIGHT);
  const snakeHeadRef = useRef(snake[0]);

  useEffect(() => {
    snakeHeadRef.current = snake[0];
  }, [snake]);

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

  const spawnTrain = () => {

    const isVertical = enableVerticalTrain && Math.random() > 0.5;

    if (isVertical) {
        setTrainDir('V');
        const col = Math.floor(Math.random() * GRID_SIZE);

        return [
            {x: col, y: -1}, 
            {x: col, y: -2}, 
            {x: col, y: -3}, 
            {x: col, y: -4}, 
            {x: col, y: -5}
        ];
    } else {
        setTrainDir('H');
        const row = Math.floor(Math.random() * GRID_SIZE);
        return [
            {x: -1, y: row}, 
            {x: -2, y: row}, 
            {x: -3, y: row}, 
            {x: -4, y: row}, 
            {x: -5, y: row}
        ];
    }
  };

  const moveTrain = (currentTrain, currentDir) => {
    if (currentTrain.length === 0) return [];
    
    const lastWagon = currentTrain[currentTrain.length - 1];
    
    if (currentDir === 'H' && lastWagon.x >= GRID_SIZE) return [];
    if (currentDir === 'V' && lastWagon.y >= GRID_SIZE) return [];

    return currentTrain.map(segment => ({ 
        x: segment.x + (currentDir === 'H' ? 1 : 0), 
        y: segment.y + (currentDir === 'V' ? 1 : 0) 
    }));
  };

  const fireEgg = useCallback(() => {
    if (!enableShooting || gameOver || isPaused) return;
    const currentHead = snakeHeadRef.current;
    const currentDir = directionRef.current;
    const startPos = {
        x: currentHead.x + currentDir.x,
        y: currentHead.y + currentDir.y,
        direction: currentDir
    };
    setEggs(prevEggs => [...prevEggs, startPos]);
  }, [enableShooting, gameOver, isPaused]);

  const initializeGame = useCallback(() => {
    const startSnake = [{ x: 10, y: 10 }];
    snakeHeadRef.current = startSnake[0];
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
    setTrainDir('H'); // Reset direction
    setEggs([]);
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
        case 'f': case 'F': fireEgg(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fireEgg]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      let currentEggs = eggs;
      let foodEatenByEgg = false;
      if (enableShooting && eggs.length > 0) {
        let movedEggs = eggs.map(egg => ({ ...egg, x: egg.x + egg.direction.x, y: egg.y + egg.direction.y }));
        currentEggs = movedEggs.filter(egg => {
            if (egg.x < 0 || egg.x >= GRID_SIZE || egg.y < 0 || egg.y >= GRID_SIZE) return false;
            if (holes.some(h => h.x === egg.x && h.y === egg.y)) return false;
            if (train.some(t => t.x === egg.x && t.y === egg.y)) return false;
            if (egg.x === food.x && egg.y === food.y) { foodEatenByEgg = true; return false; }
            return true;
        });
        setEggs(currentEggs);
      }

      const currentHead = snake[0];
      const newHead = { x: currentHead.x + directionRef.current.x, y: currentHead.y + directionRef.current.y };


      let newTrain = train;
      if (enableTrain) {
        if (train.length > 0) {
          newTrain = moveTrain(train, trainDir);
        } else if (Math.random() < trainSpawnRate) { 
          newTrain = spawnTrain();

        }
      }

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

      const snakeAteFood = newHead.x === food.x && newHead.y === food.y;
      if (snakeAteFood || foodEatenByEgg) {
        setScore(s => s + 1);
        setFood(generateValidPosition([...newSnake, ...holes, ...newTrain, ...currentEggs]));
        if (foodEatenByEgg && !snakeAteFood) newSnake.pop();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setTrain(newTrain);

    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, food, holes, train, trainDir, eggs, gameOver, isPaused, enableTrain, trainSpawnRate, enableShooting, generateValidPosition]); // Ajouter trainDir

  return { snake, food, holes, train, eggs, score, gameOver, isPaused, restartGame: initializeGame };
};