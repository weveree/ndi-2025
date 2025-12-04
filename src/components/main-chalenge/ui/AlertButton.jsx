import bellSprite from '@/assets/alert-icons/bell.png';
import loudspeakerSprite from '@/assets/alert-icons/loudspeaker.png';
import moneyBagSprite from '@/assets/alert-icons/money-bag.png';
import policeLampSprite from '@/assets/alert-icons/police-lamp.png';
import questionMarkSprite from '@/assets/alert-icons/question-mark.png';
import warningSprite from '@/assets/alert-icons/warning.png';
import { Assets, FederatedPointerEvent, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

function getTexture(type) {
  switch (type) {
    case 'bell':
      return bellSprite;
    case 'loudspeaker':
      return loudspeakerSprite;
    case 'money-bag':
      return moneyBagSprite;
    case 'police-lamp':
      return policeLampSprite;
    case 'question-mark':
      return questionMarkSprite;
    case 'warning':
      return warningSprite;
    default:
      return warningSprite;
  }
}

export default function AlertButton({ onClick, type, x, y }) {
  const [texture, setTexture] = useState(Texture.EMPTY);
  const spriteRef = useRef(null);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(getTexture(type)).then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  useEffect(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    /**
     * @param {FederatedPointerEvent} event
     */
    function handlePointerDown(event) {
      if (onClick) {
        event.stopPropagation();
        onClick();
      }
    }

    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on('pointerdown', handlePointerDown);

    return () => {
      sprite.off('pointerdown', handlePointerDown);
    };
  }, [onClick]);

  return <pixiSprite ref={spriteRef} anchor={0.5} texture={texture} x={x} y={y} scale={0.3} />;
}
