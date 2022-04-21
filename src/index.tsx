import "./styles.css";
import * as THREE from "three";
import { Canvas, useFrame, MeshProps } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import FPSStats from "react-fps-stats";
import ReactDOM from "react-dom";

const Box = (props: MeshProps) => {
  const mesh = useRef<THREE.mesh>();

  useFrame((state, delta) => {
    mesh.current.rotation.x += 1 * delta;
    mesh.current.rotation.y += 1 * delta;
  });

  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial metalness={1} roughness={0} />
    </mesh>
  );
};

ReactDOM.render(
  <div className="App">
    <FPSStats />
    <Canvas>
      <Suspense fallback={"Loading..."}>
        <Box />
        <pointLight position={[10, 10, 10]} />
        <ambientLight />
        <Environment
          files={[
            "/skybox/posx.jpg",
            "/skybox/negx.jpg",
            "/skybox/posy.jpg",
            "/skybox/negy.jpg",
            "/skybox/posz.jpg",
            "/skybox/negz.jpg"
          ]}
          background
        />
      </Suspense>
    </Canvas>
  </div>,
  document.getElementById("root")
);
