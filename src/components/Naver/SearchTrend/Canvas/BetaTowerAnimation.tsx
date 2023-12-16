import * as THREE from 'three';
import { useEffect, forwardRef, ForwardedRef } from 'react';

import { GroupProps } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';

import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    MAT_LIGHT_1: THREE.MeshStandardMaterial;
    MAT_Metal: THREE.MeshStandardMaterial;
  };
};

/** for tower up animation */
export const BetaTowerAnimation = forwardRef(function BetaTowerAnimation(
  props: GroupProps,
  ref: ForwardedRef<THREE.Group<THREE.Object3DEventMap> | null>
) {
  const { nodes, materials, animations } = useGLTF(
    '/naver/searchTrend/beta_tower_small_draco/beta_tower.gltf'
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
              <group name='PILAR_1_0' scale={[1.76, 4.598, 1.76]}>
                <mesh
                  name='Object_4'
                  geometry={nodes.Object_4.geometry}
                  material={materials.MAT_LIGHT_1}
                />
                <mesh
                  name='Object_5'
                  geometry={nodes.Object_5.geometry}
                  material={materials.MAT_Metal}
                />
                <mesh
                  name='Object_6'
                  geometry={nodes.Object_6.geometry}
                  material={materials.MAT_Metal}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

export default BetaTowerAnimation;
