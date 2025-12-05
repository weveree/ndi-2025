import GameManager from '@/components/GameManager';
import AlertButton from '@/components/main-chalenge/ui/AlertButton';
import MainMap from '@/components/main-chalenge/ui/MainMap';
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
import HUD from '../components/main-chalenge/ui/HUD';
export default function Home() {
  const parentRef = useRef(null);

  return (
    <GameManager>
      <ChatBot />
      <HUD/>
      <div ref={parentRef} className="h-full">
      <AlertInfoModal/>
        <Application resizeTo={parentRef}>
          <MainMap>
            <AlertButton type="warning" x={-40} y={-30} onClick={() => alert('Warning clicked!')} />
            <AlertButton type="bell" x={-400} y={-130} />
            <AlertButton type="loudspeaker" x={400} y={230} />
            <AlertButton type="money-bag" x={-500} y={100} />
            <AlertButton type="police-lamp" x={500} y={-30} />
            <AlertButton type="question-mark" x={600} y={200} />
            <AlertButton type="warning" x={-160} y={70} />
            <AlertButton type="bell" x={260} y={150} />
            <AlertButton type="loudspeaker" x={-250} y={-30} />
            <AlertButton type="money-bag" x={-40} y={-130} />
            <AlertButton type="police-lamp" x={-440} y={-30} />
            <AlertButton type="question-mark" x={-200} y={230} />
          </MainMap>
        </Application>
      </div>
    </GameManager>
  );
}
