'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';

import {
  Environment,
  OrbitControls,
  CameraShake,
  MeshReflectorMaterial,
  Loader,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';

import Televisions from './Televisions';

import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const Rig = ({ isFocus }: { isFocus: boolean }) => {
  const orbitControlRef = useRef<OrbitControlsImpl>(null!);

  useFrame(state => {
    if (!orbitControlRef.current) return;
    const orbitControl = orbitControlRef.current;

    const angleX = state.viewport.width >= 13 ? 45 : 90;
    const { x, y } = state.mouse;
    const newAngleX = -(x * degToRad(angleX));
    const newAngleY = (y + 1) * degToRad(90 - 40);

    if (isFocus) {
      orbitControl.setAzimuthalAngle(newAngleX);
      orbitControl.setPolarAngle(newAngleY);
    }
  });

  useEffect(() => {
    if (!orbitControlRef.current) return;
    const orbitControl = orbitControlRef.current;

    if (!isFocus) {
      orbitControl.setAzimuthalAngle(0);
      orbitControl.setPolarAngle(90);
    }
  }, [isFocus, orbitControlRef]);

  return (
    <>
      <CameraShake
        maxYaw={0.02}
        maxPitch={0.02}
        maxRoll={0.02}
        yawFrequency={0.25}
        pitchFrequency={0.25}
        rollFrequency={0.2}
      />
      <OrbitControls
        makeDefault
        ref={orbitControlRef}
        minPolarAngle={degToRad(35)}
        maxPolarAngle={degToRad(90)}
        minDistance={7.5}
        maxDistance={7.5}
      />
    </>
  );
};

const LightControl = ({ isFocus }: { isFocus: boolean }) => {
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const [vec] = useState(() => new THREE.Vector3());

  // * Display Light Range (auto update)
  // useHelper(spotLightRef, THREE.SpotLightHelper, 'cyan');

  useFrame(({ mouse, viewport }) => {
    if (!spotLightRef?.current) return;

    const spotLight = spotLightRef.current;
    const { x, y } = mouse;

    if (isFocus) {
      spotLight.target.position.lerp(
        vec.set((x * viewport.width) / 2, (y * viewport.height) / 2, 0),
        0.1
      );
      spotLight.target.updateMatrixWorld();
    }
  });

  useEffect(() => {
    if (!isFocus) {
      if (!spotLightRef?.current) return;
      const spotLight = spotLightRef.current;

      spotLight.target.position.lerp(vec.set(0, 0, 0), 1);
      spotLight.target.updateMatrixWorld();
    }
  }, [isFocus, vec]);

  return (
    <spotLight
      ref={spotLightRef}
      position={[0, 4.2, 5]}
      angle={0.4}
      penumbra={1}
      intensity={1}
      shadow-mapSize={256}
      castShadow
    />
  );
};

function Television() {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        onPointerOver={() => {
          setIsFocus(true);
        }}
        onPointerOut={() => {
          setIsFocus(false);
        }}
        eventPrefix='client'
      >
        {/* 전역 라이트 */}
        <ambientLight position={[10, 10, 10]} intensity={0.1} color={'#fff'} />
        {/* 위, 아래 라이트 */}
        <hemisphereLight intensity={0.15} groundColor='black' />
        {/* 원뿔 모양 라이트 */}
        <LightControl isFocus={isFocus} />

        <spotLight
          position={[15, 20, 0]}
          angle={0.1}
          penumbra={1}
          intensity={1}
          color={'Lightcoral'}
          shadow-mapSize={512}
          castShadow
        />
        {/* 포인트 라이트 */}
        <pointLight
          distance={1.5}
          intensity={0.2}
          position={[0.75, 0.15, 0]}
          color='coral'
        />
        <pointLight
          distance={1}
          intensity={0.1}
          position={[4, 3.2, 0.2]}
          color='coral'
        />

        {/* Camera control */}
        <Rig isFocus={isFocus} />

        {/* Mesh */}
        <Suspense fallback={null}>
          <Televisions scale={1} position={[0, -2, 2]} />
        </Suspense>

        <Suspense fallback={null}>
          <mesh
            receiveShadow
            position={[0, -2, -5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[35, 35]} />
            <MeshReflectorMaterial
              blur={[300, 30]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#202020'
              metalness={0.8}
              mirror={0}
            />
          </mesh>
        </Suspense>

        {/* Env */}
        <Environment background>
          <mesh>
            <sphereGeometry args={[5, 5, 5]} />
            <meshBasicMaterial color={'black'} side={THREE.BackSide} />
          </mesh>
        </Environment>
      </Canvas>

      <Loader
        containerStyles={{ background: 'black' }}
        dataStyles={{ color: 'white' }}
      />
    </>
  );
}

export default Television;
