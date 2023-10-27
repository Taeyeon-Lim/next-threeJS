import { Group } from 'three';
import {
  useState,
  useEffect,
  useMemo,
  useRef,
  startTransition,
  Suspense,
  PropsWithChildren,
} from 'react';

import { GroupProps, useFrame, useGraph, useThree } from '@react-three/fiber';
import {
  Text,
  useGLTF,
  useAnimations,
  Outlines,
  useCursor,
} from '@react-three/drei';
import { useUpdateSearchParams } from '@utils/hookUtils';

import { SearchTrendModelInstancesType } from '..';

const ROTATION_SPEED = 0.5;

export default function DysonRings({
  children,
  ...props
}: PropsWithChildren<GroupProps>) {
  const group = useRef<Group>(null);

  const { scene, animations } = useGLTF('/naver/searchTrend/dyson_rings.glb');
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

  const { actions } = useAnimations(animations, group);
  const deviceWidth = useThree(state => state.size.width);

  useFrame(({ clock }) => {
    const currentGroup = group.current;
    if (!currentGroup || !actions || !actions['Animation']) return;

    const t = clock.getElapsedTime() * ROTATION_SPEED;

    currentGroup.rotation.set(0, -t, 0);
  });

  useEffect(() => {
    const currentGroup = group.current;
    if (!currentGroup || !actions || !actions['Animation']) return;

    actions['Animation'].reset().fadeIn(0.5).play();

    return () => {
      actions['Animation']?.fadeOut(0.5);
    };
  }, [actions]);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { updateSearchParam } = useUpdateSearchParams(null, 'push');

  return (
    <>
      <Suspense fallback={null}>
        <Text
          font={'/fonts/NanumGothic-Regular.woff'}
          color='#ffd800'
          anchorX='center'
          anchorY='middle'
          fontSize={deviceWidth < 500 ? 4 : 2}
          position={deviceWidth < 500 ? [0, 12, 0] : [0, 7.5, 0]}
          visible={hovered}
        >
          종합 트렌드
        </Text>
      </Suspense>

      {/* 회전 그룹 */}
      <group {...props} ref={group} dispose={null}>
        {/* DysonRings */}
        <group
          name='Sketchfab_Scene'
          onPointerOver={e => {
            e.stopPropagation();

            startTransition(() => setHovered(true));
          }}
          onPointerOut={() => {
            startTransition(() => setHovered(false));
          }}
          onClick={e => (e.stopPropagation(), updateSearchParam('view', 'all'))}
        >
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
                  >
                    <Outlines
                      thickness={0.15}
                      opacity={hovered ? 1 : 0}
                      angle={Math.PI}
                      color='#978000'
                      screenspace={false}
                      transparent
                    />
                  </mesh>
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
                  >
                    <Outlines
                      thickness={0.02}
                      opacity={hovered ? 1 : 0}
                      angle={Math.PI}
                      color='#978000'
                      screenspace={false}
                      transparent
                    />
                  </mesh>
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
                  >
                    <Outlines
                      thickness={0.05}
                      opacity={hovered ? 1 : 0}
                      angle={Math.PI}
                      color='#978000'
                      screenspace={false}
                      transparent
                    />
                  </mesh>
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

        {/* tower children */}
        {children}
      </group>
    </>
  );
}