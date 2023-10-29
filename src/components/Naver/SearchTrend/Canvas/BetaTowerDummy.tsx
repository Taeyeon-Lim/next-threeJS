import * as THREE from 'three';
import { useEffect, forwardRef, ForwardedRef, useMemo } from 'react';

import { GroupProps, useGraph } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';

import { SearchTrendModelInstancesType } from '..';

/** default BetaTower dummy (for Suspense)
 * @note 원본 모델 로드 속도가 오래 걸리므로, "beta_tower_small"만 사용하기로 함
 * 만약, 모델 로드 속도의 개선으로 원본 사용 가능 시 = 이 컴포넌트를 Suspense에 사용
 */
// export default function BetaTowerDummy(props: GroupProps) {
//   const groupRef = useRef<THREE.Group>(null);

//   const { scene } = useGLTF('/naver/searchTrend/beta_tower_small.glb');
//   const { nodes, materials } = useGraph(scene);
//   const instances: SearchTrendModelInstancesType = useMemo(
//     () => ({
//       Object_4: nodes.Object_4,
//       Object_5: nodes.Object_5,
//       Object_6: nodes.Object_6,
//     }),
//     [nodes]
//   );

//   const [pos] = useState(() => new THREE.Vector3(0, 1200, 0));

//   useFrame(() => {
//     const currentGroup = groupRef.current;
//     if (!currentGroup) return;

//     currentGroup.lookAt(pos);
//   });

//   useEffect(() => {
//     const currentGroup = groupRef.current;
//     if (!currentGroup) return;

//     currentGroup.lookAt(pos);
//   }, [pos, groupRef]);

//   return (
//     <group ref={groupRef} {...props} dispose={null}>
//       <group name='Sketchfab_Scene'>
//         <group name='Sketchfab_model'>
//           <group name='root'>
//             <group name='GLTF_SceneRootNode'>
//               <group name='PILAR_1_0' scale={[1.76, 4.598, 1.76]}>
//                 <mesh
//                   name='Object_4'
//                   geometry={instances.Object_4.geometry}
//                   material={materials.MAT_LIGHT_1}
//                 />
//                 <mesh
//                   name='Object_5'
//                   geometry={instances.Object_5.geometry}
//                   material={materials.MAT_Metal}
//                 />
//                 <mesh
//                   name='Object_6'
//                   geometry={instances.Object_6.geometry}
//                   material={materials.MAT_Metal}
//                 />
//               </group>
//             </group>
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// }

/** for tower up animation */
export const BetaTowerAnimation = forwardRef(function BetaTowerAnimation(
  props: GroupProps,
  ref: ForwardedRef<THREE.Group<THREE.Object3DEventMap> | null>
) {
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
                  geometry={instances.Object_4.geometry}
                  material={materials.MAT_LIGHT_1}
                />
                <mesh
                  name='Object_5'
                  geometry={instances.Object_5.geometry}
                  material={materials.MAT_Metal}
                />
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
    </group>
  );
});

export default BetaTowerAnimation;

useGLTF.preload('/naver/searchTrend/beta_tower_small.glb');
