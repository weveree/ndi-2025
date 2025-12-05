// useSnakeGame.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, DIRECTIONS, INITIAL_SPEED } from './gameConstants';

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

// AJOUT DE LA PROP 'enableShooting'
export const useSnakeGame = ({ 
  enableHoles = false, 
  holeCount = 5, 
  enableTrain = false, 
  trainSpawnRate = 0.05,
  enableShooting = false // NOUVEAU
} = {}) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [holes, setHoles] = useState([]);
  const [train, setTrain] = useState([]);
  // NOUVEAU : État pour les projectiles (œufs)
  // Chaque œuf est un objet : { x, y, direction: {x,y} }
  const [eggs, setEggs] = useState([]); 

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(DIRECTIONS.RIGHT);
  // NOUVEAU : On a besoin de la position actuelle de la tête pour savoir d'où tirer
  // On utilise une ref pour y accéder dans le useEffect du clavier sans re-déclencher le hook
  const snakeHeadRef = useRef(snake[0]); 

  // Met à jour la ref à chaque mouvement du serpent
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

  // --- LOGIQUE DU TRAIN ---
  const spawnTrain = () => {
    const row = Math.floor(Math.random() * GRID_SIZE);
    return [{x: -1, y: row}, {x: -2, y: row}, {x: -3, y: row}, {x: -4, y: row}, {x: -5, y: row}];
  };

  const moveTrain = (currentTrain) => {
    if (currentTrain.length === 0) return [];
    const lastWagon = currentTrain[currentTrain.length - 1];
    if (lastWagon.x >= GRID_SIZE) return []; 
    return currentTrain.map(segment => ({ ...segment, x: segment.x + 1 }));
  };
  
  // --- NOUVEAU : LOGIQUE DES ŒUFS ---
  const fireEgg = useCallback(() => {
    if (!enableShooting || gameOver || isPaused) return;
    
    const currentHead = snakeHeadRef.current;
    const currentDir = directionRef.current;

    // L'œuf apparaît sur la case *devant* le canard
    const startPos = {
        x: currentHead.x + currentDir.x,
        y: currentHead.y + currentDir.y,
        direction: currentDir // L'œuf garde cette direction pour toujours
    };

    setEggs(prevEggs => [...prevEggs, startPos]);
  }, [enableShooting, gameOver, isPaused]);


  const initializeGame = useCallback(() => {
    const startSnake = [{ x: 10, y: 10 }];
    snakeHeadRef.current = startSnake[0]; // Reset ref

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
    setEggs([]); // Reset œufs
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    directionRef.current = DIRECTIONS.RIGHT;
  }, [enableHoles, holeCount, generateValidPosition]);

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
        // NOUVEAU : Touche 'F' pour tirer
        case 'f': 
        case 'F': 
            fireEgg(); 
            break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fireEgg]); // Ajout de fireEgg aux dépendances

  // BOUCLE DE JEU PRINCIPALE
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      
      // --- 1. GESTION DES ŒUFS (Projectiles) ---
      let currentEggs = eggs;
      let foodEatenByEgg = false;

      if (enableShooting && eggs.length > 0) {
        // a. Déplacer les œufs
        let movedEggs = eggs.map(egg => ({
            ...egg,
            x: egg.x + egg.direction.x,
            y: egg.y + egg.direction.y
        }));

        // b. Vérifier les collisions des œufs
        currentEggs = movedEggs.filter(egg => {
            // Sortie de grille ?
            if (egg.x < 0 || egg.x >= GRID_SIZE || egg.y < 0 || egg.y >= GRID_SIZE) return false;
            // Touche un trou ?
            if (holes.some(h => h.x === egg.x && h.y === egg.y)) return false;
            // Touche un train ?
            if (train.some(t => t.x === egg.x && t.y === egg.y)) return false;
            
            // Touche la nourriture ? (LE BUT)
            if (egg.x === food.x && egg.y === food.y) {
                foodEatenByEgg = true;
                return false; // L'œuf disparaît après avoir touché la cible
            }
            
            return true; // L'œuf continue sa route
        });
        
        setEggs(currentEggs); // Mise à jour des œufs restants
      }

      // --- 2. GESTION DU SERPENT/CANARD (Classique) ---
      const currentHead = snake[0];
      const newHead = {
        x: currentHead.x + directionRef.current.x,
        y: currentHead.y + directionRef.current.y,
      };

      // Mouvement du Train
      let newTrain = train;
      if (enableTrain) {
        if (train.length > 0) {
          newTrain = moveTrain(train);
        } else if (Math.random() < trainSpawnRate) { 
          newTrain = spawnTrain();
        }
      }

      // Collisions du serpent
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

      // --- 3. GESTION DE LA NOURRITURE ---
      // Cas A : Le serpent a mangé la nourriture avec sa bouche
      const snakeAteFood = newHead.x === food.x && newHead.y === food.y;

      if (snakeAteFood || foodEatenByEgg) {
        setScore(s => s + 1);
        // On génère une nouvelle nourriture en évitant tous les obstacles, y compris les œufs en vol
        setFood(generateValidPosition([...newSnake, ...holes, ...newTrain, ...currentEggs]));
        
        // Si c'est l'œuf qui a mangé, le serpent ne grandit pas, donc on retire la queue.
        // Si c'est le serpent qui a mangé, il grandit, donc on ne retire pas la queue.
        if (foodEatenByEgg && !snakeAteFood) {
             newSnake.pop();
        }
      } else {
        // Rien mangé, le serpent avance normalement
        newSnake.pop();
      }

      setSnake(newSnake);
      setTrain(newTrain);

    }, INITIAL_SPEED);

    return () => clearInterval(gameLoop);
    // Ajout de 'eggs' et 'enableShooting' aux dépendances
  }, [snake, food, holes, train, eggs, gameOver, isPaused, enableTrain, trainSpawnRate, enableShooting, generateValidPosition]);

  // On retourne aussi 'eggs' pour l'affichage
  return { snake, food, holes, train, eggs, score, gameOver, isPaused, restartGame: initializeGame };
};