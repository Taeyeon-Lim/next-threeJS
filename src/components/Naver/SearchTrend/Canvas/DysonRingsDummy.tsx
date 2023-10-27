import React, { useMemo } from 'react';

import { GroupProps, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { SearchTrendModelInstancesType } from '..';

export default function DysonRingsDummy(props: GroupProps) {
  const { scene } = useGLTF('/naver/searchTrend/dyson_rings_small.glb');
  const { nodes, materials } = useGraph(scene);
  const instances: SearchTrendModelInstancesType = useMemo(
    () => ({
      Object_6: nodes.Object_6,
      Object_8: nodes.Object_8,
      Object_10: nodes.Object_10,
      Object_12: nodes.Object_12,
      Object_14: nodes.Object_14,
      Object_16: nodes.Object_16,
    }),
    [nodes]
  );

  return (
    <group {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='GIRO-ANTIHORARIO_0' scale={1.235} />
              <group name='GIRO-HORARIO_1' rotation={[0, 0.016, 0]} />
              <group name='RING-OUT-1_2' rotation={[0, -0.016, 0]}>
                <mesh
                  name='Object_6'
                  geometry={instances.Object_6.geometry}
                  material={materials.MAT_METAL_1}
                />
              </group>
              <group name='RING-OUT-2_3' rotation={[0, 0.016, 0]}>
                <mesh
                  name='Object_8'
                  geometry={instances.Object_8.geometry}
                  material={materials.MAT_LIGHT_1}
                />
              </group>
              <group
                name='RING-MID-1_4'
                rotation={[-Math.PI / 6, 0, 0]}
                scale={[5.88, 2.2, 5.88]}
              >
                <mesh
                  name='Object_10'
                  geometry={instances.Object_10.geometry}
                  material={materials.MAT_METAL_1}
                />
              </group>
              <group
                name='RING-MID-2_5'
                rotation={[2.618, 1.477, -Math.PI]}
                scale={[5.88, 2.2, 5.88]}
              >
                <mesh
                  name='Object_12'
                  geometry={instances.Object_12.geometry}
                  material={materials.MAT_LIGHT_2}
                />
              </group>
              <group
                name='RING-IN-1_6'
                rotation={[0.059, 0.678, 0.631]}
                scale={[2.967, 1.85, 2.967]}
              >
                <mesh
                  name='Object_14'
                  geometry={instances.Object_14.geometry}
                  material={materials.MAT_METAL_1}
                />
              </group>
              <group
                name='RING-IN-2_7'
                rotation={[-0.553, 1.031, 1.106]}
                scale={[2.967, 1.85, 2.967]}
              >
                <mesh
                  name='Object_16'
                  geometry={instances.Object_16.geometry}
                  material={materials.MAT_LIGHT_3}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/naver/searchTrend/dyson_rings_small.glb');
