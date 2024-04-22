import {
  Group,
  Color,
  Vector3,
  Material,
  InstancedMesh,
  BufferGeometry,
  NormalBufferAttributes,
  InstancedBufferAttribute,
} from 'three';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GroupProps, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { folder, useControls } from 'leva';

import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import generateSeed from '../seed';

import edgeVertex from './vertex_edge.glsl';
import edgeFragment from './frag_edge.glsl';
import { blockTypes, resourceBlockTypes } from '../blockTypes';

const resources = Object.values(resourceBlockTypes);

type Size =
  | [
      width?: number | undefined,
      height?: number | undefined,
      depth?: number | undefined,
      widthSegments?: number | undefined,
      heightSegments?: number | undefined,
      depthSegments?: number | undefined
    ]
  | undefined;
const size: Size = [1, 1, 1];

/**
 * custom shader material
 * ㅡ Edge
 */
const initial_edges_uniform = {
  color: new Color(0xdddddd),
  size: new Vector3(size[0], size[1], size[2]),
  thickness: 0.01,
  smoothness: 0.2,
};
const MeshEdgesMaterial = shaderMaterial(
  initial_edges_uniform,
  edgeVertex,
  edgeFragment
);
type MeshEdgesMaterialImpl = {
  uColor: Color | string;
  uSize: Size;
  uThickness: number;
  uSmoothness: number;
} & JSX.IntrinsicElements['shaderMaterial'];

extend({ MeshEdgesMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshEdgesMaterial: MeshEdgesMaterialImpl;
    }
  }
}

type InstancedMeshRef = InstancedMesh<
  BufferGeometry<NormalBufferAttributes>,
  Material | Material[]
>;

type Data = {
  id: number;
  instanceId: number | null;
}[][][];

type BoxProps = { INIT_PLACE_SIZE: number };

const color = new Color(0x00ff00);

function World({ INIT_PLACE_SIZE, ...props }: GroupProps & BoxProps) {
  const groupRef = useRef<Group>(null);
  const boxRef = useRef<InstancedMeshRef>(null);
  const bufferColorRef = useRef<InstancedBufferAttribute>(null);
  const outlines = useRef<InstancedMeshRef>(null);

  const [data, setData] = useState<Data>([]);
  const controls = useControls(
    '월드',
    {
      seed: {
        min: 0,
        value: 0,
        max: 32768,
      },
      width: {
        min: 1,
        value: INIT_PLACE_SIZE,
        max: 128,
      },
      height: {
        min: 1,
        value: 5,
        max: 16,
        step: 1,
      },
      Terrain: folder({
        terrainScale: {
          label: 'scale',
          min: 1,
          value: 20,
          max: 100,
          step: 1,
        },
        magnitude: {
          min: 0,
          value: 0.6,
          max: 1,
          step: 0.1,
        },
        offset: {
          min: 0,
          value: 0.1,
          max: 1,
          step: 0.1,
        },
      }),
      Resource: folder({
        Stone: folder({
          stoneScale: {
            label: 'scale',
            min: 1,
            value: {
              x: 30,
              y: 30,
              z: 30,
            },
            max: 100,
            step: 1,
          },
          stoneScarcity: {
            label: 'scarcity',
            min: -1,
            max: 1,
            value: 0.2,
            step: 0.1,
          },
        }),
        Coal: folder({
          coalScale: {
            label: 'scale',
            min: 1,
            value: {
              x: 20,
              y: 20,
              z: 20,
            },
            max: 100,
            step: 1,
          },
          coalScarcity: {
            label: 'scarcity',
            min: -1,
            max: 1,
            value: 0.8,
            step: 0.1,
          },
        }),
        Iron: folder({
          ironScale: {
            label: 'scale',
            min: 1,
            value: {
              x: 60,
              y: 60,
              z: 60,
            },
            max: 100,
            step: 1,
          },
          ironScarcity: {
            label: 'scarcity',
            min: -1,
            max: 1,
            value: 0.9,
            step: 0.1,
          },
        }),
      }),
    },
    { color: '#00FF00' }
  );
  const { width, height } = controls;
  const boxCount = width * width * height;
  const colors = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: boxCount }, () => color.toArray()).flat()
      ),
    [boxCount]
  );

  /**
   * Checks if coordinates(x, y, z) are within world
   */
  const isInWorld = useCallback(
    (x: number, y: number, z: number) => {
      return 0 <= x && x < width && 0 <= y && y < height && 0 <= z && z < width;
    },
    [width, height]
  );

  const getBlock = useCallback(
    (x: number, y: number, z: number, data: Data) => {
      return isInWorld(x, y, z) ? data[x][y][z] : null;
    },
    [isInWorld]
  );

  const isBlockObscured = useCallback(
    (x: number, y: number, z: number, data: Data) => {
      const emptyId = blockTypes.empty.id;
      const isBlockCoordinates = [
        getBlock(x, y + 1, z, data)?.id ?? emptyId,
        getBlock(x, y + 1, z, data)?.id ?? emptyId,
        getBlock(x, y - 1, z, data)?.id ?? emptyId,
        getBlock(x, y, z + 1, data)?.id ?? emptyId,
        getBlock(x, y, z - 1, data)?.id ?? emptyId,
        getBlock(x + 1, y, z, data)?.id ?? emptyId,
        getBlock(x - 1, y, z, data)?.id ?? emptyId,
      ];

      return isBlockCoordinates.every(id => id !== emptyId);
    },
    [getBlock]
  );

  const setBlock = useCallback(
    (x: number, y: number, z: number, id: number, data: Data) => {
      if (isInWorld(x, y, z)) data[x][y][z].id = id;
    },
    [isInWorld]
  );

  const setBlockInstanceId = useCallback(
    (x: number, y: number, z: number, instanceId: number, data: Data) => {
      if (isInWorld(x, y, z)) data[x][y][z].instanceId = instanceId;
    },
    [isInWorld]
  );

  const createWorld = useCallback((width: number, height: number) => {
    const terrain: Data = [];

    for (let x = 0; x < width; x++) {
      const col = [];

      for (let y = 0; y < height; y++) {
        const row = [];

        for (let z = 0; z < width; z++) {
          row.push({
            id: blockTypes.empty.id,
            instanceId: null,
          });
        }

        col.push(row);
      }

      terrain.push(col);
    }

    return terrain;
  }, []);

  /**
   * generates the resoures(stone, etc..) for the world
   */
  const generateResoures = useCallback(
    (
      simplex: SimplexNoise,
      width: number,
      height: number,
      resource: {
        blockId: number;
        scale: {
          x: number;
          y: number;
          z: number;
        };
        scarcity: number;
      },
      data: Data
    ) => {
      for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
          for (let z = 0; z < width; z++) {
            const blockId = getBlock(x, y, z, data)?.id;

            // Blocking fly block and Fix Top grass block
            if (
              !blockId ||
              blockId === blockTypes.empty.id ||
              blockId === blockTypes.grass.id
            )
              continue;

            const noise = simplex.noise3d(
              x / resource.scale.x,
              y / resource.scale.y,
              z / resource.scale.z
            );

            if (noise > resource.scarcity) {
              setBlock(x, y, z, resource.blockId, data);
            }
          }
    },
    [setBlock, getBlock]
  );

  const generateTerrain = useCallback(
    (
      simplex: SimplexNoise,
      width: number,
      height: number,
      scale: number,
      magnitude: number,
      offset: number,
      data: Data
    ) => {
      for (let x = 0; x < width; x++) {
        for (let z = 0; z < width; z++) {
          // x-z 축 노이즈 추가 (scale 반영, -1 ~ 1)
          const noise = simplex.noise(x / scale, z / scale);
          // magnitude / offset 에 기반한 노이즈 스케일링 (-1 ~ 2)
          const scaledNoise = offset + magnitude * noise;
          // x-z 축 terrain의 높이 계산 (-height ~ height * 2)
          let nextHeight = Math.floor(height * scaledNoise);
          // Clamping height ( 1 ~ height * 2 )
          nextHeight = Math.max(0, Math.min(nextHeight, height - 1));

          // Fill block
          for (let y = 0; y <= nextHeight; y++) {
            setBlock(
              x,
              y,
              z,
              blockTypes[y === nextHeight ? 'grass' : 'dirt'].id,
              data
            );
          }
        }
      }
    },
    [setBlock]
  );

  /**
   * Generate World
   */
  useLayoutEffect(() => {
    if (
      !boxRef.current ||
      !outlines.current ||
      !groupRef.current ||
      !bufferColorRef.current
    )
      return;
    const box = boxRef.current;
    const outline = outlines.current;
    const bufferColor = bufferColorRef.current;
    const group = groupRef.current;

    const { seed, width, height } = controls;
    const randomSeed = generateSeed(seed);
    let instanceId = 0;

    // Generate World
    const newWorld = createWorld(width, height);

    // Generate Terrain
    const simplex = new SimplexNoise(randomSeed);
    generateTerrain(
      simplex,
      width,
      height,
      controls.terrainScale,
      controls.magnitude,
      controls.offset,
      newWorld
    );

    // Generate Resource (stone, coal, iron...)
    resources.forEach(resourceBlock => {
      generateResoures(
        simplex,
        width,
        height,
        {
          blockId: resourceBlock.id,
          scale: controls[`${resourceBlock.name}Scale`],
          scarcity: controls[`${resourceBlock.name}Scarcity`],
        },
        newWorld
      );
    });

    const newColors: number[][] = [];

    for (let x = 0; x < width; x++)
      for (let y = 0; y < height; y++)
        for (let z = 0; z < width; z++) {
          const blockId = getBlock(x, y, z, newWorld)?.id;

          //  빈 공간 or 6 방향이 모두 막혀 있을 때
          if (
            !blockId ||
            blockId === blockTypes.empty.id ||
            isBlockObscured(x, y, z, newWorld)
          )
            continue;

          const blockType = Object.values(blockTypes).find(
            t => t.id === blockId
          );

          // Position & Coloring block
          group.position.set(x, y, z);
          group.updateMatrix();
          box.setMatrixAt(instanceId, group.matrix);

          if (blockType?.color)
            newColors.push(color.set(blockType.color).toArray());

          setBlockInstanceId(x, y, z, instanceId, newWorld);
          instanceId++;
        }
    group.position.set(0, 0, 0);

    // Reset Instance Count
    box.count = instanceId;
    outline.count = instanceId;
    box.instanceMatrix.needsUpdate = true;

    colors.set(newColors.flat());
    bufferColor.set(colors);
    bufferColor.needsUpdate = true;

    // update world data
    // setData(newWorld);

    // Re-use geometry + instance matrix
    outline.geometry = box.geometry;
    outline.instanceMatrix = box.instanceMatrix;
  }, [
    colors,
    controls,
    getBlock,
    createWorld,
    generateTerrain,
    generateResoures,
    isBlockObscured,
    setBlockInstanceId,
  ]);

  return (
    <group ref={groupRef} {...props}>
      <instancedMesh ref={boxRef} args={[undefined, undefined, boxCount]}>
        <boxGeometry args={size}>
          <instancedBufferAttribute
            ref={bufferColorRef}
            attach='attributes-color'
            args={[colors, 3]}
          />
        </boxGeometry>
        <meshLambertMaterial vertexColors toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={outlines} args={[undefined, undefined, boxCount]}>
        <meshEdgesMaterial
          key={MeshEdgesMaterial.key}
          uSize={size}
          uColor={initial_edges_uniform.color}
          uThickness={initial_edges_uniform.thickness}
          uSmoothness={initial_edges_uniform.smoothness}
          transparent
          polygonOffset
          polygonOffsetFactor={-0.2}
        />
      </instancedMesh>
    </group>
  );
}

export default World;
