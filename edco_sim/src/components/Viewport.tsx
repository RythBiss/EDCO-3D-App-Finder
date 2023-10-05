import { useEffect, useRef, useState } from 'react'
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
import CSP0 from '/CSPs/0.png'

export default function Viewport(props: any) {

  const baseDeformScale = 0.01;

  const mountRef = useRef(null);
  const [displacementScaleState, setDisplacementScaleState] = useState(baseDeformScale);
  const [CSPTexture, setCSPTexture] = useState<string>(CSP0);
  const [CSPTexturePrev, setCSPTexturePrev] = useState<string>('none');
  const [hoistedTexture, setHoistTexture] = useState<THREE.Texture>();
  const [hoistedMaterial, setHoistMaterial] = useState<THREE.MeshStandardMaterial>();
  const [hoistedMaterialPrev, setHoistMaterialPrev] = useState<THREE.MeshStandardMaterial>();

  const updateTexture = (texture: any, material: any) => {
    if(texture !== undefined && material !== undefined){
      const texture = new THREE.TextureLoader().load( CSPTexture );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 0.5, 1 );

      material.bumpMap = texture;
      material.displacementMap = texture;
      material.displacementScale = displacementScaleState;

      if(props?.history?.CSP !== undefined && hoistedMaterialPrev !== undefined) {
        const texturePrev = new THREE.TextureLoader().load( CSPTexturePrev );
        texturePrev.wrapS = THREE.RepeatWrapping;
        texturePrev.wrapT = THREE.RepeatWrapping;
        texturePrev.repeat.set( 0.5, 1 );
        
        hoistedMaterialPrev.bumpMap = texturePrev;
        hoistedMaterialPrev.displacementMap = texturePrev;
        hoistedMaterialPrev.displacementScale = displacementScaleState;
      }

      if(CSPTexture == CSP0){
        material.color.setHex(0xdbca9c)
      }else{
        material.color.setHex(0xdedede)
      }
    }
  }

  useEffect(() => {
    changeCSP(props.CSP, setCSPTexture)
    if(props?.history?.CSP !== undefined) {
      changeCSP(props.history.CSP, setCSPTexturePrev)
    }
    updateTexture(hoistedTexture, hoistedMaterial)
  })

  const changeCSP = (CSP: number, CSPState: any) => {
    const base = baseDeformScale;
    const multiplier = 0.001;

    if(CSP >= 0 && CSP <= 9){
      setDisplacementScaleState(base + (multiplier * CSP));
      switch(CSP){
        case 0:
          CSPState(CSP0);
          break;
        case 1:
          CSPState(CSP1);
          break;
        case 2:
          CSPState(CSP2);
          break;
        case 3:
          CSPState(CSP3);
          break;
        case 4:
          CSPState(CSP4);
          break;
        case 5:
          CSPState(CSP5);
          break;
        case 6:
          CSPState(CSP6);
          break;
        case 7:
          CSPState(CSP7);
          break;
        case 8:
          CSPState(CSP8);
          break;
        case 9:
          CSPState(CSP9);
          break;
      }
    }else{
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
  
    const geometry = new THREE.BoxGeometry( 4, 0.375, 4 );
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const materialPrev = new THREE.MeshStandardMaterial( { color: 0xbab5a9 } );

    const plane = new THREE.PlaneGeometry( 2, 4, 1*1000, 2*1000 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const ground = new THREE.Mesh( plane, material );
    const groundPrev = new THREE.Mesh( plane, materialPrev );
    const cube = new THREE.Mesh( geometry, planeMaterial );


    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    
    const light = new THREE.PointLight(0xffffff, 100)
    const ambLight = new THREE.AmbientLight( 0xffffff, 0.25 );
    
    scene.add( light );
    scene.add( directionalLight );
    scene.add( cube );
    scene.add( ambLight );
    scene.add( ground );
    scene.add( groundPrev );

    light.castShadow = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    ground.castShadow = true;
    ground.receiveShadow = true;
  
    camera.position.z = 4;
    camera.position.y = 0.5;
    light.position.set(0,5,5);
    scene.background = new THREE.Color("rgb(227, 249, 255)");
    ground.rotation.x = Math.PI / -2;
    groundPrev.rotation.x = Math.PI / -2;
    ground.position.y = -0.19;
    groundPrev.position.y = -0.19;
    ground.position.x = 1;
    groundPrev.position.x = -1;
    cube.position.y -= 0.378;


    const texture = new THREE.TextureLoader().load( CSPTexture );

    updateTexture(texture, material);

    setHoistMaterial(material);
    setHoistTexture(texture);
    setHoistMaterialPrev(materialPrev);
    
    const texturePrev = new THREE.TextureLoader().load( '' );
    materialPrev.bumpMap = texturePrev;
    materialPrev.bumpMap = texturePrev;
    materialPrev.displacementMap = texturePrev;
    materialPrev.displacementScale = displacementScaleState;
    
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
