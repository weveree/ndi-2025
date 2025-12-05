import GameManager from '@/components/GameManager';
import { MainMap } from '@/components/main-chalenge/ui/MainMap';
import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import { useRef } from 'react';
extend({
  Container,
  Graphics,
  Sprite,
});

import ChatBot from '../components/ChatBot';
import AlertInfoModal from '../components/main-chalenge/ui/AlertInfoModal';
export default function Home() {
  const parentRef = useRef(null);

  return (
    <GameManager>
      <ChatBot/>
      <div ref={parentRef} className="h-full">
      <AlertInfoModal/>
        <Application resizeTo={parentRef}>
          <MainMap />
        </Application>
      </div>
    </GameManager>
  );
}
