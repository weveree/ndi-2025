import ChatBot from '@/components/ChatBot';
import GameManager from '@/components/main-chalenge/GameManager';
import AlertInfoModal from '@/components/main-chalenge/ui/AlertInfoModal';
import HUD from '@/components/main-chalenge/ui/HUD';
import MainMap from '@/components/main-chalenge/ui/MainMap';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import { useRef } from 'react';
import Tutorial from '../components/Tutorial';

extend({
  Container,
  Graphics,
  Sprite,
});
export default function Home() {
  const parentRef = useRef(null);

  return (
    <GameManager>
      <Tutorial/>
      <ChatBot />
      <HUD />
      <div ref={parentRef} className="h-full">
        <AlertInfoModal />
        <Application resizeTo={parentRef}>
          <MainMap />
        </Application>
      </div>
    </GameManager>
  );
}
