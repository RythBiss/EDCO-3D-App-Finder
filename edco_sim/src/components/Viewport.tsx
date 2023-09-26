import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import CSP9 from '/CSPs/9.png'
import CSP8 from '/CSPs/8.png'
import CSP7 from '/CSPs/7.png'
import CSP6 from '/CSPs/6.png'
import CSP5 from '/CSPs/5.png'
import CSP4 from '/CSPs/4.png'
import CSP3 from '/CSPs/3.png'
import CSP2 from '/CSPs/2.png'
import CSP1 from '/CSPs/1.png'

export default function Viewport(props: any) {

  const mountRef = useRef(null);
  const [displacementScaleState, setDisplacementScaleState] = useState(0.01);
  const [CSPTexture, setCSPTexture] = useState(CSP1);
  const [hoistedTexture, setHoistTexture] = useState<THREE.Texture>();
  const [hoistedMaterial, setHoistMaterial] = useState<THREE.MeshStandardMaterial>();

  const updateTexture = (texture: any, material: any) => {
    console.log(texture)
    console.log(material)
    if(texture !== undefined && material !== undefined){
      const texture = new THREE.TextureLoader().load( CSPTexture );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );

      material.bumpMap = texture;
      material.displacementMap = texture;
      material.displacementScale = displacementScaleState;
    }
  }

  useEffect(() => {
    changeCSP(props.CSP)
    updateTexture(hoistedTexture, hoistedMaterial)
    console.log(props.CSP)
  })

  const changeCSP = (CSP: number) => {
    const base = 0.01;
    const multiplier = 0.002;

    if(CSP >= 1 && CSP <= 9){
      console.log('valid decimal');
      setDisplacementScaleState(base + (multiplier * CSP));
      switch(CSP){
        case 1:
          setCSPTexture(CSP1);
          break;
        case 2:
          setCSPTexture(CSP2);
          break;
        case 3:
          setCSPTexture(CSP3);
          break;
        case 4:
          setCSPTexture(CSP4);
          break;
        case 5:
          setCSPTexture(CSP5);
          break;
        case 6:
          setCSPTexture(CSP6);
          break;
        case 7:
          setCSPTexture(CSP7);
          break;
        case 8:
          setCSPTexture(CSP8);
          break;
        case 9:
          setCSPTexture(CSP9);
          break;
      }
    }else{
      console.log('decimal not in range');
    }
  }

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
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const cube = new THREE.Mesh( geometry, material );

    const plane = new THREE.PlaneGeometry( 1000, 1000 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const ground = new THREE.Mesh( plane, planeMaterial );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    
    const light = new THREE.PointLight(0xFFFFFF, 100, 100)
    const ambLight = new THREE.AmbientLight( 0x404040, 10 );
  
    scene.add( light );
    scene.add( directionalLight );
    scene.add( cube );
    scene.add( ambLight );
    scene.add( ground );

    light.castShadow = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    ground.castShadow = false;
    ground.receiveShadow = true;
  
    camera.position.z = 4;
    light.position.set(-2.5, 10, 2.5);
    scene.background = new THREE.Color("rgb(227, 249, 255)");
    ground.rotation.x = Math.PI / -2;
    ground.position.y = -0.19;


    const texture = new THREE.TextureLoader().load( CSPTexture );

    updateTexture(texture, material);

    setHoistMaterial(material);
    setHoistTexture(texture);
    
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
