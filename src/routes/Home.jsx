import reactLogo from '@/assets/react.svg';
import Counter from '@/components/Counter';
import styles from './Home.module.css';
import GameManager, { GameManagerContext } from '../components/GameManager';
import { useContext } from 'react';

export default function Home() {
  return (
    <GameManager>
        <div className={styles.app}>
      <img src={reactLogo} alt="React Logo" />
      <Counter />
    </div>
    </GameManager>
    
  );
}
