import ChatBot from '@/components/ChatBot';
import GameManager from '@/components/main-challenge/GameManager';
import AlertInfoModal from '@/components/main-challenge/ui/AlertInfoModal';
import HUD from '@/components/main-challenge/ui/HUD';
import MainMap from '@/components/main-challenge/ui/MainMap';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import { useRef } from 'react';
import EndScreen from '../components/EndScreen';
import Tutorial from '../components/Tutorial';
import RubeGoldbergGame from '../components/rube-goldberg/RubeGoldbergGame';
extend({
  Container,
  Graphics,
  Sprite,
});

export default function Home() {
  const parentRef = useRef(null);

  return (
    <GameManager>
      <HUD />
      <Tutorial />
      <ChatBot />
      <RubeGoldbergGame />
      <EndScreen />
      <div ref={parentRef} className="h-full">
        <AlertInfoModal />
        <Application resizeTo={parentRef}>
          <MainMap />
        </Application>
      </div>
    </GameManager>
  );
}
