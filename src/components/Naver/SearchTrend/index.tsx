'use client';
// asset URL : https://sketchfab.com/Portal.Studio

import * as THREE from 'three';
import {
  useState,
  useRef,
  Suspense,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { usePathname } from 'next/navigation';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  Stats,
  Loader,
  Sparkles,
  SpotLight,
  Environment,
  Lightformer,
  OrbitControls,
  CameraControls,
} from '@react-three/drei';

import {
  Outline,
  Selection,
  EffectComposer,
} from '@react-three/postprocessing';
import { degToRad } from 'three/src/math/MathUtils';
import { useTimeout } from '@utils/hookUtils';

import AlphaTowerAnimation from './Canvas/AlphaTowerAnimation';
import BetaTowerAnimation from './Canvas/BetaTowerAnimation';
import DysonRings from './Canvas/DysonRings';
import AlphaTower from './Canvas/AlphaTower';
import BetaTower from './Canvas/BetaTower';

import { SearchTrendData } from '@api/external/Naver';

import { type OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { type OutlineEffect } from 'postprocessing';
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
  const controlsRef = useRef<CameraControls>(null);
  const alphaTowerRef = useRef<THREE.Group>(null);
  const betaTowerRef = useRef<THREE.Group>(null);

  const [cam_pos] = useState(() => new THREE.Vector3(0, -10, 0));
  const [add_tower_pos] = useState(() => new THREE.Vector3(-100, 185, 0));

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

  useLayoutEffect(() => {
    if (!animation || !towerType) return;

    add_tower_pos.set(-100, 185, 0);
  }, [animation, add_tower_pos, towerType]);

  useTimeout(
    () => {
      afterUpAnimation();
    },
    5000,
    animation === 'up'
  );

  useFrame(async ({ size }) => {
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

      await controlsRef.current.setLookAt(
        -90,
        165,
        5,
        add_tower_pos.x,
        add_tower_pos.y - 2,
        add_tower_pos.z,
        false
      );
    } else {
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
  const pathname = usePathname();

  // Handle outline color
  const outlineRef = useRef<OutlineEffect | null>(null!);
  const hoveredOutlineColor = useCallback(
    (hover: boolean, color: THREE.Color) => {
      if (outlineRef.current && hover) {
        outlineRef.current.visibleEdgeColor = color;
        outlineRef.current.hiddenEdgeColor = color;
      }
    },
    []
  );

  // Handle tower object & animation
  const [towerCount, setTowerCount] = useState(data.results.length);
  const [animation, setAnimation] = useState<AnimationState>(null);

  const afterTowerCountAnimation = useCallback(() => {
    setAnimation(null);
    setTowerCount(data.results.length);
  }, [data.results.length]);

  useEffect(() => {
    const diff = data.results.length - towerCount;
    if (diff === 0) return;

    setAnimation(diff === -4 ? 'reset' : diff > 0 ? 'up' : 'down');
  }, [data, towerCount]);

  const isBlockChart =
    pathname.includes('/Keyword') ||
    pathname.includes('/Select') ||
    !!animation;

  return (
    <Suspense
      fallback={
        <Loader
          containerStyles={{ background: '#10051b' }}
          dataStyles={{ color: 'white' }}
        />
      }
    >
      <Canvas dpr={[0.5, 2]}>
        {/* Camera Control */}
        <Rig
          towerType={data.results.length % 2 ? 'odd' : 'even'}
          animation={animation}
          afterUpAnimation={afterTowerCountAnimation}
        />

        {/* Light */}
        <ambientLight intensity={1.5} />
        <hemisphereLight
          intensity={2.2}
          color='#00498C'
          groundColor='#00498C'
        />
        <Suspense fallback={null}>
          <SpotLight
            position={[50, -5, 75]}
            angle={5}
            penumbra={1}
            intensity={2}
            distance={450}
            color='#f7dac1'
            anglePower={0}
            attenuation={0}
          />
          <SpotLight
            position={[0, 15, 0]}
            angle={1}
            penumbra={1}
            intensity={10}
            distance={35}
            color='#eeeeee'
            anglePower={0}
            attenuation={0}
          />
        </Suspense>

        {/* Model */}
        <Selection>
          {/* Outline effect */}
          <EffectComposer
            multisampling={8}
            autoClear={false}
            renderPriority={1}
          >
            <Outline
              ref={outlineRef}
              visibleEdgeColor={0xffffff}
              hiddenEdgeColor={0xffffff}
              edgeStrength={50}
              width={1000}
              height={1000}
              blur
            />
          </EffectComposer>

          <DysonRings
            isBlockChart={isBlockChart}
            hoveredOutlineColor={hoveredOutlineColor}
          >
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
                parseFloat(positionX.toFixed(5)),
                0.5,
                parseFloat(positionZ.toFixed(5))
              );
              const searchWord = data.results.map(result => result.title)[
                index
              ];
              if (index % 2) {
                return (
                  <BetaTower
                    key={'BetaTower_' + index}
                    towerKeyword={searchWord}
                    isDestroy={
                      (animation === 'reset' && index !== 0) ||
                      (index === towerCount - 1 && animation === 'down')
                    }
                    afterDownAnimation={afterTowerCountAnimation}
                    isBlockChart={isBlockChart}
                    hoveredOutlineColor={hoveredOutlineColor}
                    position={position}
                  />
                );
              } else {
                return (
                  <AlphaTower
                    key={'AlphaTower_' + index}
                    towerKeyword={searchWord}
                    isDestroy={
                      (animation === 'reset' && index !== 0) ||
                      (index === towerCount - 1 && animation === 'down')
                    }
                    afterDownAnimation={afterTowerCountAnimation}
                    isBlockChart={isBlockChart}
                    hoveredOutlineColor={hoveredOutlineColor}
                    position={position}
                  />
                );
              }
            })}
          </DysonRings>
        </Selection>

        {/* Env - former */}
        <Environment background blur={1} resolution={256}>
          <Lightformer
            form={'circle'}
            intensity={0.04}
            color='#f7dac1'
            position={[10, 0, 10]}
            scale={45}
            target={[0, 0, 0]}
          />
        </Environment>

        <Suspense fallback={null}>
          <Stars
            radius={150}
            depth={50}
            count={750}
            factor={2}
            saturation={0.5}
            speed={1.5}
            fade
          />
          <Sparkles
            count={500}
            speed={0.15}
            opacity={0.5}
            size={25}
            scale={350}
          />
        </Suspense>

        {process.env.NODE_ENV === 'development' && (
          <Stats showPanel={0} className='stats left bottom' />
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
