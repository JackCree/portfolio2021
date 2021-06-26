varying vec3 vertexNormal; // (0, 0, 0)
void main() {
  float intensity = pow(0.7 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(0.6, 0.5, 1, 1.0) * intensity;
}