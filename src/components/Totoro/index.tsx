'use client';

import React, { Suspense } from 'react';

import { Loader, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import TextOverlay from './TextOverlay';
import Model from './Model';

function Totoro() {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [2.3, 1.5, 2.3],
          fov: 64,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight color={'red'} position={[0, 0, 2]} />
        <spotLight position={[20, 20, 20]} angle={0.1} penumbra={1} />

        <ScrollControls pages={3} damping={0.25}>
          <Suspense fallback={null}>
            <Model position={[0, -0.5, 0]} rotation={[0, 0.75, 0.025]} />
          </Suspense>

          <TextOverlay />
        </ScrollControls>
      </Canvas>

      <Loader
        containerStyles={{ backgroundColor: '#d9afd9' }}
        dataStyles={{ color: 'white' }}
      />
    </>
  );
}

export default Totoro;
