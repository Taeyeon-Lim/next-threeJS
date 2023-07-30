'use client';

import * as THREE from 'three';
import { PropsWithChildren, useRef, useState } from 'react';

import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import {
  Image,
  PerspectiveCamera,
  RenderTexture,
  Text,
  useCursor,
} from '@react-three/drei';

import { TelevisionInstancesType } from './Televisions';

type DreiImageProps = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  (THREE.Material & { zoom: number }) | (THREE.Material[] & { zoom: number })
> | null;

type ScreenProps = {
  frame: string;
  panel: string;
  instances: TelevisionInstancesType;
  materials: {
    [name: string]: THREE.Material;
  };
} & ThreeElements['group'];

function Screen({
  frame,
  panel,
  instances,
  materials,
  children,
  ...props
}: PropsWithChildren<ScreenProps>) {
  return (
    <group {...props}>
      <mesh geometry={instances[frame].geometry} material={materials.Texture} />

      <mesh geometry={instances[panel].geometry}>
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture
            width={512}
            height={512}
            attach='map'
            anisotropy={16}
            sourceFile={null} // legacy type
          >
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

// Text inner Screen
export function ScreenText({
  text = 'NONE TEXT',
  invert = false,
  x = 0,
  y = 1.2,
  ...props
}: {
  text?: string;
  invert?: boolean;
  x?: number;
  y?: number;
} & ScreenProps) {
  const textRef = useRef<any>(null!);
  const [rand] = useState(Math.random() * 10000);

  useFrame(
    state =>
      (textRef.current.position.x =
        x + Math.sin(rand + state.clock.elapsedTime / 4) * 8)
  );

  return (
    <Screen {...props}>
      <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 15]} />

      <color attach='background' args={[invert ? 'black' : '#35c19f']} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />

      <Text
        font={'fonts/NanumGothic-Regular.woff'}
        position={[x, y, 0]}
        ref={textRef}
        fontSize={3}
        letterSpacing={-0.1}
        color={!invert ? 'black' : '#35c19f'}
      >
        {text}
      </Text>
    </Screen>
  );
}

// Image inner Screen
export function ScreenImage({
  url,
  routerPath,
  ...props
}: { url: string; routerPath: string } & ScreenProps) {
  const imageRef = useRef<DreiImageProps>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useFrame((_state, delta) => {
    if (!imageRef.current) return;
    const image = imageRef.current;

    image.material.zoom = THREE.MathUtils.damp(
      image.material.zoom,
      hovered ? 2 : 1,
      4,
      delta
    );
  });

  return (
    <Screen {...props}>
      <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 10]} />
      <color attach='background' args={['black']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.75} />
      <pointLight position={[-10, -10, -10]} />

      <Image
        ref={imageRef}
        url={url}
        // @ts-ignore
        alt={'Thumbnail_' + url.split('/')[1]}
        position={[-3.15, 0.75, 0]}
        scale={2.25}
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (routerPath) router.push(routerPath);
        }}
      />
    </Screen>
  );
}

// Box inner Screen
export function ScreenBox({
  routerPath,
  ...props
}: { routerPath: string } & ScreenProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // useFrame 내부에 setState 사용 금지 (규칙)
  useFrame((_state, delta, _frame) => {
    if (!meshRef.current) return;

    // 프레임 렌더링 직전 호출됨
    // (+ 컴포넌트 언마운트 시, 자동 구독 취소됨)
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
    meshRef.current.rotation.z += delta;
  });

  useCursor(hovered);

  return (
    <Screen {...props}>
      <PerspectiveCamera makeDefault manual aspect={1} position={[0, 0, 5]} />
      <color attach='background' args={['Orchid']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.75} />
      <pointLight position={[-10, -10, -10]} />

      <mesh
        ref={meshRef}
        position={[-0.025, 0.34, 0]}
        scale={0.35}
        onClick={() => {
          if (routerPath) router.push(routerPath);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'Gold'} />
      </mesh>
    </Screen>
  );
}
