import * as THREE from 'three';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
  startTransition,
} from 'react';

import { useGLTF, useAnimations, useCursor, Outlines } from '@react-three/drei';
import { GroupProps, useFrame, useGraph } from '@react-three/fiber';

import { useTimeout, useUpdateSearchParams } from '@utils/hookUtils';

import TowerName from './TowerName';

import { SearchTrendModelInstancesType } from '..';

export default function BetaTower({
  towerKeyword,
  isDestroy,
  afterDownAnimation,
  position,
  ...props
}: {
  towerKeyword?: string;
  isDestroy: boolean;
  afterDownAnimation: () => void;
  position: THREE.Vector3;
} & GroupProps) {
  const group = useRef<THREE.Group>(null);
  const [lookAtPos] = useState(() => new THREE.Vector3(0, 1200, 0));

  // issue: performance slow
  // const { scene, animations } = useGLTF('/naver/searchTrend/beta_tower.glb');
  const { scene, animations } = useGLTF(
    '/naver/searchTrend/beta_tower_small.glb'
  );
  const { nodes, materials } = useGraph(scene);
  const instances: SearchTrendModelInstancesType = useMemo(
    () => ({
      Object_4: nodes.Object_4,
      Object_5: nodes.Object_5,
      Object_6: nodes.Object_6,
    }),
    [nodes]
  );

  const { actions } = useAnimations(animations, group);

  useTimeout(
    () => {
      if (group?.current) group.current.visible = false;

      afterDownAnimation();
    },
    5000,
    isDestroy
  );

  useFrame((_, delta) => {
    const currentGroup = group.current;
    if (!currentGroup) return;

    if (isDestroy) {
      // tower down animation

      currentGroup.position.lerp(
        position.setY(position.y - delta - 0.075),
        0.05
      );
      currentGroup.rotation.x -= delta / 4;
    } else {
      currentGroup.lookAt(lookAtPos);
    }
  });

  useEffect(() => {
    const currentGroup = group.current;
    if (!currentGroup || isDestroy) return;

    if (!actions || !actions['Rotation']) return;
    actions['Rotation'].reset().fadeIn(0.5).play();

    return () => {
      actions['Rotation']?.fadeOut(0.5);
    };
  }, [actions, isDestroy]);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !isDestroy);

  const { updateSearchParam } = useUpdateSearchParams(null, 'push');

  return (
    <group
      {...props}
      ref={group}
      position={position}
      onPointerOver={e => {
        e.stopPropagation();

        startTransition(() => setHovered(true));
      }}
      onPointerOut={() => {
        startTransition(() => setHovered(false));
      }}
      onClick={e => {
        e.stopPropagation();

        if (isDestroy) return;
        if (towerKeyword) updateSearchParam('view', towerKeyword);
      }}
      dispose={null}
    >
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model'>
          <group name='root'>
            <group name='GLTF_SceneRootNode'>
              <group name='PILAR_1_0' scale={[1.76, 4.598, 1.76]}>
                <mesh
                  name='Object_4'
                  geometry={instances.Object_4.geometry}
                  material={materials.MAT_LIGHT_1}
                />

                <mesh
                  name='Object_5'
                  geometry={instances.Object_5.geometry}
                  material={materials.MAT_Metal}
                >
                  {/* <Outlines
                    thickness={0.01}
                    opacity={hovered && !isDestroy ? 1 : 0}
                    angle={0}
                    color='#ff9f7c'
                    screenspace={false}
                    transparent
                  /> */}
                </mesh>

                <mesh
                  name='Object_6'
                  geometry={instances.Object_6.geometry}
                  material={materials.MAT_Metal}
                />
              </group>
            </group>
          </group>
        </group>
      </group>

      <Suspense fallback={null}>
        <TowerName
          towerType='beta'
          towerKeyword={towerKeyword || 'Loading...'}
          position={[0, 0, 4.5]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          visible={hovered && !isDestroy}
        />
      </Suspense>
    </group>
  );
}
