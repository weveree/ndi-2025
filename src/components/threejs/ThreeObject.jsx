import { Gltf, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Box3, Vector3 } from 'three';

function Model({ url }) {
  const ref = useRef();
  const { camera, size } = useThree();

  useFrame((state, delta) => (ref.current.rotation.y += delta));

  useEffect(() => {
    if (!ref.current) return;

    const box = new Box3().setFromObject(ref.current);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    ref.current.position.sub(center);

    const fov = camera.fov * (Math.PI / 180);

    const maxDim = Math.max(size.x, size.y, size.z);

    const dist = camera.position.length();

    const projectedHeight = 2 * dist * Math.tan(fov / 2);

    const scaleFactor = (projectedHeight / maxDim) * 0.6;

    ref.current.scale.setScalar(scaleFactor);
  }, []);

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
