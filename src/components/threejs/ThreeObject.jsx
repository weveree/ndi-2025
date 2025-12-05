import { Gltf, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Model({ url }) {
  const ref = useRef();

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  return <Gltf ref={ref} src={url} rotation={[Math.PI / 6, 0, 0]} />;
}

export default function ThreeObject({ model }) {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <OrbitControls />
      <Model url={model} />
    </Canvas>
  );
}
