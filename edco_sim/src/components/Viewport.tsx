import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Bump from '/bump.png'

export default function Viewport() {

  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( mountRef.current.offsetWidth, mountRef.current.offsetHeight );
    mountRef.current.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, mountRef.current.offsetWidth / mountRef.current.offsetHeight, 0.1, 1000 );
    const controls = new OrbitControls( camera, renderer.domElement );
    const loader = new GLTFLoader();
  
    const geometry = new THREE.BoxGeometry( 4, 0.375, 4, 512, 64, 512 );
    const material = new THREE.MeshStandardMaterial( { color: 0xc7c4c0 } );
    const cube = new THREE.Mesh( geometry, material );

    const plane = new THREE.PlaneGeometry( 1000, 1000 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const ground = new THREE.Mesh( plane, planeMaterial );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    
    const light = new THREE.PointLight(0xFFFFFF, 100, 100)
    const ambLight = new THREE.AmbientLight( 0x404040, 10 );
  
    scene.add( light );
    scene.add( cube );
    scene.add( ambLight );
    scene.add( ground );

    light.castShadow = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    ground.castShadow = false;
    ground.receiveShadow = true;
  
    camera.position.z = 5;
    light.position.set(-2.5, 10, 2.5);
    scene.background = new THREE.Color("rgb(227, 249, 255)");
    ground.rotation.x = Math.PI / -2;
    ground.position.y = -0.19;




    const texture = new THREE.TextureLoader().load( Bump );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );

    material.bumpMap = texture;
    material.displacementMap = texture;
    material.displacementScale = 0.025;


    
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
