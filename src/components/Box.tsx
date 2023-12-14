'use client';

import * as THREE from 'three';
import { useState, useRef } from 'react';

import { Canvas, useFrame, ThreeElements, extend } from '@react-three/fiber';
import { shaderMaterial, useCursor } from '@react-three/drei';
import { Leva, useControls } from 'leva';

import { ShadowMesh } from 'three-stdlib';

const StripeMaterial = shaderMaterial(
  {
    uTime: 0,
    uStep: 0.5,
    uMultiplier: 1,
    uAlpha: 0.5,
    uColorA: new THREE.Color(0x000000),
    uColorB: new THREE.Color(0x000000),
  },

  // vertex shader (공간 좌표)
  /*glsl*/ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // fragment shader (vertex shader에서 설정한 영역의 픽셀[컬러] 출력값 계산)
  /*glsl*/ ` 
    varying vec2 vUv;

    uniform float uTime; 
    uniform float uMultiplier;
    uniform float uAlpha;
    uniform vec3 uColorA;
    uniform vec3 uColorB;

    void main() { 
      vec2 mulvUv = mod(vUv * uMultiplier, 1.0); 
      float strength = step(0.5, mod(mulvUv.y + uTime, 1.0));
      vec3 mixColor = mix(uColorA, uColorB, step(0.5, mulvUv.y));

      gl_FragColor.rgba = vec4(mixColor, min(strength, uAlpha));  
    }
  `
);

extend({ StripeMaterial });

type StripeMaterialImpl = {
  uTime: number;
  uAlpha: number;
  uMultiplier: number;
  uColorA: string;
  uColorB: string;
} & JSX.IntrinsicElements['shaderMaterial'];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      stripeMaterial: StripeMaterialImpl;
    }
  }
}

const isRotateAxis = (x: string): x is 'x' | 'y' | 'z' =>
  ['x', 'y', 'z'].includes(x);

export function ThreeBox(props: ThreeElements['mesh']) {
  const meshRef = useRef<ShadowMesh>(null!);
  const shadowMaterialRef = useRef<THREE.ShaderMaterial & StripeMaterialImpl>(
    null!
  );

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { rotateAxis, flow, ...boxLineControls } = useControls('Control', {
    rotateAxis: {
      value: 'z',
      options: ['none', 'x', 'y', 'z'],
    },
    uAlpha: {
      label: 'Alpha',
      min: 0,
      max: 1,
      value: 0.5,
      step: 0.1,
    },
    uMultiplier: {
      label: 'Multiplier',
      min: 0,
      max: 5,
      value: 1,
      step: 0.1,
    },
    uColorA: {
      label: 'Color_1',
      value: '#0000FF',
    },
    uColorB: {
      label: 'Color_2',
      value: '#FF0000',
    },
    flow: true,
  });

  // useFrame 내부에 setState 사용 금지 (규칙)
  useFrame((_, delta) => {
    // 프레임 렌더링 직전 호출됨
    // (+ 컴포넌트 언마운트 시, 자동 구독 취소됨)

    if (isRotateAxis(rotateAxis)) {
      meshRef.current.rotation[rotateAxis] += delta;
    }

    if (flow) shadowMaterialRef.current.uTime += delta;
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
      onPointerOut={() => setHover(false)}
      dispose={null}
    >
      <boxGeometry args={[1, 1, 1]} />

      <stripeMaterial
        key={StripeMaterial.key}
        ref={shadowMaterialRef}
        uTime={0}
        {...boxLineControls}
      />
    </mesh>
  );
}

const vertical_position = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
const box_position = Array.from(
  { length: 14 },
  (_, i) => (i % 2 ? i : -i) * 1.2
);

const ThreeBoxes = () => {
  return (
    <group position={[-0.5, 0, 0]}>
      {vertical_position.map(floor => (
        <group key={floor} position={[0, floor, 0]}>
          {box_position.map(x => (
            <ThreeBox key={x} position={[x, 0, 0]} />
          ))}
        </group>
      ))}
    </group>
  );
};

export default function Box() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 75,
          position: [0, 0, 10],
          // zoom: 100,
          // far, near (카메라에서 렌더링 되는 장면의 최소 거리)
          // near: 0.1,
          // far: 1000,
        }}
      >
        <ThreeBoxes />
      </Canvas>

      <Leva />
    </>
  );
}
