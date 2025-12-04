import styles from './Home.module.css';
import GameManager, { GameManagerContext } from '../components/GameManager';
import { useContext } from 'react';
import ChatBot from '../components/ChatBot';
export default function Home() {
  return (
    <GameManager>
      <ChatBot></ChatBot>
    </GameManager>
  );
}
