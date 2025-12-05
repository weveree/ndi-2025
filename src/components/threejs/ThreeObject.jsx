import { Gltf, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

function Model({ url, scale }) {
  const ref = useRef();
  const { camera, size } = useThree();

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  return <Gltf ref={ref} src={url} rotation={[Math.PI / 6, 0, 0]} scale={scale} />;
}

export default function ThreeObject({ model, scale }) {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <OrbitControls />
      <Model url={model} scale={scale} />
    </Canvas>
  );
}
