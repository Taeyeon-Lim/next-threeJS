'use client';

import * as THREE from 'three';
import { useRef, useEffect, CSSProperties } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stats,
  Bounds,
  Icosahedron,
  useDetectGPU,
  OrbitControls,
} from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';

import vertexPars from './shader/vertex_pars.glsl';
import vertexMain from './shader/vertex_main.glsl';
import fragmentPars from './shader/fragment_pars.glsl';
import fragmentMain from './shader/fragment_main.glsl';

const LEVA_STYLES: CSSProperties = {
  position: 'fixed',
  bottom: '10px',
  right: '10px',
  zIndex: 256,
};

const BeadTexture = ({
  uWrinkle,
  speed,
}: {
  uWrinkle: number;
  speed: number;
}) => {
  const shadowRef = useRef<THREE.MeshStandardMaterial>(null!);

  useEffect(() => {
    const shader = shadowRef.current?.userData?.shader;
    if (!shader) return;

    shader.uniforms.uWrinkle.value = uWrinkle;
  }, [uWrinkle]);

  useFrame((_, delta) => {
    if (speed === 0 || uWrinkle === 0) return;

    const shader = shadowRef.current?.userData?.shader;
    if (!shader) return;

    shader.uniforms.uTime.value += delta * speed;
  });

  return (
    <meshStandardMaterial
      ref={shadowRef}
      onBeforeCompile={shader => {
        // 셰이더 메쉬에 조명을 주는 3가지 방법
        // 1. 커스텀 셰이더인 경우, fragment 셰이더에서 수동으로 빛을 계산한다.
        // 2. 지원되는 셰이더인 경우, onBeforeCompile 함수를 통해 기존 셰이더 코드를 확장한다.
        // 3. 이와 관련한 라이브러리를 사용한다.

        // 이 구현은 2번째 방법

        // shader 참조
        shadowRef.current.userData.shader = shader;

        // uniforms
        shader.uniforms.uTime = { value: 0.0 };
        shader.uniforms.uWrinkle = { value: 6.0 };

        // custom vertex
        const parsVertexString = '#include <displacementmap_pars_vertex>';
        shader.vertexShader = shader.vertexShader.replace(
          parsVertexString,
          parsVertexString + '\n' + vertexPars
        );
        const mainVertexString = '#include <displacementmap_vertex>';
        shader.vertexShader = shader.vertexShader.replace(
          mainVertexString,
          mainVertexString + '\n' + vertexMain
        );

        // custom fragment
        const parsFragmentString = '#include <bumpmap_pars_fragment>';
        shader.fragmentShader = shader.fragmentShader.replace(
          parsFragmentString,
          parsFragmentString + '\n' + fragmentPars
        );

        const mainFragmentString = '#include <normal_fragment_maps>';
        shader.fragmentShader = shader.fragmentShader.replace(
          mainFragmentString,
          mainFragmentString + '\n' + fragmentMain
        );
      }}
    />
  );
};

function Bead() {
  const { uWrinkle, speed, color } = useControls({
    uWrinkle: {
      label: 'wrinkle',
      min: 0,
      max: 6,
      value: 6,
      step: 0.1,
    },
    speed: {
      min: 0,
      max: 0.5,
      value: 0.25,
      step: 0.01,
    },
    color: '#0000ff',
  });

  const GPUTier = useDetectGPU();

  return (
    <>
      <Canvas dpr={[1, 2]} gl={{ antialias: false }}>
        {/* Env */}
        <fog attach='fog' args={[color, 0.1, 20]} />
        <color attach='background' args={['#000000']} />

        {/* Light */}
        <directionalLight
          position={[15, 20, 15]}
          color={color}
          intensity={0.5}
        />

        {/* Scene */}
        <Bounds fit clip observe margin={1.5} dispose={null}>
          <Icosahedron
            args={[
              1,
              GPUTier.isMobile
                ? GPUTier.tier < 1
                  ? 100
                  : GPUTier.tier < 2
                  ? 200
                  : GPUTier.tier < 3
                  ? 225
                  : 250
                : 400,
            ]}
          >
            <BeadTexture uWrinkle={uWrinkle} speed={speed} />
          </Icosahedron>
        </Bounds>

        {/* Effect */}
        <EffectComposer disableNormalPass multisampling={8} renderPriority={1}>
          <Bloom
            luminanceThreshold={0.01}
            luminanceSmoothing={0.05}
            intensity={2}
            mipmapBlur
          />
        </EffectComposer>

        <OrbitControls makeDefault enablePan={false} enableZoom={false} />
      </Canvas>

      <div style={LEVA_STYLES}>
        <Leva hideCopyButton fill={GPUTier.isMobile} />
      </div>

      <Stats className={`stats right ${GPUTier.isMobile ? 'top' : 'bottom'}`} />
    </>
  );
}

export default Bead;

// const BeadShadowMaterial = TestMat(
//   {
//     uTime: 0.1,
//     uWrinkle: 6,
//     // uTexture: new THREE.Texture(),
//     uColor: new THREE.Color(0, 0, 255),
//     ...THREE.UniformsLib['lights'],
//   },
//   vertex,
//   fragment
// );

// extend({ BeadShadowMaterial });

// type BeadShadowMaterialImpl = {
//   uTime: number;
//   uWrinkle: number;
//   // uTexture: THREE.Texture;
//   uColor: THREE.Color | string;
// } & JSX.IntrinsicElements['shaderMaterial'];

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       beadShadowMaterial: BeadShadowMaterialImpl;
//     }
//   }
// }
