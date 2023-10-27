import * as THREE from 'three';
import {
  useState,
  useEffect,
  useMemo,
  useRef,
  Suspense,
  startTransition,
} from 'react';

import { useGLTF, useAnimations, useCursor, Outlines } from '@react-three/drei';
import { GroupProps, useFrame, useGraph } from '@react-three/fiber';
import { useTimeout, useUpdateSearchParams } from '@utils/hookUtils';

import TowerName from './TowerName';

import { SearchTrendModelInstancesType } from '..';

export default function AlphaTower({
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

  const { scene, animations } = useGLTF('/naver/searchTrend/alpha_tower.glb');
  const { nodes, materials } = useGraph(scene);
  const instances: SearchTrendModelInstancesType = useMemo(
    () => ({
      Object_4: nodes.Object_4,
      Object_5: nodes.Object_5,
    }),
    [nodes]
  );

  const { actions } = useAnimations(animations, group);
  const [lookAtPos] = useState(() => new THREE.Vector3(0, 1200, 0));

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
  useCursor(hovered);

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
      onPointerOut={e => {
        startTransition(() => setHovered(false));
      }}
      onClick={e => {
        e.stopPropagation();

        if (towerKeyword) updateSearchParam('view', towerKeyword);
      }}
      dispose={null}
    >
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model'>
          <group name='root'>
            <group name='GLTF_SceneRootNode'>
              <group name='PILLAR_ALPHA_0' scale={[-1.166, -6.301, -1.166]}>
                <mesh
                  name='Object_4'
                  geometry={instances.Object_4.geometry}
                  material={materials.MAT_LIGHT_2}
                />

                <mesh
                  name='Object_5'
                  geometry={instances.Object_5.geometry}
                  material={materials.MAT_Metal_2}
                >
                  <Outlines
                    thickness={0.01}
                    opacity={hovered ? 1 : 0}
                    angle={0}
                    color='#a4d3d8'
                    screenspace={false}
                    transparent
                  />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      <Suspense fallback={null}>
        <TowerName
          towerType='alpha'
          towerKeyword={towerKeyword || 'Loading...'}
          position={[0, 0, 3]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          visible={hovered}
        />
      </Suspense>
    </group>
  );
}
