import { Group } from 'three';
import { useEffect, useRef } from 'react';

import { GroupProps } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    Object_6: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_14: THREE.Mesh;
  };
  materials: {
    MAT_METAL_1: THREE.MeshStandardMaterial;
    MAT_LIGHT_1: THREE.MeshStandardMaterial;
    MAT_LIGHT_2: THREE.MeshStandardMaterial;
    MAT_LIGHT_3: THREE.MeshStandardMaterial;
  };
};

function DysonRingsThumbnail(groupProps: GroupProps) {
  const group = useRef<Group>(null);

  const { nodes, materials, animations } = useGLTF(
    '/naver/searchTrend/dyson_rings_small_draco/dyson_rings_small.gltf'
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const currentGroup = group.current;
    if (!currentGroup || !actions || !actions['Animation']) return;

    actions['Animation'].reset().fadeIn(0.5).play();

    return () => {
      actions['Animation']?.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group {...groupProps} ref={group} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='GIRO-ANTIHORARIO_0' scale={1.235} />

              <group name='GIRO-HORARIO_1' rotation={[0, 0.016, 0]} />

              <group name='RING-OUT-1_2' rotation={[0, -0.016, 0]}>
                <mesh
                  name='Object_6'
                  geometry={nodes.Object_6.geometry}
                  material={materials.MAT_METAL_1}
                />
              </group>

              <group name='RING-OUT-2_3' rotation={[0, 0.016, 0]}>
                <mesh
                  name='Object_8'
                  geometry={nodes.Object_8.geometry}
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
                  geometry={nodes.Object_10.geometry}
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
                  geometry={nodes.Object_12.geometry}
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
                  geometry={nodes.Object_14.geometry}
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
                  geometry={nodes.Object_16.geometry}
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

export default DysonRingsThumbnail;
