import { useEffect, useRef } from 'react';

export default function PageMilieu({ onEnd }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Charger Matter.js depuis le CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
    script.async = true;

    const width = 1000;
    const height = 800;

    script.onload = () => {
      // Matter.js est maintenant chargé
      const Matter = window.Matter;
      const { Engine, Render, Runner, Bodies, World, Body, Constraint, Events } = Matter;

      // Créer le moteur
      const engine = Engine.create();
      const world = engine.world;

      // Créer le rendu
      const render = Render.create({
        canvas: canvasRef.current,
        engine: engine,
        options: {
          width: width,
          height: height,
          wireframes: false,
          background: '#E5F7FF',
        },
      });

      // Créer les balles avec des couleurs différentes
      const ball1 = Bodies.circle(100, 0, 10, {
        restitution: 0.1,
        label: 'ball',
        render: {
          fillStyle: '#e74c3c',
        },
      });

      const ball2 = Bodies.circle(425, 0, 10, {
        restitution: 0.1,
        label: 'ball',
        render: {
          fillStyle: '#9BFAA6',
        },
      });

      const ball3 = Bodies.circle(750, 0, 10, {
        restitution: 0.1,
        label: 'ball',
        render: {
          fillStyle: '#F7F388',
        },
      });

      // Roues avec des couleurs différentes
      const roue1 = Bodies.polygon((width / 4) * 0.5, 100, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#a8e6cf', // Vert menthe
        },
      });

      const roue2 = Bodies.polygon((width / 4) * 1.5, 100, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#ffd3b6', // Pêche
        },
      });

      const roue3 = Bodies.polygon((width / 4) * 2.5, 100, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#ffaaa5', // Rose saumon
        },
      });

      const roue4 = Bodies.polygon((width / 4) * 3.5, 100, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#ff8b94', // Rose vif
        },
      });

      const roue5 = Bodies.polygon((width / 4) * 1, 350, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#c7ceea', // Lavande
        },
      });

      const roue6 = Bodies.polygon((width / 4) * 2, 350, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#b4f8c8', // Vert clair
        },
      });

      const roue7 = Bodies.polygon((width / 4) * 3, 350, 6, 120, {
        isStatic: false,
        render: {
          fillStyle: '#fbe7c6', // Beige doré
        },
      });

      // Créer des contraintes pour fixer les roues à leur position
      const constraint1 = Constraint.create({
        pointA: { x: (width / 4) * 0.5, y: 100 },
        bodyB: roue1,
        length: 0,
        stiffness: 1,
      });

      const constraint2 = Constraint.create({
        pointA: { x: (width / 4) * 1.5, y: 100 },
        bodyB: roue2,
        length: 0,
        stiffness: 1,
      });

      const constraint3 = Constraint.create({
        pointA: { x: (width / 4) * 2.5, y: 100 },
        bodyB: roue3,
        length: 0,
        stiffness: 1,
      });

      const constraint4 = Constraint.create({
        pointA: { x: (width / 4) * 3.5, y: 100 },
        bodyB: roue4,
        length: 0,
        stiffness: 1,
      });

      const constraint5 = Constraint.create({
        pointA: { x: (width / 4) * 1, y: 350 },
        bodyB: roue5,
        length: 0,
        stiffness: 1,
      });

      const constraint6 = Constraint.create({
        pointA: { x: (width / 4) * 2, y: 350 },
        bodyB: roue6,
        length: 0,
        stiffness: 1,
      });

      const constraint7 = Constraint.create({
        pointA: { x: (width / 4) * 3, y: 350 },
        bodyB: roue7,
        length: 0,
        stiffness: 1,
      });

      // Pendule 1 - Thème violet
      const anchor1 = Bodies.circle(200, 500, 1, {
        isStatic: true,
        render: {
          fillStyle: '#9b59b6', // Violet
        },
      });

      const bob1 = Bodies.circle(200, 700, 30, {
        density: 0.04,
        friction: 0,
        frictionAir: 0,
        restitution: 0.8,
        render: {
          fillStyle: '#e056fd', // Violet clair
        },
      });

      const rope1 = Constraint.create({
        bodyA: anchor1,
        bodyB: bob1,
        stiffness: 1,
        length: 200,
        render: {
          strokeStyle: '#d291bc', // Rose lavande
          lineWidth: 3,
        },
      });

      Body.setVelocity(bob1, { x: 10, y: 0 });

      // Pendule 2 - Thème orange
      const anchor2 = Bodies.circle(450, 500, 1, {
        isStatic: true,
        render: {
          fillStyle: '#f39c12', // Orange
        },
      });

      const bob2 = Bodies.circle(450, 700, 30, {
        density: 0.04,
        friction: 0,
        frictionAir: 0,
        restitution: 0.8,
        render: {
          fillStyle: '#ff7979', // Rouge orangé
        },
      });

      const rope2 = Constraint.create({
        bodyA: anchor2,
        bodyB: bob2,
        stiffness: 1,
        length: 200,
        render: {
          strokeStyle: '#fdcb6e', // Jaune orangé
          lineWidth: 3,
        },
      });

      Body.setVelocity(bob2, { x: 10, y: 0 });

      // Pendule 3 - Thème cyan
      const anchor3 = Bodies.circle(700, 500, 1, {
        isStatic: true,
        render: {
          fillStyle: '#00d2d3', // Cyan
        },
      });

      const bob3 = Bodies.circle(700, 700, 30, {
        density: 0.04,
        friction: 0,
        frictionAir: 0,
        restitution: 0.8,
        render: {
          fillStyle: '#55efc4', // Vert menthe clair
        },
      });

      const rope3 = Constraint.create({
        bodyA: anchor3,
        bodyB: bob3,
        stiffness: 1,
        length: 200,
        render: {
          strokeStyle: '#74b9ff', // Bleu ciel
          lineWidth: 3,
        },
      });

      Body.setVelocity(bob3, { x: 10, y: 0 });

      // Ajouter tout au monde
      World.add(world, [ball1, ball2, ball3]);
      World.add(world, [roue1, roue2, roue3, roue4, roue5, roue6, roue7]);
      World.add(world, [constraint1, constraint2, constraint3, constraint4, constraint5, constraint6, constraint7]);
      World.add(world, [anchor1, bob1, rope1, anchor2, bob2, rope2, anchor3, bob3, rope3]);

      Body.setAngularVelocity(roue1, 0.06);
      Body.setAngularVelocity(roue2, 0.06);
      Body.setAngularVelocity(roue3, 0.06);
      Body.setAngularVelocity(roue4, 0.06);
      Body.setAngularVelocity(roue5, 0.06);
      Body.setAngularVelocity(roue6, 0.06);
      Body.setAngularVelocity(roue7, 0.06);

      // Fonction pour vérifier s'il reste des balles
      const checkRemainingBalls = () => {
        const balls = world.bodies.filter((body) => body.label === 'ball');

        // Vérifier si les balles sont encore dans le canvas
        const ballsInCanvas = balls.filter(
          (ball) =>
            ball.position.y < height + 100 && // Marge de 100px en bas
            ball.position.x > -100 &&
            ball.position.x < width + 100,
        );

        // Si toutes les balles sont sorties
        if (ballsInCanvas.length === 0 && balls.length > 0) {
          onEnd();
        }
      };

      // Vérifier à chaque frame
      Events.on(engine, 'afterUpdate', checkRemainingBalls);

      // Lancer le rendu et le moteur
      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Stocker pour le nettoyage
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
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 21,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '4px solid #374151',
          borderRadius: '10px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
}
