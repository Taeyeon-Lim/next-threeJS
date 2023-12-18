'use client';

import * as THREE from 'three';
import {
  useRef,
  useState,
  Suspense,
  Dispatch,
  useEffect,
  ReactNode,
  SetStateAction,
} from 'react';

import { Canvas, GroupProps, useFrame, useThree } from '@react-three/fiber';
import {
  Text,
  Loader,
  Sphere,
  useCursor,
  RoundedBox,
  useTexture,
  CameraControls,
  MeshPortalMaterial,
  PortalMaterialType,
  Environment,
} from '@react-three/drei';

import { damp } from 'maath/easing';
import { degToRad } from 'three/src/math/MathUtils';

import Mushroom from './Mushroom';
import Cactus from './Cactus';
import Guide from './Guide';
import Yeti from './Yeti';

export type PotalInstancesType = {
  [name: string]: THREE.Object3D<THREE.Object3DEventMap> & {
    geometry?: THREE.BufferGeometry;
    skeleton?: THREE.Skeleton;
  };
};

export const CONVERT_POTAL_ACTIONS: {
  [key: string]: string;
} = {
  Death: '죽음 (Death)',
  Duck: '머리 숙이기 (Duck)',
  HitReact: '맞는 반응 (HitReact)',
  Idle: '평범 (Idle)',
  Jump: '제자리 뛰기 (Jump)',
  Jump_Idle: '활공 (Jump_Idle)',
  Jump_Land: '착지 (Jump_Land)',
  No: '부정 (No)',
  Punch: '펀치 (Punch)',
  Run: '달리기 (Run)',
  Walk: '걷기 (Walk)',
  Wave: '인사 (Wave)',
  Weapon: '공격 (Weapon)',
  Yes: '긍정 (Yes)',
};

const Rig = ({ activeWorldName }: { activeWorldName: string }) => {
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree(state => state.scene);
  const [newPosition] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls.mouseButtons.right = 8; // click = none

    if (activeWorldName === '') {
      controls.setLookAt(0, 0, 5, 0, 0, 0, true);
    } else {
      scene.getObjectByName(activeWorldName)?.getWorldPosition(newPosition);

      controls.setLookAt(
        0,
        0,
        5,
        newPosition.x,
        newPosition.y,
        newPosition.z,
        true
      );
    }
  }, [scene, activeWorldName, newPosition]);

  return (
    <CameraControls
      makeDefault
      ref={controlsRef}
      minDistance={5}
      maxDistance={5}
    />
  );
};

const Stage = ({
  texture,
  name,
  nameColor,
  activeWorldName,
  setActiveWorldName,
  sethovered,
  children,
  props,
}: {
  texture: string;
  name: string;
  nameColor: string;
  activeWorldName: string;
  setActiveWorldName: Dispatch<SetStateAction<string>>;
  sethovered: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
  props?: GroupProps;
}) => {
  const [eng, kor] = name.split(',');
  const potalMaterialRef = useRef<PortalMaterialType>(null!);

  const map = useTexture(texture);

  useFrame((_state, delta) => {
    if (!potalMaterialRef.current) return;

    const isOpenWorld =
      activeWorldName === name &&
      (activeWorldName === name || activeWorldName === '');

    damp(potalMaterialRef.current, 'blend', isOpenWorld ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font={'fonts/NanumGothic-Regular.woff'}
        fontSize={0.3}
        letterSpacing={-0.05}
        position={[0, 2.125, 0.051]}
        anchorX={'center'}
        anchorY={'top'}
      >
        {kor}
        <meshBasicMaterial
          color={nameColor}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </Text>

      <Text
        font={'fonts/NanumGothic-Regular.woff'}
        fontSize={0.2}
        letterSpacing={-0.05}
        position={[0, 1.775, 0.051]}
        anchorX={'center'}
        anchorY={'top'}
      >
        - {eng} -
        <meshBasicMaterial
          color={nameColor}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </Text>

      <RoundedBox
        name={name}
        args={[2, 3, 0.1]} // Width, height, depth
        onDoubleClick={e => (
          e.stopPropagation(),
          setActiveWorldName(
            activeWorldName === name ||
              (activeWorldName !== name && activeWorldName !== '')
              ? ''
              : name
          )
        )}
        onPointerOver={e => {
          if (activeWorldName === '' || activeWorldName === name) {
            e.stopPropagation(), sethovered(name);
          }
        }}
        onPointerOut={e => {
          if (activeWorldName === '' || activeWorldName === name) {
            e.stopPropagation(), sethovered('');
          }
        }}
      >
        <MeshPortalMaterial ref={potalMaterialRef} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <spotLight
            angle={1.5}
            intensity={1}
            position={[0, 3, 3]}
            castShadow={false}
            dispose={null}
          />

          {children}

          <Environment background resolution={2048}>
            <Sphere args={[5, 64, 32]}>
              <meshBasicMaterial map={map} side={THREE.BackSide} />
            </Sphere>
          </Environment>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

function Potal() {
  const [activeWorldName, setActiveWorldName] = useState('');
  const [hovered, sethovered] = useState('');

  useCursor(
    hovered === 'Mushroom,머쉬룸' ||
      hovered === 'Cactus,칵투스' ||
      hovered === 'Yeti,예티'
  );

  return (
    <Suspense
      fallback={
        <Loader
          containerStyles={{ background: 'whiteSmoke' }}
          dataStyles={{ color: 'purple' }}
        />
      }
    >
      <Canvas shadows dpr={[1, 2]}>
        <ambientLight intensity={0.5} />

        <Rig activeWorldName={activeWorldName} />

        <Stage
          texture={'/potal/texture_blueSky.jpg'}
          name={'Mushroom,머쉬룸'}
          nameColor='#899cdd'
          props={{
            position: [-2.5, 0, 0.5],
            rotation: [0, degToRad(30), 0],
          }}
          activeWorldName={activeWorldName}
          setActiveWorldName={setActiveWorldName}
          sethovered={sethovered}
        >
          <Suspense fallback={null}>
            <Mushroom
              name={'Mushroom,머쉬룸'}
              activeWorldName={activeWorldName}
              hovered={hovered}
              sethovered={sethovered}
              scale={0.6}
              position={[0, -1.25, 0]}
            />
          </Suspense>
        </Stage>

        <Stage
          texture={'/potal/texture_cactus.jpg'}
          name={'Cactus,칵투스'}
          nameColor='#8fb258'
          props={{
            position: [0, 0, 0],
          }}
          activeWorldName={activeWorldName}
          setActiveWorldName={setActiveWorldName}
          sethovered={sethovered}
        >
          <Suspense fallback={null}>
            <Cactus
              name={'Cactus,칵투스'}
              activeWorldName={activeWorldName}
              hovered={hovered}
              sethovered={sethovered}
              scale={0.6}
              position={[0, -1.25, 0]}
            />
          </Suspense>
        </Stage>

        <Stage
          texture={'/potal/texture_bigMushroom.jpg'}
          name={'Yeti,예티'}
          nameColor='#6fb9d7'
          props={{
            position: [2.5, 0, 0.5],
            rotation: [0, degToRad(-30), 0],
          }}
          activeWorldName={activeWorldName}
          setActiveWorldName={setActiveWorldName}
          sethovered={sethovered}
        >
          <Suspense fallback={null}>
            <Yeti
              name={'Yeti,예티'}
              activeWorldName={activeWorldName}
              hovered={hovered}
              sethovered={sethovered}
              scale={0.6}
              position={[0, -1.25, 0]}
            />
          </Suspense>
        </Stage>
      </Canvas>

      <Suspense fallback={null}>
        <Guide hovered={hovered} activeWorldName={activeWorldName} />
      </Suspense>
    </Suspense>
  );
}

export default Potal;
