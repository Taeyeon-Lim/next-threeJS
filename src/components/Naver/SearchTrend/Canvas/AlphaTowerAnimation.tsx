import * as THREE from 'three';
import { useEffect, forwardRef, ForwardedRef } from 'react';

import { GroupProps } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';

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

/** for tower up animation */
const AlphaTowerAnimation = forwardRef(function AlphaTowerAnimation(
  props: GroupProps,
  ref: ForwardedRef<THREE.Group<THREE.Object3DEventMap> | null>
) {
  const { nodes, materials, animations } = useGLTF(
    '/naver/searchTrend/alpha_tower_small_draco/alpha_tower.gltf'
  ) as GLTFResult;

  const { actions } = useAnimations(
    animations,
    ref && typeof ref !== 'function' ? ref : undefined
  );

  useEffect(() => {
    if (!actions || !actions['Rotation']) return;

    actions['Rotation'].reset().fadeIn(0.5).play();

    return () => {
      actions['Rotation']?.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group ref={ref} {...props} dispose={null}>
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
    </group>
  );
});

export default AlphaTowerAnimation;
