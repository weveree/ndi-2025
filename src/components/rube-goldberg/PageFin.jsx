import React, { useEffect, useRef } from 'react';
import { useGameManager } from '../main-challenge/GameManager';

export default function PageDebut() {
  const { setDisplayRubeGoldberg, setCurrentModal, currentModal, changeMoney, changeEnergy, removeAlert } =
    useGameManager();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    script.async = true;

    script.onload = () => {
      const Matter = window.Matter;
      const { Engine, Render, Runner, Bodies, World, Body, Constraint } = Matter;

      function rand(min, max) {
        return Math.random() * (max - min) + min;
      }

      const engine = Engine.create();
      const world = engine.world;
      engine.world.gravity.y = 0.1;

      const render = Render.create({
        canvas: canvasRef.current,
        engine: engine,
        options: {
          width: 1000,
          height: 2500,
          wireframes: false,
          background: '#E5F7FF',
        },
      });

      //balles
      const Reparation = Bodies.circle(rand(300, 660), 10, 10, {
        label: 'Reparation',
        restitution: 1.2,
        render: {
          fillStyle: '#e74c3c',
        },
      });

      const Argent = Bodies.circle(rand(300, 660), 10, 10, {
        label: 'Argent',
        restitution: 1.2,
        render: {
          fillStyle: '#9BFAA6',
        },
      });

      const Eclair = Bodies.circle(rand(300, 660), 10, 10, {
        label: 'Eclair',
        restitution: 1.2,
        render: {
          fillStyle: '#F7F388',
        },
      });

      //obstacles

      const Obstacle1 = Bodies.circle(100, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle2 = Bodies.circle(200, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle3 = Bodies.circle(300, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle4 = Bodies.circle(400, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle5 = Bodies.circle(500, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle6 = Bodies.circle(600, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle7 = Bodies.circle(700, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle8 = Bodies.circle(800, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle9 = Bodies.circle(900, 100, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle10 = Bodies.circle(150, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle11 = Bodies.circle(250, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle12 = Bodies.circle(350, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle13 = Bodies.circle(450, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle14 = Bodies.circle(550, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle15 = Bodies.circle(650, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle16 = Bodies.circle(750, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle17 = Bodies.circle(850, 200, 10, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const Obstacle20 = Bodies.circle(200, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle21 = Bodies.circle(200, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle22 = Bodies.circle(300, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle23 = Bodies.circle(400, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle24 = Bodies.circle(500, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle25 = Bodies.circle(600, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle26 = Bodies.circle(700, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle27 = Bodies.circle(800, 300, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle30 = Bodies.circle(250, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle31 = Bodies.circle(350, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle32 = Bodies.circle(450, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle33 = Bodies.circle(550, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle34 = Bodies.circle(650, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle35 = Bodies.circle(750, 400, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5CB3FF',
        },
      });

      const Obstacle40 = Bodies.circle(300, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle41 = Bodies.circle(400, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#96FFEE',
        },
      });

      const Obstacle42 = Bodies.circle(500, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle43 = Bodies.circle(600, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#96FFEE',
        },
      });

      const Obstacle44 = Bodies.circle(600, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#96FFEE',
        },
      });

      const Obstacle45 = Bodies.circle(700, 500, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle50 = Bodies.circle(350, 600, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle51 = Bodies.circle(450, 600, 10, {
        isStatic: true,
        render: {
          fillStyle: '#96FFEE',
        },
      });

      const Obstacle52 = Bodies.circle(550, 600, 10, {
        isStatic: true,
        render: {
          fillStyle: '#5079A6',
        },
      });

      const Obstacle53 = Bodies.circle(650, 600, 10, {
        isStatic: true,
        render: {
          fillStyle: '#96FFEE',
        },
      });

      //separateur

      const sep1 = Bodies.rectangle(450, 800, 5, 10, {
        isStatic: true,
        render: {
          fillStyle: '#292626',
        },
      });

      const sep2 = Bodies.rectangle(550, 800, 5, 10, {
        isStatic: true,
        render: {
          fillStyle: '#292626',
        },
      });

      const sep3 = Bodies.rectangle(450, 1000, 5, 400, {
        isStatic: true,
        render: {
          fillStyle: '#292626',
        },
      });

      const sep4 = Bodies.rectangle(550, 1000, 5, 400, {
        isStatic: true,
        render: {
          fillStyle: '#292626',
        },
      });

      //pentes

      const pente = Bodies.rectangle(630, 980, 150, 10, {
        friction: 0.05,
        isStatic: true,
        radius: 10,
        angle: Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#5079A6',
        },
      });

      const pente1 = Bodies.rectangle(370, 980, 150, 10, {
        friction: 0.05,
        isStatic: true,
        angle: -Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#5079A6',
        },
      });

      const pente2 = Bodies.rectangle(820, 1020, 150, 10, {
        friction: 0.05,
        isStatic: true,
        angle: -Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#5079A6',
        },
      });

      const pente3 = Bodies.rectangle(200, 1020, 150, 10, {
        friction: 0.05,
        isStatic: true,
        angle: Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#5079A6',
        },
      });

      const pente4 = Bodies.rectangle(470, 960, 30, 10, {
        friction: 0.05,
        isStatic: true,
        angle: Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const pente5 = Bodies.rectangle(530, 1020, 30, 10, {
        friction: 0.05,
        isStatic: true,
        angle: -Math.PI / 7, // 30°
        label: 'pente',
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const pente6 = Bodies.rectangle(275, 1500, 400, 20, {
        friction: 0.05,
        isStatic: true,
        angle: Math.PI / 4, // 30°
        label: 'pente',
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const pente7 = Bodies.rectangle(730, 1500, 400, 20, {
        friction: 0.05,
        isStatic: true,
        angle: -Math.PI / 4, // 30°
        label: 'pente',
        render: {
          fillStyle: '#2c3e50',
        },
      });

      //CYLINDRE
      const roue1 = Bodies.polygon(500, 1850, 6, 120, {
        isStatic: false,
        density: 0.01,
        friction: 1,
        frictionAir: 0.02,
        restitution: 0.2,
        density: 0.02,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      //permet de bloquer la forme
      const constraint1 = Constraint.create({
        pointA: { x: 500, y: 1850 },
        bodyB: roue1,
        stiffness: 0.5,
        angularStiffness: 0,
      });

      //BOX

      const sol = Bodies.rectangle(100, 800, 450, 20, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });
      const sol2 = Bodies.rectangle(900, 800, 400, 20, {
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const fin = Bodies.rectangle(500, 2200, 800, 20, {
        label: 'fin',
        isStatic: true,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const murGauche = Bodies.rectangle(0, 300, 100, 600, {
        isStatic: true,
        render: {
          fillStyle: '#E5F7FF',
        },
      });

      const murDroit = Bodies.rectangle(950, 300, 10, 600, {
        isStatic: true,
        render: {
          fillStyle: '#E5F7FF',
        },
      });

      Matter.Events.on(engine, 'collisionStart', function (event) {
        event.pairs.forEach((pair) => {
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;
          if (
            (bodyA.label === 'Reparation' && bodyB.label === 'fin') ||
            (bodyA.label === 'fin' && bodyB.label === 'Reparation')
          ) {
            setDisplayRubeGoldberg(false);
          }

          if (
            (bodyA.label === 'Argent' && bodyB.label === 'fin') ||
            (bodyA.label === 'fin' && bodyB.label === 'Argent')
          ) {
            setDisplayRubeGoldberg(false);
            setCurrentModal(null);
            changeMoney(50);
            removeAlert(currentModal);
          }

          if (
            (bodyA.label === 'Eclair' && bodyB.label === 'fin') ||
            (bodyA.label === 'fin' && bodyB.label === 'Eclair')
          ) {
            setDisplayRubeGoldberg(false);
            setCurrentModal(null);
            changeEnergy(20);
            removeAlert(currentModal);
          }
        });
      });

      // Ajouter tout au monde
      World.add(world, [
        Reparation,
        Argent,
        Eclair,
        Obstacle1,
        Obstacle2,
        Obstacle3,
        Obstacle4,
        Obstacle5,
        Obstacle6,
        Obstacle7,
        Obstacle8,
        Obstacle9,
        Obstacle10,
        Obstacle11,
        Obstacle12,
        Obstacle13,
        Obstacle14,
        Obstacle15,
        Obstacle16,
        Obstacle17,
        Obstacle20,
        Obstacle21,
        Obstacle22,
        Obstacle23,
        Obstacle24,
        Obstacle25,
        Obstacle26,
        Obstacle27,
        Obstacle30,
        Obstacle31,
        Obstacle32,
        Obstacle33,
        Obstacle34,
        Obstacle35,
        Obstacle40,
        Obstacle41,
        Obstacle42,
        Obstacle43,
        Obstacle44,
        Obstacle45,
        Obstacle50,
        Obstacle51,
        Obstacle52,
        Obstacle53,
        sep1,
        sep2,
        sep3,
        sep4,
        pente,
        pente1,
        pente2,
        pente3,
        pente4,
        pente5,
        pente6,
        pente7,
        roue1,
        constraint1,
        fin,

        sol,
        sol2,
        murGauche,
        murDroit,
      ]);

      //ROTATION
      Body.setAngularVelocity(roue1, 0.6);

      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      sceneRef.current = { render, runner, engine };
    };

    document.body.appendChild(script);

    // Nettoyage
    return () => {
      if (sceneRef.current) {
        const { render, engine } = sceneRef.current;
        if (window.Matter) {
          const { Render, World, Engine } = window.Matter;
          Render.stop(render);
          World.clear(engine.world);
          Engine.clear(engine);
        }
      }
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        zIndex: 21,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '1200px',
          border: '4px solid #374151',
          borderRadius: '10px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
}
