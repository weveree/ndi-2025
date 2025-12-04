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
export default function Home() {
  const parentRef = useRef(null);

  return (
    <GameManager>
      <div ref={parentRef} className="h-full">
        <Application resizeTo={parentRef}>
          <MainMap />
        </Application>
      </div>
    </GameManager>
  );
}
