'use client';

import { useCursor } from '@react-three/drei';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { useState, useRef, Suspense } from 'react';

// *** 확장된 기본 속성 유형 (Not import from 'three')
// import { Euler, Vector3, Color } from '@react-three/fiber'
// or
// import { ReactThreeFiber } from '@react-three/fiber'
// ReactThreeFiber.Euler, ReactThreeFiber.Vector3, etc.

// rotation: Euler
// position: Vector3
// color: Color

export function ThreeBox(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame 내부에 setState 사용 금지 (규칙)
  useFrame((_state, delta, _frame) => {
    // 프레임 렌더링 직전 호출됨
    // (+ 컴포넌트 언마운트 시, 자동 구독 취소됨)

    meshRef.current.rotation.x += delta;
    // meshRef.current.rotation.y += delta;
    // meshRef.current.rotation.z += delta;
  });

  useCursor(hovered);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={e => {
        e.stopPropagation();
        setActive(!active);
      }}
      onPointerOver={e => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={e => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

const box_position = Array.from(
  { length: 10 },
  (v, i) => (i % 2 ? i : -i) * 1.2
);
const ThreeBoxes = () => {
  return (
    <>
      {box_position.map(x => (
        <ThreeBox key={x} position={[x, 0, 0]} />
      ))}
    </>
  );
};

export default function Box() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 75,
        position: [0, 0, 10],
        // zoom: 1,
        // far, near (카메라에서 렌더링 되는 장면의 최소 거리)
        // near: 0.1,
        // far: 1000,
      }}
    >
      <ambientLight intensity={0.2} />

      <pointLight color={'red'} position={[0, 0, 2]} />

      <spotLight position={[20, 20, 20]} angle={0.1} penumbra={1} />

      <Suspense fallback={null}>
        <ThreeBoxes />
      </Suspense>
    </Canvas>
  );
}
