'use client';

import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Loader,
  Environment,
  CameraShake,
  OrbitControls,
  MeshReflectorMaterial,
  BakeShadows,
} from '@react-three/drei';
import {
  EffectComposer,
  BrightnessContrast,
  DepthOfField,
  Bloom,
} from '@react-three/postprocessing';
import { useDebounce } from '@utils/hookUtils';
import { degToRad } from 'three/src/math/MathUtils';

import Televisions from './Televisions';

import { IoMdReverseCamera } from 'react-icons/io';
import { MdControlCamera } from 'react-icons/md';

import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import styles from '@app/home.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Rig = ({ isOverCanvas }: { isOverCanvas: boolean }) => {
  const orbitControlRef = useRef<OrbitControlsImpl>(null!);

  useFrame(({ viewport, pointer }) => {
    if (!orbitControlRef.current || !isOverCanvas) return;

    const { x, y } = pointer;
    const angleX = viewport.width >= 13 ? 45 : 90;
    const newAngleX = -(x * degToRad(angleX));
    const newAngleY = (y + 1) * degToRad(90 - 40);

    orbitControlRef.current.setAzimuthalAngle(newAngleX);
    orbitControlRef.current.setPolarAngle(newAngleY);
  });

  useEffect(() => {
    if (!orbitControlRef.current || isOverCanvas) return;

    orbitControlRef.current.setAzimuthalAngle(0);
    orbitControlRef.current.setPolarAngle(90);
  }, [isOverCanvas, orbitControlRef]);

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
        enablePan={false}
      />
    </>
  );
};

const LightControl = ({ isOverCanvas }: { isOverCanvas: boolean }) => {
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const [vec] = useState(() => new THREE.Vector3());

  // * Display Light Range (auto update)
  // useHelper(spotLightRef, THREE.SpotLightHelper, 'cyan');

  useFrame(({ viewport, pointer }) => {
    if (!spotLightRef?.current || !isOverCanvas) return;

    const { x, y } = pointer;

    spotLightRef.current.target.position.lerp(
      vec.set((x * viewport.width) / 2, (y * viewport.height) / 2, 0),
      0.1
    );
    spotLightRef.current.target.updateMatrixWorld();
  });

  useEffect(() => {
    if (!spotLightRef?.current || isOverCanvas) return;

    spotLightRef.current.target.position.lerp(vec.set(0, 0, 0), 1);
    spotLightRef.current.target.updateMatrixWorld();
  }, [isOverCanvas, vec]);

  return (
    <spotLight
      ref={spotLightRef}
      position={[0, 4.2, 5]}
      angle={0.4}
      penumbra={1}
      intensity={1}
      // shadow-mapSize={256} // performance issue
    />
  );
};

function Television() {
  const [autoFallback, setAutoFallback] = useState(true);
  const [isOverPointer, setIsOverPointer] = useState(false);

  const debouncedOverPointer = useDebounce(
    isOverPointer,
    isOverPointer ? 0 : 5500
  );

  return (
    <>
      <button
        className={cx('autoBack-button')}
        onClick={() => {
          setIsOverPointer(autoFallback);
          setAutoFallback(prev => !prev);
        }}
      >
        {autoFallback ? <IoMdReverseCamera /> : <MdControlCamera />}
      </button>

      <Canvas
        shadows
        dpr={[1, 2]}
        onPointerOver={() => setIsOverPointer(true)}
        onPointerOut={() => autoFallback && setIsOverPointer(false)}
      >
        {/* 전역 라이트 */}
        <ambientLight position={[10, 10, 10]} intensity={0.1} color={'#fff'} />
        {/* 위, 아래 라이트 */}
        <hemisphereLight intensity={0.15} groundColor='black' />
        {/* 원뿔 모양 라이트 */}
        <LightControl isOverCanvas={debouncedOverPointer} />

        <spotLight
          position={[15, 20, 0]}
          angle={0.1}
          penumbra={1}
          intensity={1}
          color={'Lightcoral'}
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
        <Rig isOverCanvas={debouncedOverPointer} />

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
              resolution={1024}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.4}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.2}
              color='#202020'
              metalness={0.75}
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

        <EffectComposer disableNormalPass>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={2}
            mipmapBlur
          />
          <BrightnessContrast
            brightness={-0.02} // brightness. min: -1, max: 1
            contrast={0.02} // contrast: min -1, max: 1
          />
          <DepthOfField
            target={[0, 0, 30]}
            focalLength={0.3}
            bokehScale={25}
            height={500}
          />
        </EffectComposer>

        <BakeShadows />
      </Canvas>

      <Loader
        containerStyles={{ background: 'black' }}
        dataStyles={{ color: 'white' }}
      />
    </>
  );
}

export default Television;
