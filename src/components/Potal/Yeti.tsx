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

export default function Yeti({
  name,
  activeWorldName,
  hovered,
  sethovered,
  ...props
}: {
  name: string;
  hovered: string;
  activeWorldName: string;
  sethovered: Dispatch<SetStateAction<string>>;
} & ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF('/potal/Yeti.gltf');

  const { nodes, materials } = useGraph(scene);
  const instances: PotalInstancesType = useMemo(
    () => ({
      Root: nodes.Root,
      Scene: nodes.Scene,
      Yeti: nodes.Yeti,
      CharacterArmature: nodes.CharacterArmature,
      Cube059: nodes.Cube059,
      Cube059_1: nodes.Cube059_1,
      Cube059_2: nodes.Cube059_2,
      Cube059_3: nodes.Cube059_3,
      Cube059_4: nodes.Cube059_4,
      Cube059_5: nodes.Cube059_5,
    }),
    [nodes]
  );

  // animation
  const [index, setIndex] = useState(3);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (activeWorldName === '') setIndex(() => 3);

    if (activeWorldName === '' && hovered === name) {
      if (!actions['Yes']) return;
      actions['Yes'].reset().fadeIn(0.5)?.play();

      return () => {
        if (!!actions['Yes']) actions['Yes']?.fadeOut(0.5);
      };
    }

    const currentName = names[index];

    if (!actions[currentName]) return;

    if (!!actions[currentName]) {
      actions[currentName]?.reset().fadeIn(0.5).play();
    }

    return () => {
      if (!!actions[currentName]) actions[currentName]?.fadeOut(0.5);
    };
  }, [index, actions, names, activeWorldName, hovered, name]);

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
            예티
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
            - Yeti -
            <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
          </Text>

          <Text
            font={'fonts/NanumGothic-Regular.woff'}
            fontSize={0.2}
            letterSpacing={-0.05}
            position={[0, 1, 0.051]}
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

            <group
              name='Yeti'
              onClick={e => {
                if (activeWorldName === name) {
                  e.stopPropagation();
                  setIndex((index + 1) % names.length);
                }
              }}
            >
              <skinnedMesh
                name='Cube059'
                geometry={instances.Cube059.geometry}
                material={materials.Yeti_Main}
                skeleton={instances.Cube059.skeleton}
              />
              <skinnedMesh
                name='Cube059_1'
                geometry={instances.Cube059_1.geometry}
                material={materials.Yeti_Secondary}
                skeleton={instances.Cube059_1.skeleton}
              />
              <skinnedMesh
                name='Cube059_2'
                geometry={instances.Cube059_2.geometry}
                material={materials.Eye_Black}
                skeleton={instances.Cube059_2.skeleton}
              />
              <skinnedMesh
                name='Cube059_3'
                geometry={instances.Cube059_3.geometry}
                material={materials.Eye_White}
                skeleton={instances.Cube059_3.skeleton}
              />
              <skinnedMesh
                name='Cube059_4'
                geometry={instances.Cube059_4.geometry}
                material={materials.Yeti_Teeth}
                skeleton={instances.Cube059_4.skeleton}
              />
              <skinnedMesh
                name='Cube059_5'
                geometry={instances.Cube059_5.geometry}
                material={materials.Tongue}
                skeleton={instances.Cube059_5.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/potal/Yeti.gltf');
