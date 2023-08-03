import * as THREE from 'three';
import React, {
  PropsWithChildren,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { useGLTF, useScroll } from '@react-three/drei';
import { ThreeElements, useFrame, useGraph } from '@react-three/fiber';
import { gsap } from 'gsap';

export type WawaOfficeInstancesType = {
  [name: string]: THREE.Object3D<THREE.Event> & {
    geometry?: THREE.BufferGeometry;
    skeleton?: THREE.Skeleton;
  };
};

const FLOOR_HEIGHT = -2.3;
const NB_FLOORS = 3;

export default function Model(
  props: PropsWithChildren<ThreeElements['group']>
) {
  const { scene } = useGLTF('/totoro/WawaOffice.glb');

  const { nodes, materials } = useGraph(scene);
  const instances: WawaOfficeInstancesType = useMemo(
    () => ({
      ...nodes,
    }),
    [nodes]
  );

  const groupRef = useRef<THREE.Group | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const libraryRef = useRef<THREE.Mesh | null>(null);
  const atticRef = useRef<THREE.Mesh | null>(null);

  useLayoutEffect(() => {
    tlRef.current = gsap.timeline();
    const tl = tlRef.current;
    const group = groupRef.current;

    if (!tl || !group) return;

    // mesh (y)
    tl.to(
      group.position,
      {
        duration: 2,
        y: FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0.5
    );

    // mesh (floor 1)
    tl.to(
      group.rotation,
      {
        duration: 0.5,
        y: 0,
      },
      0
    );
    tl.to(
      group.position,
      {
        duration: 0.5,
        x: -1,
        z: 0.5,
      },
      0
    );

    // mesh (floor 2)
    tl.to(
      group.position,
      {
        duration: 0.5,
        x: -0.5,
        z: 1,
      },
      0.5
    );
    tl.to(
      group.rotation,
      {
        duration: 0.4,
        y: -Math.PI / 6,
        z: -Math.PI / 18,
      },
      0.6
    );

    // mesh (floor 3)
    tl.to(
      group.position,
      {
        duration: 1,
        x: 0.5,
        z: 2.5,
      },
      1
    );
    tl.to(
      group.rotation,
      {
        duration: 1,
        y: -Math.PI / 18,
        z: Math.PI / 36,
      },
      1
    );

    // mesh: library
    const library = libraryRef.current;
    if (!library) return;

    tl.from(
      library.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5
    );
    tl.from(
      library.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      0
    );

    // mesh: attic
    if (!atticRef.current) return;

    tl.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 5,
      },
      0.5
    );
    tl.from(
      atticRef.current.rotation,
      {
        duration: 1,
        y: Math.PI / 2,
      },
      1
    );
    tl.from(
      atticRef.current.position,
      {
        duration: 1.25,
        z: -6,
      },
      1
    );
  }, [tlRef, groupRef, libraryRef, atticRef]);

  const scroll = useScroll();

  useFrame(() => {
    if (!tlRef.current) return;

    tlRef.current.seek(scroll.offset * tlRef.current.duration());
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        geometry={instances['01_office'].geometry}
        material={materials['01']}
      />
      <mesh
        ref={libraryRef}
        geometry={instances['02_library'].geometry}
        material={materials['02']}
        position={[0, 2.12, -2.22]}
      />
      <mesh
        ref={atticRef}
        geometry={instances['03_attic'].geometry}
        material={materials['03']}
        position={[-2, 4.22, -2.2]}
      />
    </group>
  );
}

useGLTF.preload('/totoro/WawaOffice.glb');
