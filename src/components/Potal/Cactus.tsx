import * as THREE from 'three';
import {
  useRef,
  useMemo,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { ThreeElements, useGraph } from '@react-three/fiber';
import { Text, useAnimations, useGLTF } from '@react-three/drei';

import { CONVERT_POTAL_ACTIONS, PotalInstancesType } from '.';

export default function Cactus({
  name,
  hovered,
  activeWorldName,
  sethovered,
  ...props
}: {
  name: string;
  hovered: string;
  activeWorldName: string;
  sethovered: Dispatch<SetStateAction<string>>;
} & ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF('/potal/Cactoro.gltf');

  const { nodes, materials } = useGraph(scene);
  const instances: PotalInstancesType = useMemo(
    () => ({
      Root: nodes.Root,
      Scene: nodes.Scene,
      Cactoro: nodes.Cactoro,
      CharacterArmature: nodes.CharacterArmature,
      Cube120: nodes.Cube120,
      Cube120_1: nodes.Cube120_1,
      Cube120_2: nodes.Cube120_2,
      Cube120_3: nodes.Cube120_3,
      Cube120_4: nodes.Cube120_4,
      Cube120_5: nodes.Cube120_5,
    }),
    [nodes]
  );

  // animation
  const [index, setIndex] = useState(3);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (activeWorldName === '') setIndex(() => 3);

    if (activeWorldName === '' && hovered === name) {
      if (!actions['Walk']) return;
      actions['Walk'].reset().fadeIn(0.5)?.play();

      return () => {
        if (!!actions['Walk']) actions['Walk']?.fadeOut(0.5);
      };
    }

    const currentName = names[index];

    if (!actions[currentName]) return;

    if (!!actions[currentName]) {
      actions[currentName]?.reset().fadeIn(0.5)?.play();
    }

    return () => {
      if (!!actions[currentName]) actions[currentName]?.fadeOut(0.5);
    };
  }, [index, actions, names, hovered, activeWorldName, name]);

  return (
    <>
      {activeWorldName === name && (
        <>
          <Text
            font={'fonts/NanumGothic-Regular.woff'}
            fontSize={0.3}
            letterSpacing={-0.05}
            position={[0, 2.125, 0.051]}
            anchorX={'center'}
            anchorY={'top'}
          >
            칵투스
            <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
          </Text>

          <Text
            font={'fonts/NanumGothic-Regular.woff'}
            fontSize={0.2}
            letterSpacing={-0.05}
            position={[0, 1.775, 0.051]}
            anchorX={'center'}
            anchorY={'top'}
          >
            - Cactus -
            <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
          </Text>

          <Text
            font={'fonts/NanumGothic-Regular.woff'}
            fontSize={0.2}
            letterSpacing={-0.05}
            position={[0, 1.4, 0.051]}
            anchorX={'center'}
            anchorY={'top'}
          >
            {!!names[index]
              ? CONVERT_POTAL_ACTIONS[names[index]]
              : '알 수 없는 행동'}
            <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
          </Text>
        </>
      )}

      <group ref={groupRef} {...props} dispose={null}>
        <group name='Scene'>
          <group name='CharacterArmature'>
            <primitive object={instances.Scene} />

            <group
              name='Cactoro'
              onClick={e => {
                if (activeWorldName === name) {
                  e.stopPropagation();
                  setIndex((index + 1) % names.length);
                }
              }}
            >
              <skinnedMesh
                name='Cube120'
                geometry={instances.Cube120.geometry}
                material={materials.Cactoro_Main}
                skeleton={instances.Cube120.skeleton}
              />
              <skinnedMesh
                name='Cube120_1'
                geometry={instances.Cube120_1.geometry}
                material={materials.Cactoro_Secondary}
                skeleton={instances.Cube120_1.skeleton}
              />
              <skinnedMesh
                name='Cube120_2'
                geometry={instances.Cube120_2.geometry}
                material={materials.Cactoro_Red}
                skeleton={instances.Cube120_2.skeleton}
              />
              <skinnedMesh
                name='Cube120_3'
                geometry={instances.Cube120_3.geometry}
                material={materials.Eye_Black}
                skeleton={instances.Cube120_3.skeleton}
              />
              <skinnedMesh
                name='Cube120_4'
                geometry={instances.Cube120_4.geometry}
                material={materials.Eye_White}
                skeleton={instances.Cube120_4.skeleton}
              />
              <skinnedMesh
                name='Cube120_5'
                geometry={instances.Cube120_5.geometry}
                material={materials['Cactoro_Main.001']}
                skeleton={instances.Cube120_5.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/potal/Cactoro.gltf');
