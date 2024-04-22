import { useTexture } from '@react-three/drei';
import {
  DoubleSide,
  Material,
  MeshLambertMaterial,
  NearestFilter,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from 'three';

type ResourcesBlockNames = 'stone' | 'coal' | 'iron';
type AllBlockNames = 'empty' | 'grass' | 'dirt' | ResourcesBlockNames;

type Block = {
  id: number;
  color?: number | string;
  material?: Material[];
};
type ResourcesBlock = {
  [resourceName in ResourcesBlockNames]: Block & {
    name: ResourcesBlockNames;
  };
};
type AllBlock = {
  [blockName in AllBlockNames]: Block & {
    name: AllBlockNames;
  };
};
type AllBlockTexture = {
  [blockName in AllBlockNames]: Block & {
    name: AllBlockNames;
  };
};

const textureLoader = new TextureLoader();
const loadTexture = (path: string) =>
  textureLoader.load(path, texture => {
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
  });

const resourceBlockTypes: ResourcesBlock = {
  stone: {
    id: 3,
    name: 'stone',
    color: 0x808080,
  },
  coal: {
    id: 4,
    name: 'coal',
    color: 0x202020,
  },
  iron: {
    id: 5,
    name: 'iron',
    color: 0x806060,
  },
};

const blockTypes: AllBlock = {
  empty: {
    id: 0,
    name: 'empty',
  },
  grass: {
    id: 1,
    name: 'grass',
    color: 0x559020,
    material: [
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/grass_side.png'),
        side: DoubleSide,
        transparent: true,
      }),
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/grass_side.png'),
        side: DoubleSide,
        transparent: true,
      }),
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/grass.png'),
        side: DoubleSide,
        transparent: true,
      }),
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/dirt.png'),
        side: DoubleSide,
        transparent: true,
      }),
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/grass_side.png'),
        side: DoubleSide,
        transparent: true,
      }),
      new MeshLambertMaterial({
        map: loadTexture('/minecraft/textures/grass_side.png'),
        side: DoubleSide,
        transparent: true,
      }),
    ],
  },
  dirt: {
    id: 2,
    name: 'dirt',
    color: 0x807020,
  },
  ...resourceBlockTypes,
};

// const useTextureBlocks = () => {
//   const [grass, grass_side, coal, dirt, iron, stone] = useTexture([
//     '/minecraft/textures/grass.png',
//     '/minecraft/textures/grass_side.png',
//     '/minecraft/textures/coal.png',
//     '/minecraft/textures/dirt.png',
//     '/minecraft/textures/iron.png',
//     '/minecraft/textures/stone.png',
//   ]);
//   // const textures = {
//   //   grass,
//   //   grass_side,
//   //   coal,
//   //   dirt,
//   //   iron,
//   //   stone,
//   // };
//   console.log(
//     Object.values(blockTypes).reduce(
//       (acc: AllBlockTexture, cur) => {
//         switch (cur.name) {
//           case 'grass':
//             console.log('grass');
//             acc[cur.name] = {
//               ...cur,
//               material: [
//                 new MeshLambertMaterial({ map: grass_side }),
//                 new MeshLambertMaterial({ map: grass_side }),
//                 new MeshLambertMaterial({ map: grass }),
//                 new MeshLambertMaterial({ map: dirt }),
//                 new MeshLambertMaterial({ map: grass_side }),
//                 new MeshLambertMaterial({ map: grass_side }),
//               ],
//             };
//           case 'dirt':
//           case 'stone':
//           case 'coal':
//           case 'iron':
//             acc[cur.name] = {
//               ...cur,
//               // material: [textures[cur.name]],
//             };
//         }

//         return acc;
//       },
//       { ...blockTypes }
//     )
//   );

//   return Object.values(blockTypes).reduce(
//     (acc: AllBlockTexture, cur) => {
//       switch (cur.name) {
//         case 'grass':
//           acc[cur.name] = {
//             ...cur,
//             material: [
//               new MeshLambertMaterial({ map: grass_side }),
//               new MeshLambertMaterial({ map: grass_side }),
//               new MeshLambertMaterial({ map: grass }),
//               new MeshLambertMaterial({ map: dirt }),
//               new MeshLambertMaterial({ map: grass_side }),
//               new MeshLambertMaterial({ map: grass_side }),
//             ],
//           };
//         case 'dirt':
//         case 'stone':
//         case 'coal':
//         case 'iron':
//           acc[cur.name] = {
//             ...cur,
//             // material: [textures[cur.name]],
//           };
//       }

//       return acc;
//     },
//     { ...blockTypes }
//   );
// };

export { blockTypes, resourceBlockTypes };
