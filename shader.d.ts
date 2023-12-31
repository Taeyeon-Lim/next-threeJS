// shader.d.ts

declare module '*.vert' {
  const file: string;
  export default file;
}

declare module '*.frag' {
  const file: string;
  export default file;
}

declare module '*.glsl' {
  const file: string;
  export default file;
}
