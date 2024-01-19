import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Viewport(props: any) {

  const mountRef = useRef(null);

  const loader = new GLTFLoader();
  const scene = new THREE.Scene();

  // const updateViewport = (newModel: string) =>{
  //   console.log(newModel)

  //   loader.load(`/Models/${newModel}.gltf`, (gltfScene) => {

  //     let Model1 = gltfScene.scene;
  //     Model1.rotation.y = 3.14159;      

  //     loader.load(`/Models/${newModel}.gltf`, (gltfScene) => {

  //       let Model2 = gltfScene.scene;
  //       scene.add(Model1)
  //       scene.add(Model2)
  //       object = gltfScene
  //       //console.log(object)
  //     })
  //   })
  // }

  useEffect(() => {
    loader.load(`/Models/${props?.current?.materialRemoved}.gltf`, (gltfScene) => {

      let Model2 = gltfScene.scene;
      scene.add(Model2);
    })
  })

  useEffect(() => {
    //updateViewport('CSP 1')
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( mountRef.current.offsetWidth, mountRef.current.offsetHeight );
    mountRef.current.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;

    const camera = new THREE.PerspectiveCamera( 75, mountRef.current.offsetWidth / mountRef.current.offsetHeight, 0.01, 1000 );
    const controls = new OrbitControls( camera, renderer.domElement );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    
    const light = new THREE.PointLight(0xffffff, 100)
    const ambLight = new THREE.AmbientLight( 0xffffff, 0.25 );
    
    scene.add( light );
    scene.add( directionalLight );
    scene.add( ambLight );
  
    camera.position.y = 1.4;
    camera.rotation.x = -1.5708;

    light.position.set(0,5,5);

    scene.background = new THREE.Color("rgb(245, 245, 245)");
    
    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.offsetWidth, window.innerHeight - 64);
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();
    
    return () => mountRef.current.removeChild(renderer.domElement);
  }, [])

  return (
    <div className='col-7 viewport' ref={mountRef}></div>
  )
}
