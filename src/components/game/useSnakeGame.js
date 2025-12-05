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
  enableShooting = false,
  enableEnemies = false, 
  enemySpawnRate = 0.03, 
  enemySpeedDelay = 2    
} = {}) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  const [train, setTrain] = useState([]);
  const [trainDir, setTrainDir] = useState('H');
  
  const [shoots, setShoots] = useState([]); 
  const [enemies, setEnemies] = useState([]); 

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(DIRECTIONS.RIGHT);
  const snakeHeadRef = useRef(snake[0]);
  const frameCounter = useRef(0); 

  useEffect(() => { snakeHeadRef.current = snake[0]; }, [snake]);

  const generateValidPosition = useCallback((occupiedPositions) => {
    let position;
    let isValid = false;
    while (!isValid) {
      position = getRandomPosition();
      const isOccupied = occupiedPositions.some(p => p.x === position.x && p.y === position.y);
      if (!isOccupied) isValid = true;
    }
    return position;
  }, []);

  const getFurthestCorner = (headPosition, occupiedPositions) => {
    const corners = [
        { x: 0, y: 0 },
        { x: GRID_SIZE - 1, y: 0 },
        { x: 0, y: GRID_SIZE - 1 },
        { x: GRID_SIZE - 1, y: GRID_SIZE - 1 }
    ];

    const validCorners = corners.filter(corner => 
        !occupiedPositions.some(pos => pos.x === corner.x && pos.y === corner.y)
    );

    if (validCorners.length === 0) return null; 

    validCorners.sort((a, b) => {
        const distA = Math.pow(a.x - headPosition.x, 2) + Math.pow(a.y - headPosition.y, 2);
        const distB = Math.pow(b.x - headPosition.x, 2) + Math.pow(b.y - headPosition.y, 2);
        return distB - distA; 
    });

    return validCorners[0];
  };

  const moveEnemies = (currentEnemies, target) => {
    return currentEnemies.map(enemy => {
      const dx = target.x - enemy.x;
      const dy = target.y - enemy.y;
      
      let moveX = 0;
      let moveY = 0;

      if (Math.abs(dx) > Math.abs(dy)) {
        moveX = dx > 0 ? 1 : -1;
      } else {
        moveY = dy > 0 ? 1 : -1;
      }
      
      return { x: enemy.x + moveX, y: enemy.y + moveY };
    });
  };

  const spawnTrain = () => {
    const isVertical = enableVerticalTrain && Math.random() > 0.5;
    if (isVertical) {
        setTrainDir('V');
        const col = Math.floor(Math.random() * GRID_SIZE);
        return [{x: col, y: -1}, {x: col, y: -2}, {x: col, y: -3}, {x: col, y: -4}, {x: col, y: -5}];
    } else {
        setTrainDir('H');
        const row = Math.floor(Math.random() * GRID_SIZE);
        return [{x: -1, y: row}, {x: -2, y: row}, {x: -3, y: row}, {x: -4, y: row}, {x: -5, y: row}];
    }
  };

  const moveTrain = (currentTrain, currentDir) => {
    if (currentTrain.length === 0) return [];
    const lastWagon = currentTrain[currentTrain.length - 1];
    if (currentDir === 'H' && lastWagon.x >= GRID_SIZE) return [];
    if (currentDir === 'V' && lastWagon.y >= GRID_SIZE) return [];
    return currentTrain.map(segment => ({ x: segment.x + (currentDir === 'H' ? 1 : 0), y: segment.y + (currentDir === 'V' ? 1 : 0) }));
  };
  
  const fireShoot = useCallback(() => {
    if (!enableShooting || gameOver || isPaused) return;
    const currentHead = snakeHeadRef.current;
    const currentDir = directionRef.current;
    setShoots(prev => [...prev, { x: currentHead.x + currentDir.x, y: currentHead.y + currentDir.y, direction: currentDir }]);
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
    setShoots([]);
    setEnemies([]);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    directionRef.current = DIRECTIONS.RIGHT;
    frameCounter.current = 0;
  }, [enableHoles, holeCount, generateValidPosition]);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (directionRef.current !== DIRECTIONS.DOWN) directionRef.current = DIRECTIONS.UP; break;
        case 'ArrowDown': if (directionRef.current !== DIRECTIONS.UP) directionRef.current = DIRECTIONS.DOWN; break;
        case 'ArrowLeft': if (directionRef.current !== DIRECTIONS.RIGHT) directionRef.current = DIRECTIONS.LEFT; break;
        case 'ArrowRight': if (directionRef.current !== DIRECTIONS.LEFT) directionRef.current = DIRECTIONS.RIGHT; break;
        case ' ': setIsPaused((prev) => !prev); break;
        case 'f': case 'F': fireShoot(); break; // Appel de fireShoot
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fireShoot]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      frameCounter.current += 1;

      let currentShoots = shoots;
      let currentEnemies = enemies;
      let foodEatenByShoot = false;

      // 1. Gestion des SHOOTS
      if (enableShooting && shoots.length > 0) {
        let movedShoots = shoots.map(shoot => ({ ...shoot, x: shoot.x + shoot.direction.x, y: shoot.y + shoot.direction.y }));
        
        currentShoots = movedShoots.filter(shoot => {
            if (shoot.x < 0 || shoot.x >= GRID_SIZE || shoot.y < 0 || shoot.y >= GRID_SIZE) return false;
            if (holes.some(h => h.x === shoot.x && h.y === shoot.y)) return false;
            if (train.some(t => t.x === shoot.x && t.y === shoot.y)) return false;
            
            const hitEnemyIndex = currentEnemies.findIndex(e => e.x === shoot.x && e.y === shoot.y);
            if (hitEnemyIndex !== -1) {
                const newEnemies = [...currentEnemies];
                newEnemies.splice(hitEnemyIndex, 1);
                currentEnemies = newEnemies;
                setScore(s => s + 2); 
                return false; 
            }

            if (shoot.x === food.x && shoot.y === food.y) { foodEatenByShoot = true; return false; }
            return true;
        });
        setShoots(currentShoots);
        setEnemies(currentEnemies);
      }

      const currentHead = snake[0];
      const newHead = { x: currentHead.x + directionRef.current.x, y: currentHead.y + directionRef.current.y };

      // 2. Gestion Ennemis
      if (enableEnemies) {
          if (frameCounter.current % enemySpeedDelay === 0) {
              currentEnemies = moveEnemies(currentEnemies, currentHead);
          }
          
          if (Math.random() < enemySpawnRate) {
              const obstacles = [...snake, ...holes, ...train, ...currentEnemies];
              let newEnemyPos = getFurthestCorner(newHead, obstacles);
              if (!newEnemyPos) newEnemyPos = generateValidPosition(obstacles);
              currentEnemies.push(newEnemyPos);
          }
      }

      // 3. Gestion du Train
      let newTrain = train;
      if (enableTrain) {
        if (train.length > 0) newTrain = moveTrain(train, trainDir);
        else if (Math.random() < trainSpawnRate) newTrain = spawnTrain();
      }

      // 4. COLLISIONS
      const hitWall = newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE;
      const hitSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y);
      const hitHole = holes.some(h => h.x === newHead.x && h.y === newHead.y);
      const hitTrain = newTrain.some(t => t.x === newHead.x && t.y === newHead.y);
      const hitEnemy = currentEnemies.some(e => e.x === newHead.x && e.y === newHead.y);

      if (hitWall || hitSelf || hitHole || hitTrain || hitEnemy) {
        setGameOver(true);
        setTrain(newTrain);
        setEnemies(currentEnemies);
        return;
      }

      const newSnake = [newHead, ...snake];

      // 5. Manger
      const snakeAteFood = newHead.x === food.x && newHead.y === food.y;
      if (snakeAteFood || foodEatenByShoot) {
        setScore(s => s + 1);
        setFood(generateValidPosition([...newSnake, ...holes, ...newTrain, ...currentShoots, ...currentEnemies]));
        if (foodEatenByShoot && !snakeAteFood) newSnake.pop();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
      setTrain(newTrain);
      setEnemies(currentEnemies);

    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, food, holes, train, trainDir, shoots, enemies, gameOver, isPaused, enableTrain, trainSpawnRate, enableShooting, enableEnemies, enemySpawnRate, enemySpeedDelay, generateValidPosition]);

  return { snake, food, holes, train, shoots, enemies, score, gameOver, isPaused, restartGame: initializeGame };
};