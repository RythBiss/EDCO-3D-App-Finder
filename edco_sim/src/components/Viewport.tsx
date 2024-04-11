import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default function Viewport(props: any) {
  const mountRef = useRef<any>(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModelRight = useRef<any>();
  const gltfModelLeft = useRef<any>();
  const loader = new GLTFLoader();
  const fontLoader = new FontLoader();
  const controlsRef = useRef<any>();
  const loadedModels = useRef<any>([]);
  const [updateView, setUpdateView] = useState<boolean>(false);
  
  let isLoaded = true;
  let isFirstLoad = true;

  useEffect(() => {
    document.body.appendChild(renderer.current.domElement);

    //init the renderer
    if(mountRef.current){
      renderer.current.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
      mountRef.current.appendChild(renderer.current.domElement);
    }

    renderer.current.shadowMap.enabled = true;

    //build environment
    const light = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const ambLight = new THREE.AmbientLight(0xffffff, 1);

    scene.current.add(light);
    scene.current.add(directionalLight);
    scene.current.add(ambLight);
    scene.current.background = new THREE.Color("rgb(20%, 20%, 20%)");
    light.position.set(1, 1, 1).normalize();

    camera.current.position.z = 2.05;

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
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 0
      });

      const afterMesh = new THREE.Mesh(afterGeometry, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }))
      const beforeMesh = new THREE.Mesh(beforeGeometry, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }))

      scene.current.add(afterMesh);
      scene.current.add(beforeMesh);
      afterMesh.position.set(0.3,0,-1.05)
      beforeMesh.position.set(-0.7,0,-1.05)
      afterMesh.rotation.x = -3.14159/2
      beforeMesh.rotation.x = -3.14159/2
    } );

    loadSurface('ceramic');

    //initialize controls
    controlsRef.current = new OrbitControls(camera.current, renderer.current.domElement);

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

    onWindowResize();

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("maximize", onWindowResize, false);

    animate();

    return () => {
      if(mountRef.current !== null) mountRef.current.removeChild(renderer.current.domElement);
      if(controlsRef.current !== undefined) controlsRef.current.dispose();
    };
  }, []);

  const updateScene = () => {
    console.log('update: ' + props.updateTrigger)
    console.log('update var: ' + updateView)
    if(updateView !== props.updateTrigger){
      console.log('UPDATIN!!!!!!!!!!!!!!!!!!')

      loadedModels.current.forEach((item: THREE.Object3D) => {
        scene.current.remove(item);
      })
  
      loadedModels.current = [];
  
      loadSurface(props?.layer?.sublayerObjects[props?.renderLayer]?.materialRemoved);

      setUpdateView(props.updateTrigger);
    }
  };

  const setIsLoaded = (status: boolean) => {
    isLoaded = status;
  }

  const loadSurface = (surface: string) => {

    if(isLoaded == true || isFirstLoad == true){

      setIsLoaded(false);

      if(surface !== '' && surface !== undefined){
        loader.load(`Models/${surface}.gltf`, (gltf) => {
          loadedModels.current.push(gltf.scene)

          gltfModelLeft.current = gltf.scene;
          gltfModelLeft.current.rotation.y = 3.14159;
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

          console.log(modifiedSurface);

          loader.load(`Models/${modifiedSurface}.gltf`, (gltf) => {
            loadedModels.current.push(gltf.scene);

            gltfModelRight.current = gltf.scene;
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
            scene.current.add(gltfModelRight.current);

            setIsLoaded(true);
          });
        }
      }
    }
  };

  updateScene();

  return (
    <>
      <div className='col-12 col-lg-7 viewport' ref={mountRef}></div>
    </>
  );
}
