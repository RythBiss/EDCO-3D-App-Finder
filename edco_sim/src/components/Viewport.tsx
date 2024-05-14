import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default function Viewport(props: any) {

  const [updateView, setUpdateView] = useState<boolean>(false);
  const [popupHeight, setPopupHeight] = useState<number>(0);
  const [lastPassed, setLastPassed] = useState<any>();

  const mountRef = useRef<any>(null);
  const controlsRef = useRef<any>();
  const loadedModels = useRef<any>([]);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModelRight = useRef<any>();
  const gltfModelLeft = useRef<any>();
  const popupRef = useRef<any>(null);

  const loader = new GLTFLoader();
  const fontLoader = new FontLoader();
  
  let isLoaded = true;
  let isFirstLoad = true;

  //called when a visual component in the 3D scene has changed.
  const updateScene = () => {

    if(lastPassed == undefined || lastPassed !== props?.layer?.sublayerObjects[props?.renderLayer]?.materialRemoved){ 
      if(updateView !== props.updateTrigger){
        loadedModels.current.forEach((item: THREE.Object3D) => {
          scene.current.remove(item);
        })
    
        loadedModels.current = [];
    
        loadSurface(props?.layer?.sublayerObjects[props?.renderLayer]?.materialRemoved);
        setLastPassed(props?.layer?.sublayerObjects[props?.renderLayer]?.materialRemoved)

        setUpdateView(props.updateTrigger);
      }
    }
  };

  //updates 'isLoaded' var to regulate updates.
  const setIsLoaded = (status: boolean) => {
    isLoaded = status;
  }

  //loads before/after surface models when selected.
  const loadSurface = (surface: string) => {
    if(isLoaded == true || isFirstLoad == true){
      setIsLoaded(false);

      if(surface !== '' && surface !== undefined){
        loader.load(`Models/${surface}.gltf`, (gltf) => {
          loadedModels.current.push(gltf.scene)

          gltfModelLeft.current = gltf.scene;
          gltfModelLeft.current.rotation.y = 3.14159;
          gltfModelLeft.current.traverse( function( node: any ) {
            if(node.isMesh){
              node.castShadow = true;
              node.receiveShadow  = true;
            }
          });

          scene.current.add(gltfModelLeft.current);

          setIsLoaded(true);
          isFirstLoad = false;
        });
    
        if(props?.layer?.sublayers[props?.renderLayer+1] != undefined){

          let modifiedSurface = props?.layer?.sublayers[props?.renderLayer+1];

          //logic to determine CSP here, plug new CSP into loader below.
          if(props.layer.sublayerObjects[props?.renderLayer+1].materialRemoved == 'concrete' && props.layer.sublayerObjects[props?.renderLayer].CSP !== ''){
            modifiedSurface = `CSP ${props.layer.sublayerObjects[props?.renderLayer].CSP}`;
          }

          loader.load(`Models/${modifiedSurface}.gltf`, (gltf) => {
            loadedModels.current.push(gltf.scene);

            gltfModelRight.current = gltf.scene;

            gltfModelRight.current.traverse( function( node: any ) {

              if(node.isMesh){
                node.castShadow = true;
                node.receiveShadow  = true;
              }
            });
            
            scene.current.add(gltfModelRight.current);

            setIsLoaded(true);
          });
        }else{
          let modifiedSurface = surface;

          if(surface == 'concrete' && props.layer.sublayerObjects[props?.renderLayer].CSP !== ''){
            modifiedSurface = `CSP ${props.layer.sublayerObjects[props?.renderLayer].CSP}`;
          }

          loader.load(`Models/${modifiedSurface}.gltf`, (gltf) => {
            loadedModels.current.push(gltf.scene)

            gltfModelRight.current = gltf.scene;

            gltfModelRight.current.traverse( function( node: any ) {
              if(node.isMesh){
                node.castShadow = true;
                node.receiveShadow  = true;
              }
            });

            scene.current.add(gltfModelRight.current);

            setIsLoaded(true);
          });
        }
      }
    }
  };

  updateScene();
  
  useEffect(() => {
    //append renderer to dom
    document.body.appendChild(renderer.current.domElement);

    //init the renderer
    if(mountRef.current){
      renderer.current.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
      mountRef.current.appendChild(renderer.current.domElement);
    }

    renderer.current.shadowMap.enabled = true;
    renderer.current.shadowMap.type = THREE.PCFSoftShadowMap;

    //initialize controls
    controlsRef.current = new OrbitControls(camera.current, renderer.current.domElement);

    //build environment
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    const light4 = new THREE.DirectionalLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const ambLight = new THREE.AmbientLight(0xffffff, 1);
    const floor = new THREE.PlaneGeometry(50, 50);
    const floorMesh = new THREE.Mesh(floor, new THREE.MeshPhongMaterial({ color: 0xe8e8e8, /*side: THREE.DoubleSide*/ }))

    //camera settings
    camera.current.position.z = 2.05;

    //light 1 settings
    light.castShadow = true;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 500;
    light.position.set(1, 1, 1).normalize();

    //light 2 settings
    light2.castShadow = true;
    light2.shadow.mapSize.width = 4096;
    light2.shadow.mapSize.height = 4096;
    light2.shadow.camera.near = 0.01;
    light2.shadow.camera.far = 500;
    light2.position.set(-1, 1, -1).normalize();

    //light 3 settings
    light3.castShadow = true;
    light3.shadow.mapSize.width = 4096;
    light3.shadow.mapSize.height = 4096;
    light3.shadow.camera.near = 0.01;
    light3.shadow.camera.far = 500;
    light3.position.set(1, 1, -1).normalize();

    //light 4 settings
    light4.castShadow = true;
    light4.shadow.mapSize.width = 4096;
    light4.shadow.mapSize.height = 4096;
    light4.shadow.camera.near = 0.01;
    light4.shadow.camera.far = 500;
    light4.position.set(-1, 1, 1).normalize();

    //add everything to scene
    scene.current.add(light);
    scene.current.add(light2);
    scene.current.add(light3);
    scene.current.add(light4);
    scene.current.add(directionalLight);
    scene.current.add(ambLight);
    scene.current.background = new THREE.Color("rgb(20%, 20%, 20%)");
    scene.current.add(floorMesh)

    //floor settings
    floorMesh.rotation.x = -3.14159/2;
    floorMesh.position.y = -0.025;
    floorMesh.receiveShadow = true;

    //load 'Before' and 'After' text in scene
    fontLoader.load( 'Fonts/Roboto Medium_Regular.json', function ( font ) {

      const afterGeometry = new TextGeometry( 'After', {
        font: font,
        size: 0.1,
        height: 0.025,
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 0
      } );
      const beforeGeometry = new TextGeometry( 'Before', {
        font: font,
        size: 0.1,
        height: 0.025,
        curveSegments: 3,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 0
      });

      const afterMesh = new THREE.Mesh(afterGeometry, new THREE.MeshPhongMaterial({ color: 0x757575 }))
      const beforeMesh = new THREE.Mesh(beforeGeometry, new THREE.MeshPhongMaterial({ color: 0x757575 }))

      afterMesh.position.set(0.3,0.025,-1.05)
      beforeMesh.position.set(-0.7,0.025,-1.05)
      afterMesh.rotation.x = -3.14159/2.5
      beforeMesh.rotation.x = -3.14159/2.5
      afterMesh.castShadow = true;
      beforeMesh.castShadow = true;

      scene.current.add(afterMesh);
      scene.current.add(beforeMesh);

    } );

    //update loops
    function animate() {
      requestAnimationFrame(animate);
      renderer.current.render(scene.current, camera.current);
    }

    let onWindowResize = function () {
      camera.current.aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(mountRef.current.offsetWidth, window.innerHeight - 64);
    };

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("maximize", onWindowResize, false);
    onWindowResize();
    loadSurface('ceramic');
    animate();

    return () => {
      if(mountRef.current !== null) mountRef.current.removeChild(renderer.current.domElement);
      if(controlsRef.current !== undefined) controlsRef.current.dispose();
    };
  }, []);

  useEffect(() =>{
    if(popupRef.current){
      console.log(props.popupYPos-popupRef.current.getBoundingClientRect().height/2)
      setPopupHeight((props.popupYPos)-(popupRef.current.getBoundingClientRect().height/2)-64)
    }
  })

  return (
    <>
      <div className='col-12 col-lg-7 viewport' ref={mountRef}>
        {props.popup == true &&
          <p ref={popupRef} className={'info-pop'} style={{ top: `calc(${popupHeight / 16}rem + 1rem)`}} >
            {props.popupInfo}
          </p>
        }
      </div>
    </>
  );
}
