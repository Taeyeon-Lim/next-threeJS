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

export default function Mushroom({
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

  const { scene, animations } = useGLTF('/potal/MushroomKing.gltf');

  const { nodes, materials } = useGraph(scene);
  const instances: PotalInstancesType = useMemo(
    () => ({
      Root: nodes.Root,
      Scene: nodes.Scene,
      Mushroom: nodes.Mushroom,
      CharacterArmature: nodes.CharacterArmature,
      Cube056: nodes.Cube056,
      Cube056_1: nodes.Cube056_1,
      Cube047: nodes.Cube047,
      Cube047_1: nodes.Cube047_1,
      Cube047_2: nodes.Cube047_2,
      Cube047_3: nodes.Cube047_3,
      Cube047_4: nodes.Cube047_4,
    }),
    [nodes]
  );

  // animation
  const [index, setIndex] = useState(3);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (activeWorldName === '') setIndex(() => 3);

    if (activeWorldName === '' && hovered === name) {
      if (!actions['Wave']) return;
      actions['Wave'].reset().fadeIn(0.5)?.play();

      return () => {
        if (!!actions['Wave']) actions['Wave']?.fadeOut(0.5);
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
            머쉬룸
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
            - Mushroom -
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
          <group
            name='CharacterArmature'
            onClick={e => {
              if (activeWorldName === name) {
                e.stopPropagation(), setIndex((index + 1) % names.length);
              }
            }}
            onPointerOver={e => {
              if (activeWorldName === name) {
                e.stopPropagation(), sethovered(name);
              }
            }}
            onPointerOut={e => {
              if (activeWorldName === name) {
                e.stopPropagation(), sethovered('');
              }
            }}
          >
            <primitive object={instances.Scene} />

            <group name='Mushroom'>
              <skinnedMesh
                name='Cube056'
                geometry={instances.Cube056.geometry}
                material={materials.MushroomKing_Secondary}
                skeleton={instances.Cube056.skeleton}
              />
              <skinnedMesh
                name='Cube056_1'
                geometry={instances.Cube056_1.geometry}
                material={materials.MushroomKing_Main}
                skeleton={instances.Cube056_1.skeleton}
              />
            </group>

            <group name='MushroomKing'>
              <skinnedMesh
                name='Cube047'
                geometry={instances.Cube047.geometry}
                material={materials.MushroomKing_Main}
                skeleton={instances.Cube047.skeleton}
              />
              <skinnedMesh
                name='Cube047_1'
                geometry={instances.Cube047_1.geometry}
                material={materials.MushroomKing_Secondary}
                skeleton={instances.Cube047_1.skeleton}
              />
              <skinnedMesh
                name='Cube047_2'
                geometry={instances.Cube047_2.geometry}
                material={materials.Orc_Main}
                skeleton={instances.Cube047_2.skeleton}
              />
              <skinnedMesh
                name='Cube047_3'
                geometry={instances.Cube047_3.geometry}
                material={materials.Eye_Black}
                skeleton={instances.Cube047_3.skeleton}
              />
              <skinnedMesh
                name='Cube047_4'
                geometry={instances.Cube047_4.geometry}
                material={materials.Eye_White}
                skeleton={instances.Cube047_4.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/potal/MushroomKing.gltf');
