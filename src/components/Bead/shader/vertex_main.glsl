vec3 coords = normal;
coords.y += uTime;
vec3 noisePattern = vec3(cnoise(coords * 0.75));
float lastPattern = wave(noisePattern + uTime);

vDisplacement = lastPattern;

float displacement = vDisplacement * 0.333333;

transformed += normalize(objectNormal) * displacement;