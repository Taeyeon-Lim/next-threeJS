'use client';

import { Suspense } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Loader,
  OrbitControls,
  Stats,
} from '@react-three/drei';
import { Leva } from 'leva';

import World from './World';

const INIT_PLACE_SIZE = 32;
const INIT_CAMERA_POS: Vector3 = [0, INIT_PLACE_SIZE / 2, 0];
const INIT_ORBITCTLS_TARGET: Vector3 = [
  INIT_PLACE_SIZE / 2,
  0,
  INIT_PLACE_SIZE / 2,
];

function Minecraft() {
  return (
    <Suspense
      fallback={
        <Loader
          containerStyles={{ background: 'whiteSmoke' }}
          dataStyles={{ color: 'purple' }}
        />
      }
    >
      <Canvas
        style={{ background: '#80a0e0' }}
        dpr={[0.5, 2]}
        camera={{ position: INIT_CAMERA_POS, fov: 75 }}
        // frameloop='demand'
        gl={{ antialias: false }}
      >
        <directionalLight position={[1, 1, 1]} />
        <directionalLight position={[-1, 1, -0.5]} />
        <ambientLight intensity={1} />

        <World INIT_PLACE_SIZE={INIT_PLACE_SIZE} />

        <OrbitControls makeDefault target={INIT_ORBITCTLS_TARGET} />

        <AdaptiveEvents />
        <AdaptiveDpr pixelated />
        <BakeShadows />
      </Canvas>

      <div className='leva-fill-option right top'>
        <Leva hideCopyButton fill />
      </div>

      <Stats className={'stats left bottom'} />
    </Suspense>
  );
}

export default Minecraft;
