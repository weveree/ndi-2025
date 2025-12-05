import { useState } from 'react';
import { useGameManager } from '../main-challenge/GameManager';
import PageFin from './PageFin';
import PageMilieu from './PageMilieu';

export default function RubeGoldbergGame() {
  const [ended, setEnded] = useState(false);
  const { displayRubeGoldberg } = useGameManager();

  if (!displayRubeGoldberg) {
    return null;
  }

  if (ended) {
    return <PageFin />;
  }

  return ended ? <PageFin /> : <PageMilieu onEnd={() => setEnded(true)} />;
}
