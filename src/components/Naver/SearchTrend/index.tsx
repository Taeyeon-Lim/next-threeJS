'use client';
// asset URL : https://sketchfab.com/Portal.Studio

import * as THREE from 'three';
import {
  useState,
  useRef,
  Suspense,
  useLayoutEffect,
  useCallback,
} from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stats,
  Environment,
  OrbitControls,
  CameraControls,
  Loader,
  Stars,
  Sparkles,
} from '@react-three/drei';

import { degToRad } from 'three/src/math/MathUtils';
import { useTimeout } from '@utils/hookUtils';

import DysonRingsDummy from './Canvas/DysonRingsDummy';
import AlphaTowerDummy, { AlphaTowerAnimation } from './Canvas/AlphaTowerDummy';
import BetaTowerDummy, { BetaTowerAnimation } from './Canvas/BetaTowerDummy';
import DysonRings from './Canvas/DysonRings';
import AlphaTower from './Canvas/AlphaTower';
import BetaTower from './Canvas/BetaTower';

import { SearchTrendData } from '@api/external/Naver';
import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export type SearchTrendModelInstancesType = {
  [name: string]: THREE.Object3D<THREE.Object3DEventMap> & {
    geometry?: THREE.BufferGeometry;
  };
};
export type AnimationState = 'up' | 'down' | 'reset' | null;

const RADIUS = 30;

const Rig = ({
  towerType,
  animation,
  afterUpAnimation,
}: {
  towerType: 'odd' | 'even';
  animation: AnimationState;
  afterUpAnimation: () => void;
}) => {
  const orbitCameraRef = useRef<OrbitControlsImpl>(null);

  const [cam_pos] = useState(() => new THREE.Vector3(0, -10, 0));
  const [add_tower_pos] = useState(() => new THREE.Vector3(-103, 177, 0));

  const defaultCameraPosition = useCallback(
    (width: number) => {
      const orbitCamera = orbitCameraRef.current;
      if (!orbitCamera) return;

      if (width < 500) {
        // :: Mobile
        orbitCamera.maxDistance = 95;
        orbitCamera.minDistance = 95;
        orbitCamera.target.lerp(cam_pos.set(0, -20, 0), 0.04);
        orbitCamera.setPolarAngle(degToRad(50));
      } else {
        // :: Desktop
        orbitCamera.maxDistance = 50;
        orbitCamera.minDistance = 50;
        orbitCamera.target.lerp(cam_pos.set(0, -10, 0), 0.04);
        orbitCamera.setPolarAngle(degToRad(65));
      }
    },
    [cam_pos]
  );

  useTimeout(
    () => {
      afterUpAnimation();
    },
    5000,
    animation === 'up'
  );

  const controlsRef = useRef<CameraControls>(null);
  const alphaTowerRef = useRef<THREE.Group>(null);
  const betaTowerRef = useRef<THREE.Group>(null);

  useFrame(({ size }) => {
    if (animation === 'up' || !towerType) {
      // Increase tower count
      if (!controlsRef?.current) return;

      if (towerType === 'odd') {
        if (!alphaTowerRef.current?.position) return;

        alphaTowerRef.current.position.lerp(
          add_tower_pos.set(
            Math.min(add_tower_pos.x + 0.05, -0.05),
            Math.max(add_tower_pos.y - 0.08, 5),
            0
          ),
          0.05
        );
      } else {
        if (!betaTowerRef.current?.position) return;

        betaTowerRef.current.position.lerp(
          add_tower_pos.set(
            Math.min(add_tower_pos.x + 0.05, -0.05),
            Math.max(add_tower_pos.y - 0.08, 5),
            0
          ),
          0.05
        );
      }

      controlsRef.current.setLookAt(
        -100,
        165,
        3,
        add_tower_pos.x,
        add_tower_pos.y - 2,
        add_tower_pos.z,
        true
      );
    } else {
      add_tower_pos.set(-103, 177, 0);
      defaultCameraPosition(size.width);
    }
  });

  return (
    <>
      {animation === 'up' ? (
        <CameraControls ref={controlsRef} />
      ) : (
        <OrbitControls
          makeDefault
          ref={orbitCameraRef}
          minPolarAngle={degToRad(50)}
          maxPolarAngle={degToRad(65)}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          enabled={false}
        />
      )}

      <Suspense fallback={null}>
        <AlphaTowerAnimation
          ref={alphaTowerRef}
          position={add_tower_pos}
          rotation={[0, 0, Math.PI / 8]}
          visible={animation === 'up' && towerType === 'odd'}
        />
      </Suspense>

      <Suspense fallback={null}>
        <BetaTowerAnimation
          ref={betaTowerRef}
          position={add_tower_pos}
          rotation={[0, 0, Math.PI / 8]}
          visible={animation === 'up' && towerType === 'even'}
        />
      </Suspense>
    </>
  );
};

function SearchTrend({ data }: { data: SearchTrendData }) {
  const [towerCount, setTowerCount] = useState(data.results.length);
  const [animation, setAnimation] = useState<AnimationState>(null);

  const afterTowerCountAnimation = useCallback(() => {
    setAnimation(null);
    setTowerCount(data.results.length);
  }, [data.results.length]);

  useLayoutEffect(() => {
    const diff = data.results.length - towerCount;
    if (diff === 0) return;

    setAnimation(diff === -4 ? 'reset' : diff > 0 ? 'up' : 'down');
  }, [data, towerCount]);

  return (
    <Suspense
      fallback={
        <Loader
          containerStyles={{ background: '#10051b' }}
          dataStyles={{ color: 'white' }}
        />
      }
    >
      <Canvas shadows dpr={[0.5, 2]}>
        {/* Camera Control */}
        <Rig
          towerType={data.results.length % 2 ? 'odd' : 'even'}
          animation={animation}
          afterUpAnimation={afterTowerCountAnimation}
        />

        {/* Light */}
        <ambientLight intensity={0.5} />
        <hemisphereLight
          position={[0, 0, 0]}
          intensity={0.5}
          groundColor='blue'
        />
        <spotLight
          position={[15, 20, 0]}
          angle={0.25}
          penumbra={1}
          intensity={1}
          color={'Lightcoral'}
          castShadow
        />

        {/* Model */}
        <Suspense fallback={<DysonRingsDummy />}>
          <DysonRings>
            {Array.from(
              {
                length: towerCount,
              },
              (_, i) => i
            ).map((key, index) => {
              const positionX =
                Math.sin((2 * Math.PI * key) / towerCount) * RADIUS;
              const positionZ =
                Math.cos((2 * Math.PI * key) / towerCount) * RADIUS;
              const position = new THREE.Vector3(
                parseFloat(positionX.toFixed(6)),
                0.5,
                parseFloat(positionZ.toFixed(6))
              );
              const searchWord = data.results.map(result => result.title)[
                index
              ];
              if (index % 2) {
                return (
                  <Suspense
                    key={'BetaTower_' + index}
                    //  fallback={<BetaTowerDummy position={position} />}
                    fallback={null}
                  >
                    <BetaTower
                      towerKeyword={searchWord}
                      isDestroy={
                        (animation === 'reset' && index !== 0) ||
                        (index === towerCount - 1 && animation === 'down')
                      }
                      afterDownAnimation={afterTowerCountAnimation}
                      position={position}
                    />
                  </Suspense>
                );
              } else {
                return (
                  <Suspense
                    key={'AlphaTower_' + index}
                    // fallback={<AlphaTowerDummy position={position} />}
                    fallback={null}
                  >
                    <AlphaTower
                      towerKeyword={searchWord}
                      isDestroy={
                        (animation === 'reset' && index !== 0) ||
                        (index === towerCount - 1 && animation === 'down')
                      }
                      afterDownAnimation={afterTowerCountAnimation}
                      position={position}
                    />
                  </Suspense>
                );
              }
            })}
          </DysonRings>
        </Suspense>

        <Environment preset='sunset' resolution={256} />

        <Suspense fallback={null}>
          <Stars
            radius={150}
            depth={50}
            count={1000}
            factor={2}
            saturation={0}
            speed={1.5}
            fade
          />
          <Sparkles
            count={5000}
            speed={0.15}
            opacity={0.25}
            size={50}
            scale={350}
          />
        </Suspense>

        {process.env.NODE_ENV === 'development' && (
          <Stats showPanel={0} className='stats' />
        )}
      </Canvas>

      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            width: 45,
            position: 'absolute',
            left: 10,
            top: 50,
            background: 'black',
            color: 'white',
            textAlign: 'center',
            fontSize: '2rem',
            userSelect: 'none',
          }}
        >
          {towerCount}/{data?.results.length}
          <br />
          {animation}
        </div>
      )}
    </Suspense>
  );
}

export default SearchTrend;
