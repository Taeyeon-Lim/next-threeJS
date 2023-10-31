import React, { useMemo } from 'react';

import { useGLTF } from '@react-three/drei';
import { ThreeElements, useGraph } from '@react-three/fiber';

import {
  ScreenBox,
  ScreenCustomModel,
  ScreenImage,
  ScreenText,
} from './Screen';
import DysonRingsDummy from '@components/Naver/SearchTrend/Canvas/DysonRingsDummy';

export type TelevisionInstancesType = {
  [name: string]: THREE.Object3D<THREE.Object3DEventMap> & {
    geometry?: THREE.BufferGeometry;
  };
};

export default function Televisions(props: ThreeElements['group']) {
  const { scene } = useGLTF('/home/computers.glb');
  const { nodes, materials } = useGraph(scene);
  const instances: TelevisionInstancesType = useMemo(
    () => ({
      ...nodes,
    }),
    [nodes]
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={instances.Object_4.geometry}
        material={materials.Texture}
        position={[0.165, 0.794, -1.972]}
        rotation={[-0.544, 0.929, -1.119]}
        scale={0.5}
      />
      <mesh
        castShadow
        geometry={instances.Object_6.geometry}
        material={materials.Texture}
        position={[-2.793, 0.27, 1.816]}
        rotation={[-1.44, 1.219, 1.432]}
        scale={0.5}
      />
      <mesh
        castShadow
        geometry={instances.Object_8.geometry}
        material={materials.Texture}
        position={[-5.603, 4.615, -0.027]}
        rotation={[-1.955, 0.163, 1.202]}
        scale={0.5}
      />
      <mesh
        castShadow
        geometry={instances.Object_10.geometry}
        material={materials.Texture}
        position={[2.621, 1.985, -2.473]}
        rotation={[-0.419, -0.704, -1.851]}
        scale={0.5}
      />
      <mesh
        castShadow
        geometry={instances.Object_12.geometry}
        material={materials.Texture}
        position={[4.598, 3.459, 1.19]}
        rotation={[-1.236, -0.719, 0.48]}
        scale={0.5}
      />
      <mesh
        castShadow
        geometry={instances.Object_16.geometry}
        material={materials.Texture}
        position={[0.63, 0, -3]}
        rotation={[0, 0.17, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_20.geometry}
        material={materials.Texture}
        position={[-2.36, 0.32, -2.018]}
        rotation={[0, 0.534, -Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_24.geometry}
        material={materials.Texture}
        position={[-2.424, 0.938, -2.247]}
        rotation={[0, 0.136, Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_32.geometry}
        material={materials.Texture}
        position={[-3.528, 0, 0.586]}
        rotation={[Math.PI, -1.085, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_36.geometry}
        material={materials.Texture}
        position={[-3.528, 1.528, 0.586]}
        rotation={[0, 0.911, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_40.geometry}
        material={materials.Texture}
        position={[3.423, 0, 0.005]}
        rotation={[-Math.PI, 1.127, -Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_48.geometry}
        material={materials.Texture}
        position={[4.086, 2.183, 2.41]}
        rotation={[0, -1.548, 1.571]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_52.geometry}
        material={materials.Texture}
        position={[4.314, 1.565, 2.343]}
        rotation={[0, -1.149, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_58.geometry}
        material={materials.Texture}
        position={[-3.79, 0, 1.656]}
        rotation={[Math.PI, -1.393, 0]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_60.geometry}
        material={materials.Texture}
        position={[-3.79, 1.528, 1.656]}
        rotation={[0, 1.218, -Math.PI]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_62.geometry}
        material={materials.Texture}
        position={[-3.693, 0, 2.585]}
        rotation={[0, -1.568, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_64.geometry}
        material={materials.Texture}
        position={[-5.36, 2.183, 0.811]}
        rotation={[0, 0.772, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_68.geometry}
        material={materials.Texture}
        position={[-5.564, 1.565, 0.69]}
        rotation={[0, 1.171, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_72.geometry}
        material={materials.Texture}
        position={[-5.474, 2.794, 0.745]}
        rotation={[Math.PI, -1.155, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_76.geometry}
        material={materials.Texture}
        position={[-5.289, 3.412, 0.894]}
        rotation={[Math.PI, -0.757, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_80.geometry}
        material={materials.Texture}
        position={[-5.283, 0, -2.328]}
        rotation={[0, 0.755, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_84.geometry}
        material={materials.Texture}
        position={[-5.486, 0, -1.385]}
        rotation={[Math.PI, -0.985, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_88.geometry}
        material={materials.Texture}
        position={[-3.012, 0, -3.79]}
        rotation={[0, 0.597, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_92.geometry}
        material={materials.Texture}
        position={[-2.082, 0, -4.324]}
        rotation={[Math.PI, -0.597, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_94.geometry}
        material={materials.Texture}
        position={[-1.016, 0, -4.489]}
        rotation={[0, 0.308, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_98.geometry}
        material={materials.Texture}
        position={[-5.315, 1.833, -1.412]}
        rotation={[0, 1.062, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_100.geometry}
        material={materials.Texture}
        position={[-4.181, 1.833, -3.064]}
        rotation={[-Math.PI, -0.465, -Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_102.geometry}
        material={materials.Texture}
        position={[-1.758, 1.833, -3.605]}
        rotation={[0, -1.165, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_104.geometry}
        material={materials.Texture}
        position={[-0.254, 1.833, -5.542]}
        rotation={[0, 1.553, 1.571]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_108.geometry}
        material={materials.Texture}
        position={[-5.283, 2.143, -2.328]}
        rotation={[Math.PI, -0.755, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_112.geometry}
        material={materials.Texture}
        position={[-5.486, 2.143, -1.385]}
        rotation={[0, 0.985, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_116.geometry}
        material={materials.Texture}
        position={[-3.012, 2.143, -3.79]}
        rotation={[Math.PI, -0.597, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_120.geometry}
        material={materials.Texture}
        position={[-2.082, 2.143, -4.324]}
        rotation={[0, 0.597, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_122.geometry}
        material={materials.Texture}
        position={[-1.016, 2.143, -4.489]}
        rotation={[Math.PI, -0.308, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_126.geometry}
        material={materials.Texture}
        position={[-5.315, 3.976, -1.412]}
        rotation={[0, 1.062, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_128.geometry}
        material={materials.Texture}
        position={[-4.181, 3.976, -3.064]}
        rotation={[-Math.PI, -0.465, -Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_130.geometry}
        material={materials.Texture}
        position={[-1.173, 3.976, -4.449]}
        rotation={[0, 0.168, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_132.geometry}
        material={materials.Texture}
        position={[-0.941, 3.976, -4.664]}
        rotation={[Math.PI, 0.018, -Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_140.geometry}
        material={materials.Texture}
        position={[5.531, 2.183, 0.174]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_144.geometry}
        material={materials.Texture}
        position={[5.736, 1.565, 0.053]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_148.geometry}
        material={materials.Texture}
        position={[5.646, 2.794, 0.107]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_152.geometry}
        material={materials.Texture}
        position={[5.461, 3.412, 0.256]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_156.geometry}
        material={materials.Texture}
        position={[4.856, 0, -2.541]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_160.geometry}
        material={materials.Texture}
        position={[5.059, 0, -1.597]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_164.geometry}
        material={materials.Texture}
        position={[2.585, 0, -4.002]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_168.geometry}
        material={materials.Texture}
        position={[1.655, 0, -4.536]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_170.geometry}
        material={materials.Texture}
        position={[0.59, 0, -4.701]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_172.geometry}
        material={materials.Texture}
        position={[4.888, 1.833, -1.624]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_174.geometry}
        material={materials.Texture}
        position={[3.754, 1.833, -3.277]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_176.geometry}
        material={materials.Texture}
        position={[1.332, 1.833, -3.817]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_180.geometry}
        material={materials.Texture}
        position={[4.856, 2.143, -2.541]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_184.geometry}
        material={materials.Texture}
        position={[5.059, 2.143, -1.597]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_188.geometry}
        material={materials.Texture}
        position={[2.585, 2.143, -4.002]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_192.geometry}
        material={materials.Texture}
        position={[1.655, 2.143, -4.536]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_194.geometry}
        material={materials.Texture}
        position={[0.59, 2.143, -4.701]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_196.geometry}
        material={materials.Texture}
        position={[4.888, 3.976, -1.624]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_198.geometry}
        material={materials.Texture}
        position={[3.754, 3.976, -3.277]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_200.geometry}
        material={materials.Texture}
        position={[0.746, 3.976, -4.662]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_18.geometry}
        material={materials.Texture}
        position={[-0.186, 0, -2.962]}
        rotation={[0, -0.064, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_22.geometry}
        material={materials.Texture}
        position={[-2.288, 1.56, -2.263]}
        rotation={[0, -0.012, -Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_26.geometry}
        material={materials.Texture}
        position={[-2.195, 2.188, -1.867]}
        rotation={[0, 0.512, Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_34.geometry}
        material={materials.Texture}
        position={[-2.896, 0.3, -1.466]}
        rotation={[Math.PI, -1.347, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_42.geometry}
        material={materials.Texture}
        position={[3.224, 0, -0.804]}
        rotation={[0, -1.324, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_44.geometry}
        material={materials.Texture}
        position={[3.53, 1.834, 0.44]}
        rotation={[-Math.PI, 1.324, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_50.geometry}
        material={materials.Texture}
        position={[4.255, 0.943, 2.219]}
        rotation={[0, -1.002, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_54.geometry}
        material={materials.Texture}
        position={[3.87, 0.315, 2.35]}
        rotation={[0, -1.526, -1.571]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_66.geometry}
        material={materials.Texture}
        position={[-5.614, 0.943, 0.817]}
        rotation={[0, 1.318, 1.571]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_70.geometry}
        material={materials.Texture}
        position={[-5.257, 0.315, 1.01]}
        rotation={[0, 0.795, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_74.geometry}
        material={materials.Texture}
        position={[-5.39, 4.034, 0.986]}
        rotation={[Math.PI, -0.609, Math.PI / 2]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_78.geometry}
        material={materials.Texture}
        position={[-5.696, 4.662, 0.718]}
        rotation={[Math.PI, -1.133, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_82.geometry}
        material={materials.Texture}
        position={[-5.952, 0, -0.641]}
        rotation={[0, 0.953, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_86.geometry}
        material={materials.Texture}
        position={[-4.476, 0, -2.749]}
        rotation={[Math.PI, -0.568, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_90.geometry}
        material={materials.Texture}
        position={[-3.716, 0, -2.886]}
        rotation={[0, 0.644, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_96.geometry}
        material={materials.Texture}
        position={[-0.084, 0, -5.026]}
        rotation={[Math.PI, -0.039, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_106.geometry}
        material={materials.Texture}
        position={[-4.194, 1.836, -2.768]}
        rotation={[Math.PI, -0.655, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_110.geometry}
        material={materials.Texture}
        position={[-5.952, 2.143, -0.641]}
        rotation={[Math.PI, -0.953, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_114.geometry}
        material={materials.Texture}
        position={[-4.476, 2.143, -2.749]}
        rotation={[0, 0.568, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_118.geometry}
        material={materials.Texture}
        position={[-3.727, 2.143, -3.1]}
        rotation={[Math.PI, -0.644, Math.PI]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_124.geometry}
        material={materials.Texture}
        position={[-0.084, 2.143, -5.026]}
        rotation={[0, 0.039, 0]}
        scale={1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_134.geometry}
        material={materials.Texture}
        position={[-4.194, 3.979, -2.768]}
        rotation={[Math.PI, -0.655, -Math.PI / 2]}
        scale={-1.52}
      />
      <mesh
        castShadow
        geometry={instances.Object_142.geometry}
        material={materials.Texture}
        position={[5.786, 0.943, 0.18]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_146.geometry}
        material={materials.Texture}
        position={[5.428, 0.315, 0.373]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_150.geometry}
        material={materials.Texture}
        position={[5.562, 4.034, 0.348]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_154.geometry}
        material={materials.Texture}
        position={[5.868, 4.662, 0.081]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_158.geometry}
        material={materials.Texture}
        position={[5.525, 0, -0.854]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_162.geometry}
        material={materials.Texture}
        position={[4.05, 0, -2.962]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_166.geometry}
        material={materials.Texture}
        position={[3.289, 0, -3.098]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_178.geometry}
        material={materials.Texture}
        position={[3.767, 1.836, -2.98]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_182.geometry}
        material={materials.Texture}
        position={[5.525, 2.143, -0.854]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_186.geometry}
        material={materials.Texture}
        position={[4.05, 2.143, -2.962]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_190.geometry}
        material={materials.Texture}
        position={[3.3, 2.143, -3.312]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_202.geometry}
        material={materials.Texture}
        position={[3.767, 3.979, -2.98]}
        rotation={[-Math.PI, 0, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Object_28.geometry}
        material={materials.Texture}
        position={[0.353, 2.352, -3.336]}
        rotation={[-0.255, 0, 0]}
      />
      <mesh
        castShadow
        geometry={instances.Object_30.geometry}
        material={materials.Texture}
        position={[0.183, 2.801, -2.854]}
        rotation={[0.093, 0.146, -0.014]}
      />
      <mesh
        castShadow
        geometry={instances.Object_38.geometry}
        material={materials.Texture}
        position={[1.895, 0, -1.944]}
        rotation={[0, -0.436, 0]}
        scale={[1.5, 1, 1.5]}
      />
      <mesh
        castShadow
        geometry={instances.Object_46.geometry}
        material={materials.Texture}
        position={[1.862, 1.61, -1.807]}
        rotation={[0, -Math.PI / 3, 0]}
      />
      <mesh
        castShadow
        geometry={instances.Object_56.geometry}
        material={materials.Texture}
        position={[3.954, 2.491, 1.607]}
        rotation={[0, -Math.PI / 3, 0]}
      />
      <mesh
        castShadow
        geometry={instances.Object_136.geometry}
        material={materials.Texture}
        position={[-1.095, 4.291, -4.434]}
        rotation={[0, 0.357, 0]}
      />
      <mesh
        castShadow
        geometry={instances.Object_138.geometry}
        material={materials.Texture}
        position={[-5.246, 4.291, -1.466]}
        rotation={[0, 1.246, 0]}
      />
      <mesh
        castShadow
        geometry={instances.Object_204.geometry}
        material={materials.Texture}
        position={[3.198, 4.291, -3.092]}
        rotation={[-Math.PI, 0.563, 0]}
        scale={-1}
      />
      <mesh
        castShadow
        geometry={instances.Sphere.geometry}
        material={materials.led}
        position={[-0.408, 1.095, -2.212]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere001.geometry}
        material={materials.led}
        position={[0.588, 1.323, -2.222]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere002.geometry}
        material={materials.led}
        position={[1.772, 1.909, -1.165]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere003.geometry}
        material={materials.led}
        position={[2.438, 1.096, -0.786]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere004.geometry}
        material={materials.led}
        position={[4.868, 3.799, -0.097]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere005.geometry}
        material={materials.led}
        position={[1.93, 3.795, -3.69]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere006.geometry}
        material={materials.led}
        position={[-2.346, 3.799, -3.479]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere007.geometry}
        material={materials.led}
        position={[-4.706, 4.589, -1.812]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere008.geometry}
        material={materials.led}
        position={[-3.032, 2.853, 1.195]}
        scale={0.009}
      />
      <mesh
        castShadow
        geometry={instances.Sphere009.geometry}
        material={materials.led}
        position={[-1.206, 1.731, -1.489]}
        scale={0.009}
      />

      {/* theme :: potal */}
      <ScreenImage
        instances={instances}
        materials={materials}
        frame='Object_206'
        panel='Object_207'
        position={[0.27, 1.529, -2.613]}
        url={'home/screen_potal.jpg'}
        imagePosition={[-3.15, 0.75, 0]}
        routerPath={'/Potal'}
      />

      {/* theme :: totoro */}
      <ScreenImage
        instances={instances}
        materials={materials}
        frame='Object_227'
        panel='Object_228'
        position={[0.955, 4.282, -4.203]}
        rotation={[0.003, -0.647, 0.003]}
        url={'home/screen_totoro.png'}
        imagePosition={[0, 0.5, 0]}
        routerPath={'/Totoro'}
      />

      {/* theme :: box */}
      <ScreenBox
        instances={instances}
        materials={materials}
        frame='Object_215'
        panel='Object_216'
        position={[1.845, 0.377, -1.771]}
        rotation={[0, -Math.PI / 9, 0]}
        routerPath={'/Box'}
      />

      <ScreenText
        instances={instances}
        materials={materials}
        frame='Object_221'
        panel='Object_222'
        position={[-3.417, 3.056, 1.303]}
        rotation={[0, 1.222, 0]}
        y={5}
        scale={0.9}
        text={'Prod by TaeYeon'}
      />

      {/* theme :: SearchTrend */}
      <ScreenCustomModel
        instances={instances}
        materials={materials}
        frame='Object_209'
        panel='Object_210'
        position={[-1.43, 2.496, -1.8]}
        rotation={[0, 1.002, 0]}
        routerPath={'/Naver/SearchTrend'}
      >
        <DysonRingsDummy
          scale={0.45}
          rotation={[0, -Math.PI / 2, Math.PI / 6]}
        />
      </ScreenCustomModel>

      <ScreenText
        instances={instances}
        materials={materials}
        frame='Object_212'
        panel='Object_213'
        position={[-2.731, 0.629, -0.522]}
        rotation={[0, 1.087, 0]}
        x={-5}
        y={5}
        text={'Not Yet Produced...'}
        invert
      />
      <ScreenText
        instances={instances}
        materials={materials}
        frame='Object_218'
        panel='Object_219'
        position={[3.11, 2.145, -0.18]}
        rotation={[0, -0.793, 0]}
        scale={0.81}
        x={-5}
        text={'Welcome...!!'}
        invert
      />
      <ScreenText
        instances={instances}
        materials={materials}
        frame='Object_224'
        panel='Object_225'
        position={[-3.899, 4.287, -2.642]}
        rotation={[0, 0.539, 0]}
        invert
      />
      <ScreenText
        instances={instances}
        materials={materials}
        frame='Object_230'
        panel='Object_231'
        position={[4.683, 4.29, -1.558]}
        rotation={[0, -Math.PI / 3, 0]}
        text={'Three Fiber Drei'}
      />
    </group>
  );
}

useGLTF.preload('/home/computers.glb');
