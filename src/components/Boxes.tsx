// 참고 자료
// https://codesandbox.io/p/sandbox/angry-goodall-99upv?file=%2Fsrc%2FApp.jsx
// https://threejs.org/examples/?q=instancing#webgl_buffergeometry_instancing

'use client';

import * as THREE from 'three';
import { useRef, Suspense, useLayoutEffect } from 'react';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import {
  Stats,
  useDetectGPU,
  CameraControls,
  shaderMaterial,
} from '@react-three/drei';
import { Leva, useControls } from 'leva';

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
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
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

const isRotateAxis = (x: string): x is 'X' | 'Y' | 'Z' =>
  ['X', 'Y', 'Z'].includes(x);

function ThreeBox() {
  const meshRef = useRef<THREE.BoxGeometry>(null!);
  const shadowMaterialRef = useRef<THREE.ShaderMaterial & StripeMaterialImpl>(
    null!
  );

  const { rotateAxis, flow, ...stripeControls } = useControls('Control', {
    rotateAxis: {
      value: 'Z',
      options: ['None', 'X', 'Y', 'Z'],
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

    if (meshRef.current && isRotateAxis(rotateAxis)) {
      meshRef.current[`rotate${rotateAxis}`](delta);
    }

    if (shadowMaterialRef.current && flow) {
      shadowMaterialRef.current.uTime += delta;
    }
  });

  return (
    <>
      <boxGeometry args={[0.2, 0.2, 0.2]} ref={meshRef} />

      <stripeMaterial
        key={StripeMaterial.key}
        ref={shadowMaterialRef}
        {...stripeControls}
        uTime={0}
      />
    </>
  );
}

const ThreeBoxes = ({
  initBoxCount,
}: {
  initBoxCount: 500 | 2000 | 5000 | 10000;
}) => {
  const instanceMeshRef = useRef<THREE.InstancedMesh>(null!);

  // * Docs에서는 Object3D 대신 group 사용을 권장
  // const [object] = useState(() => new THREE.Object3D());
  const groupRef = useRef<THREE.Group>(null!);

  const { count: boxCount } = useControls('Control', {
    count: {
      value: initBoxCount,
      min: 0,
      max: {
        500: 5000,
        2000: 50000,
        5000: 50000,
        10000: 50000,
      }[initBoxCount],
      step: 100,
    },
  });

  useLayoutEffect(() => {
    const object = groupRef.current;
    const ins_mesh = instanceMeshRef.current;
    if (!object || !ins_mesh) return;

    let i = 0;
    const root = Math.round(Math.pow(boxCount, 1 / 3));
    const halfRoot = root / 2;
    const random = Math.random();

    for (let x = 0; x < root; x++) {
      for (let y = 0; y < root; y++) {
        for (let z = 0; z < root; z++) {
          const id = i++;

          // set node position
          object.rotation.set(0, 0, 0);
          object.position.set(
            halfRoot - x + random,
            halfRoot - y + random,
            halfRoot - z + random
          );

          // update instance
          object.updateMatrix();
          ins_mesh.setMatrixAt(id, object.matrix);

          // reset camera-position-center
          object.position.set(
            ins_mesh.position.x,
            ins_mesh.position.y,
            ins_mesh.position.z
          );
        }
      }
    }

    // little optimizing
    ins_mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    ins_mesh.instanceMatrix.needsUpdate = true;
    ins_mesh.computeBoundingSphere();
  }, [boxCount]);

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={instanceMeshRef}
        args={[undefined, undefined, boxCount]}
      >
        <ThreeBox />
      </instancedMesh>

      {/* Merged Example 
      <Merged
        meshes={[
          new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()
          ),
          new THREE.Mesh(
            new THREE.SphereGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()
          ),
        ]}
      >
        {(Box: any, Sphere: any) => (
          <>
            <Box position={[-1, -1, 0]} />
            <Box position={[-2, -2, 0]} />
            <Sphere position={[1, -1, 0]} />
          </>
        )}
      </Merged> */}
    </group>
  );
};

export default function Boxes() {
  const GPUTier = useDetectGPU();

  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 3]}
        camera={{
          // fov: 75,
          position: [0, 0, 0.01],
          // zoom: 100,
          // far, near (카메라에서 렌더링 되는 장면의 최소 거리)
          // near: 0.1,
          // far: 1000,
        }}
        gl={{ antialias: false }}
      >
        <ThreeBoxes
          initBoxCount={
            GPUTier.tier < 1
              ? 500
              : GPUTier.tier < 2
              ? 2000
              : GPUTier.tier < 3
              ? 5000
              : 10000
          }
        />

        <CameraControls />
      </Canvas>

      <div className='leva-fill-option fill right bottom'>
        <Leva hideCopyButton fill={GPUTier.isMobile} />
      </div>

      <Stats className={`stats right ${GPUTier.isMobile ? 'top' : 'bottom'}`} />
    </Suspense>
  );
}
