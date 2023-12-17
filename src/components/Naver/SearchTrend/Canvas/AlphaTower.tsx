import { Vector3, Color, Group } from 'three';
import { useState, useEffect, useRef, Suspense, startTransition } from 'react';

import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, useCursor } from '@react-three/drei';

import { Select } from '@react-three/postprocessing';
import { useTimeout, useUpdateSearchParams } from '@utils/hookUtils';

import TowerName from './TowerName';

import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
  };
  materials: {
    MAT_LIGHT_2: THREE.MeshStandardMaterial;
    MAT_Metal_2: THREE.MeshStandardMaterial;
  };
};

export default function AlphaTower({
  towerKeyword,
  isDestroy,
  afterDownAnimation,
  isBlockChart,
  hoveredOutlineColor,
  position,
  ...props
}: {
  towerKeyword?: string;
  isDestroy: boolean;
  afterDownAnimation: () => void;
  isBlockChart: boolean;
  hoveredOutlineColor: (hover: boolean, color: Color) => void;
  position: Vector3;
} & GroupProps) {
  const [outlineColor] = useState(() => new Color(0x8393eb));
  const [lookAtPos] = useState(() => new Vector3(0, 1200, 0));
  const group = useRef<Group>(null);

  const { updateSearchParam } = useUpdateSearchParams(null, 'push');

  const { nodes, materials, animations } = useGLTF(
    '/naver/searchTrend/alpha_tower_small_draco/alpha_tower.gltf'
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const currentGroup = group.current;
    if (!currentGroup || isDestroy) return;

    if (!actions || !actions['Rotation']) return;
    actions['Rotation'].reset().fadeIn(0.5).play();

    return () => {
      actions['Rotation']?.fadeOut(0.5);
    };
  }, [actions, isDestroy]);

  const deviceWidth = useThree(state => state.size.width);

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

      hoveredOutlineColor(hovered, outlineColor);
    }
  });

  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !isDestroy);

  return (
    <Select enabled={hovered && !isDestroy && !isBlockChart}>
      <group
        {...props}
        ref={group}
        position={position}
        onPointerOver={e => {
          e.stopPropagation();

          startTransition(() => setHovered(true));
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        onClick={e => {
          e.stopPropagation();
          if (isDestroy || isBlockChart) return;

          if (towerKeyword) updateSearchParam('view', towerKeyword);
        }}
        scale={deviceWidth < 500 ? 1.6 : 1}
        dispose={null}
      >
        <group name='Sketchfab_Scene'>
          <group name='Sketchfab_model'>
            <group name='root'>
              <group name='GLTF_SceneRootNode'>
                <group name='PILLAR_ALPHA_0' scale={[-1.166, -6.301, -1.166]}>
                  <mesh
                    name='Object_4'
                    geometry={nodes.Object_4.geometry}
                    material={materials.MAT_LIGHT_2}
                  />

                  <mesh
                    name='Object_5'
                    geometry={nodes.Object_5.geometry}
                    material={materials.MAT_Metal_2}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>

        <Suspense fallback={null}>
          <TowerName
            towerType='alpha'
            towerKeyword={
              isBlockChart ? '조정 중..' : towerKeyword || 'Loading...'
            }
            position={[0, 0, 3]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
            visible={hovered && !isDestroy}
          />
        </Suspense>
      </group>
    </Select>
  );
}
