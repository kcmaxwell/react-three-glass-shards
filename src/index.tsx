import "./styles.css";
import * as THREE from "three";
import { Canvas, useFrame, MeshProps } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import {
  Environment,
  OrbitControls,
  Instances,
  Instance
} from "@react-three/drei";
import FPSStats from "react-fps-stats";
import ReactDOM from "react-dom";

const randomPosition = (r: number) =>
  new THREE.Vector3(
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r
  );
const positionData = Array.from({ length: 10 }, (r: number = 10) => ({
  position: randomPosition(r)
}));

const Box = (props: MeshProps) => {
  const mesh = useRef<THREE.Mesh>();

  useFrame((state, delta) => {
    mesh.current.rotation.x += 1 * delta;
    mesh.current.rotation.y += 1 * delta;
  });

  return (
    <group {...props}>
      <Instance ref={mesh} />
    </group>
  );
};

const Boxes = () => {
  return (
    <Instances limit={10}>
      <boxBufferGeometry />
      <meshPhysicalMaterial metalness={1} roughness={0} />
      {positionData.map((props, i) => (
        <Box key={i} {...props} />
      ))}
    </Instances>
  );
};

ReactDOM.render(
  <div className="App">
    <FPSStats />
    <Canvas>
      <Suspense fallback={"Loading..."}>
        <Boxes />
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
