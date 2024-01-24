import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Viewport(props: any) {
  const mountRef = useRef(null);
  const [isGltfInScene, setIsGltfInScene] = useState(true);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, mountRef?.current?.offsetWidth / mountRef?.current?.offsetHeight, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModel = useRef();
  const controls = new OrbitControls( camera.current, renderer.current.domElement );
  const loader = new GLTFLoader();

  //watch for layer object updates
  useEffect(()=>{
    if(props.layer){
      const Layer = props.layer;
      console.log(Layer.materialRemoved)
    }
  }, [props])

  //initiat scene
  useEffect(() => {
    camera.current = new THREE.PerspectiveCamera(75, mountRef?.current?.offsetWidth / mountRef?.current?.offsetHeight, 0.01, 1000);
    document.body.appendChild(renderer.current.domElement);

    //load model
    // const loader = new GLTFLoader();
    // loader.load('Models/ceramic.gltf', (gltf) => {
    //     gltfModel.current = gltf.scene;
    //     scene.current.add(gltfModel.current);
    //   },
    //   //progress event
    //   undefined,
    //   //error event
    //   (error) => console.error(error)
    // );
    // loader.load('Models/carpet.gltf', (gltf) => {
    //     gltfModel2.current = gltf.scene;
    //     //scene.current.add(gltfModel2.current);
    //   },
    //   //progress event
    //   undefined,
    //   //error event
    //   (error) => console.error(error)
    // );

    //init the renderer
    renderer.current.setSize( mountRef.current.offsetWidth, mountRef.current.offsetHeight );
    mountRef.current.appendChild( renderer.current.domElement );
    renderer.current.shadowMap.enabled = true;

    //build enviornment
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    const ambLight = new THREE.AmbientLight( 0xffffff, 0.25 );
    
    scene.current.add( light );
    scene.current.add( directionalLight );
    scene.current.add( ambLight );
    light.position.set(1, 1, 1).normalize();

    camera.current.position.z = 5;

    loadSurface('ceramic');

    //update loops
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.current.render(scene.current, camera.current);
    }

    let onWindowResize = function () {
      camera.current.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(mountRef.current.offsetWidth, window.innerHeight - 64);
    }

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("maximize", onWindowResize, false);

    animate();

    console.log('useEff []')

    return () => {
      console.log('cleanUp []')
      mountRef.current.removeChild(renderer.current.domElement);
      controls.dispose();
    };
  }, []);

  //trigger scene update
  // const onClick = () => {
  //   setIsGltfInScene((prev) => !prev);
  // };

  //update scene
  const updateScene = () => {
    if (scene.current.children.includes(gltfModel.current)) {
      scene.current.remove(gltfModel.current);
      console.log(scene.current.children.includes(gltfModel.current))
      console.log('updateScene')
    }

    loadSurface(props?.layer?.materialRemoved);
    console.log(controls)
  }

  const loadSurface = (surface:string) => {
    loader.load(`Models/${surface}.gltf`, (gltf) => {
      gltfModel.current = gltf.scene;
      scene.current.add(gltfModel.current);
    },
    //progress event
    undefined,
    //error event
    (error) => console.error(error)
  );
  }

  updateScene();

  return (
    <>
      <div className='col-7 viewport' ref={mountRef}></div>
    </>
  );
}
