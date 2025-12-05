import { useState } from 'react';
import DuckShooter from './level/DuckShooter';
import DuckShooterTrain from './level/DuckShooterTrain';
import DuckSurvival from './level/DuckSurvival';
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
      return <DuckSurvival onNextLevel={handleNextLevel} />;
    case 2:
      return <HoleGame onNextLevel={handleNextLevel} />;
    case 3:
      return <Train onNextLevel={handleNextLevel} />;
    case 4:
      return <DuckTrain onNextLevel={handleNextLevel} />;
    case 5:
      return <DuckShooter onNextLevel={handleNextLevel} />;
    case 6:
      return <DuckShooterTrain onNextLevel={handleNextLevel} />;
    case 7:
      return <DuckSurvival onNextLevel={handleNextLevel} />;

    default:
      return <Snake onNextLevel={handleNextLevel} />;
  }
}
