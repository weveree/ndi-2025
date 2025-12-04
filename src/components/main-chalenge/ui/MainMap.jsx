import mapTexture from '@/assets/map.png';
import { useApplication } from '@pixi/react';
import { Assets, FederatedPointerEvent, FederatedWheelEvent, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

function screenToWorld(cameraState, screenX, screenY) {
  return {
    x: (screenX - cameraState.x) / cameraState.scale,
    y: (screenY - cameraState.y) / cameraState.scale,
  };
}

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function MainMap({ children }) {
  const { app } = useApplication();

  const spriteRef = useRef(null);

  const [texture, setTexture] = useState(Texture.EMPTY);

  const [camera, setCamera] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const dragRef = useRef({
    isDragging: false,
    startPointer: { x: 0, y: 0 },
    startCamera: { x: 0, y: 0 },
  });

  const pinchRef = useRef({
    isPinching: false,
    startDistance: 0,
    startScale: 1,
    center: { x: 0, y: 0 },
  });

  function clampCamera(state, t = texture) {
    if (!app?.renderer || t === Texture.EMPTY) {
      return state;
    }

    const viewWidth = app.renderer.screen.width;
    const viewHeight = app.renderer.screen.height;

    const minScaleX = viewWidth / t.width;
    const minScaleY = viewHeight / t.height;
    const minScale = Math.max(minScaleX, minScaleY);

    const scale = Math.max(minScale, Math.min(5, state.scale));

    const worldWidth = t.width * scale;
    const worldHeight = t.height * scale;

    let minX, maxX, minY, maxY;

    if (worldWidth <= viewWidth) {
      minX = maxX = viewWidth / 2;
    } else {
      minX = viewWidth - worldWidth / 2;
      maxX = worldWidth / 2;
    }

    if (worldHeight <= viewHeight) {
      minY = maxY = viewHeight / 2;
    } else {
      minY = viewHeight - worldHeight / 2;
      maxY = worldHeight / 2;
    }

    return {
      ...state,
      scale,
      x: Math.min(maxX, Math.max(minX, state.x)),
      y: Math.min(maxY, Math.max(minY, state.y)),
    };
  }

  function applyZoom(deltaScale, centerScreenX, centerScreenY) {
    setCamera((prev) => {
      const oldScale = prev.scale;
      const newScale = oldScale * deltaScale;

      const worldBefore = screenToWorld(prev, centerScreenX, centerScreenY);

      const newScreenX = worldBefore.x * newScale + prev.x;
      const newScreenY = worldBefore.y * newScale + prev.y;

      const newX = prev.x + (centerScreenX - newScreenX);
      const newY = prev.y + (centerScreenY - newScreenY);

      return clampCamera({ x: newX, y: newY, scale: newScale });
    });
  }

  function updateClamp() {
    setCamera((prev) => clampCamera(prev));
  }

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(mapTexture).then((result) => {
        setTexture(result);
        setCamera((prev) => clampCamera(prev, result));
      });
    }
  }, [texture]);

  useEffect(() => {
    if (!app || !app.renderer) return;

    updateClamp();

    app.renderer.on('resize', updateClamp);

    return () => {
      app.renderer.off('resize', updateClamp);
    };
  }, [app, app.renderer]);

  useEffect(() => {
    if (!app || !app.renderer) return;

    const stage = app.stage;
    stage.eventMode = 'static';

    stage.hitArea = app.renderer.screen;

    /**
     * @param {FederatedPointerEvent} event
     */
    function onPointerDown(event) {
      const pos = event.global;

      if (event.button !== 1) return;

      dragRef.current.isDragging = true;
      dragRef.current.startPointer = { x: pos.x, y: pos.y };
      dragRef.current.startCamera = {
        x: camera.x,
        y: camera.y,
      };
    }

    /**
     * @param {FederatedPointerEvent} event
     */
    function onPointerMove(event) {
      if (pinchRef.current.isPinching) return;
      if (!dragRef.current.isDragging) return;

      if (event.buttons !== 4) return;

      const pos = event.global;
      const dx = pos.x - dragRef.current.startPointer.x;
      const dy = pos.y - dragRef.current.startPointer.y;

      setCamera((prev) =>
        clampCamera({
          ...prev,
          x: dragRef.current.startCamera.x + dx,
          y: dragRef.current.startCamera.y + dy,
        }),
      );
    }

    /**
     * @param {FederatedPointerEvent} event
     */
    function onPointerUp(event) {
      if (event.button === 1) {
        dragRef.current.isDragging = false;
      }
    }

    /**
     * @param {FederatedWheelEvent} event
     */
    function onWheel(event) {
      const delta = event.deltaY;
      const factor = delta < 0 ? 1.1 : 1 / 1.1;

      const rect = app.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      applyZoom(factor, x, y);
    }

    /**
     * @param {FederatedPointerEvent} event
     */
    function onTouchStart(event) {
      if (event.touches?.length !== 2) return;

      pinchRef.current.isPinching = true;
      const t1 = event.touches[0];
      const t2 = event.touches[1];

      const p1 = { x: t1.clientX, y: t1.clientY };
      const p2 = { x: t2.clientX, y: t2.clientY };

      pinchRef.current.startDistance = distance(p1, p2);
      pinchRef.current.startScale = camera.scale;
      pinchRef.current.center = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    }

    /**
     * @param {FederatedPointerEvent} event
     */
    function onTouchMove(event) {
      if (!pinchRef.current.isPinching) return;
      if (event.touches?.length !== 2) return;

      const t1 = event.touches[0];
      const t2 = event.touches[1];

      const p1 = { x: t1.clientX, y: t1.clientY };
      const p2 = { x: t2.clientX, y: t2.clientY };

      const dist = distance(p1, p2);
      if (pinchRef.current.startDistance === 0) return;

      const factor = dist / pinchRef.current.startDistance;

      const rect = app.canvas.getBoundingClientRect();
      const centerX = pinchRef.current.center.x - rect.left;
      const centerY = pinchRef.current.center.y - rect.top;

      const targetScale = pinchRef.current.startScale * factor;
      const deltaScale = targetScale / camera.scale;

      applyZoom(deltaScale, centerX, centerY);
    }

    /**
     * @param {FederatedPointerEvent} event
     */
    function onTouchEnd(event) {
      const touches = event?.touches || [];
      if (touches.length < 2) {
        pinchRef.current.isPinching = false;
      }
    }

    stage.on('pointerdown', onPointerDown);
    stage.on('pointermove', onPointerMove);
    stage.on('pointerup', onPointerUp);
    stage.on('pointerupoutside', onPointerUp);

    stage.on('wheel', onWheel);
    stage.on('touchstart', onTouchStart);
    stage.on('touchmove', onTouchMove);
    stage.on('touchend', onTouchEnd);
    stage.on('touchcancel', onTouchEnd);

    return () => {
      stage.off('pointerdown', onPointerDown);
      stage.off('pointermove', onPointerMove);
      stage.off('pointerup', onPointerUp);
      stage.off('pointerupoutside', onPointerUp);

      stage.off('wheel', onWheel);
      stage.off('touchstart', onTouchStart);
      stage.off('touchmove', onTouchMove);
      stage.off('touchend', onTouchEnd);
      stage.off('touchcancel', onTouchEnd);
    };
  }, [app, app.renderer, camera.x, camera.y, camera.scale]);

  return (
    <pixiContainer scale={camera.scale} x={camera.x} y={camera.y}>
      <pixiSprite ref={spriteRef} anchor={0.5} texture={texture} />
      {children}
    </pixiContainer>
  );
}
