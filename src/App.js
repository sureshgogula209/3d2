import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Loader,
  OrbitControls,
  useTexture,
  PerspectiveCamera
} from "@react-three/drei";
import FactoryNew4 from "./Factorynew4";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x = 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[5, 5, 5, 5]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  const [cameras, setCamers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])


  const getEvent = (data) => {
    console.log(data);
    if (data == 'cam1') {
      setCamers([1, 2, 3, 4]);
    } else if (data == 'cam2') {
      setCamers([1, 2, 3, 4, 5, 6]);
    } else if (data == 'cam3') {
      setCamers([1]);
    } else {
      setCamers([1, 2]);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 totlaModel" >
          <Canvas style={{ height: 200, width: 300 }}>
            <ambientLight intensity={0.9} />
            <spotLight position={[10, 10, 10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <OrbitControls screenSpacePanning={false} />
            <Suspense fallback={null}>
              <FactoryNew4 getClickevent={getEvent} />
            </Suspense>
          </Canvas>
        </div>
        <div className="col-md-4 ">
          <button onClick={()=>setCamers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}>Clear Filter</button>
          <ul cambax>
            {cameras.map((item, index) => {
              return <li className="box">{`Video${index+1}`}</li>

            })}
          </ul>
        </div>
      </div>

    </div>
  )
}
