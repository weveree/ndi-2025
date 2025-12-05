import { useState } from 'react';
import Apple from './level/Apple';
import DuckShooter from './level/DuckShooter';
import DuckTrain from './level/DuckTrain';
import HoleGame from './level/HoleBoard';
import Snake from './level/Snake';
import Train from './level/Train';

export default function SnakeGame() {
  const [level, setLevel] = useState(0);

  function handleNextLevel() {
    setLevel((level) => level + 1);
  }

  switch (level) {
    case 1:
      return <Apple onNextLevel={handleNextLevel} />;
    case 2:
      return <HoleGame onNextLevel={handleNextLevel} />;
    case 3:
      return <Train onNextLevel={handleNextLevel} />;
    case 4:
      return <DuckTrain onNextLevel={handleNextLevel} />;
    case 5:
      return <DuckShooter onNextLevel={handleNextLevel} />;

    default:
      return <Snake onNextLevel={handleNextLevel} />;
  }
}
