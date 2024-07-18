import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default function Viewport(props: any) {

  //updateView is used to synchronize updates with the react dom and the three js scene. Called after any scene altering changes are made in the layer object.
  const [updateView, setUpdateView] = useState<boolean>(false);
  const [popupHeightValue, setpopupHeightValueValue] = useState<number>(0);
  const [lastRenderedSurface, setLastRenderedSurface] = useState<any>();

  const mountRef = useRef<any>(null);
  const controlsRef = useRef<any>();
  const loadedModels = useRef<any>([]);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModel = useRef<any>();
  const popupRef = useRef<any>(null);

  const loader = new GLTFLoader();
  const fontLoader = new FontLoader();

  const subLayerAbove = props?.layer?.sublayerObjects[props?.renderLayer-1]
  const subLayerCurrent = props?.layer?.sublayerObjects[props?.renderLayer]
  const subLayerBelow = props?.layer?.sublayerObjects[props?.renderLayer+1]
  
  let isLoaded = true;
  let isFirstLoad = true;


  const addSlabToScene = (surface: string, isRenderedLayer: boolean) => {
    loader.load(`Models/${surface}.gltf`, (gltf) => {
      loadedModels.current.push(gltf.scene)

      gltfModel.current = gltf.scene;
      if(isRenderedLayer) gltfModel.current.rotation.y = 3.14159;
      gltfModel.current.traverse( function( node: any ) {
        if(node.isMesh){
          node.castShadow = true;
          node.receiveShadow  = true;
        }
      });

      scene.current.add(gltfModel.current);

      isFirstLoad = false;
    });
  }

  //called when a visual component in the 3D scene has changed.
  const updateScene = () => {

    //initializes prePass, which is used to set lastRenderedSurface, which is used to see if the check if the layers already match as intended before rerendering.
    let prepPassed = subLayerCurrent?.materialRemoved;


    //if layer is concrete, changes surface CSP to match the tooling.
    if( 
        subLayerCurrent?.materialRemoved == 'concrete' ||
        subLayerCurrent?.materialRemoved == 'trip hazard' ||
        subLayerCurrent?.materialRemoved == 'high spots'
      ){
        
      prepPassed = `CSP ${subLayerCurrent.CSP}`

      }

    else if(
        subLayerBelow?.materialRemoved == 'concrete' ||
        subLayerBelow?.materialRemoved == 'trip hazard' ||
        subLayerBelow?.materialRemoved == 'high spots'
      ){

      prepPassed = `CSP ${subLayerBelow?.materialRemoved}`
    
      }

    //if lastRenderedSurface is not the same as the new render request, begin rerender.
    if(lastRenderedSurface == undefined || lastRenderedSurface !== subLayerCurrent?.materialRemoved){ 
      if(updateView !== props.updateTrigger){
        loadedModels.current.forEach((item: THREE.Object3D) => {
          scene.current.remove(item);
        })
    
        loadedModels.current = [];
    
        loadSurface(subLayerCurrent?.materialRemoved);
        setLastRenderedSurface(prepPassed);
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
        //another concrete CSP check, similar to updateScene() above.


        let modifiedSurface = surface;

        if((surface == 'concrete') && subLayerAbove?.CSP !== ''){

              if(subLayerAbove?.CSP !== undefined){
                modifiedSurface = `CSP ${subLayerAbove?.CSP}`;
              }else{
                modifiedSurface = `CSP 1`;
                
              }
            }
          console.log("mod surface " + modifiedSurface)

        addSlabToScene(modifiedSurface, true);

        //check if there is another layer below the current one, and if so, render it on the other side. Otherwise, render current layer for both sides.
        if(props?.layer?.sublayers[props?.renderLayer+1] != undefined){

          let modifiedSurface = subLayerBelow.materialRemoved;

          //another concrete CSP check, similar to updateScene() above.
          if( modifiedSurface == 'concrete' ||
              modifiedSurface == 'trip hazard' ||
              modifiedSurface == 'high spots' &&
              subLayerCurrent?.CSP !== ''
           ){
            modifiedSurface = `CSP ${subLayerCurrent?.CSP}`;
          }
          //the problem you had last time:
          //when not all items are selected (machines and tools),
          //it makes this code display CSP 1. Either give a disclaimer
          //about appearances not being accurate without all selections or find workaround
          
          addSlabToScene(modifiedSurface, false)
        }else{
          let modifiedSurface = surface;

          if((surface == 'concrete' ||
              surface == 'trip hazard' ||
              surface == 'high spots') &&
              props.layer.sublayerObjects[props?.renderLayer].CSP !== ''){
                modifiedSurface = `CSP ${props.layer.sublayerObjects[props?.renderLayer].CSP}`;
          }

          addSlabToScene(modifiedSurface, false)
        }
      }

      setIsLoaded(true);
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
    const ambColor = 0xe8e8e8
    const backgroundAmbColor = 0xd7d7d7
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    const light4 = new THREE.DirectionalLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const ambLight = new THREE.AmbientLight(0xffffff, 1);
    const floor = new THREE.PlaneGeometry(50, 50);
    const floorMesh = new THREE.Mesh(floor, new THREE.MeshPhongMaterial({ color: ambColor, /*side: THREE.DoubleSide*/ }))

    //camera settings
    camera.current.position.z = 1.5;
    camera.current.position.y = 1.5;
    camera.current.position.x = 0.5;
    camera.current.lookAt(0,0,0);

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
    scene.current.background = new THREE.Color(backgroundAmbColor);
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
      setpopupHeightValueValue((props.popupYPos)-(popupRef.current.getBoundingClientRect().height/2)-64)
    }
  })

  return (
    <>
      <div className='col-12 col-lg-7 viewport' ref={mountRef}>
        {props.popup == true &&
          <p ref={popupRef} className={'info-pop'} style={{ top: `calc(${popupHeightValue / 16}rem + 1rem)`}} >
            {props.popupInfo}
          </p>
        }
      </div>
    </>
  );
}