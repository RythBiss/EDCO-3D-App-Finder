import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export default function Viewport(props: any) {
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModelRight = useRef();
  const gltfModelLeft = useRef();
  const loader = new GLTFLoader();
  const fontLoader = new FontLoader();
  const controlsRef = useRef();
  const loadedModels = useRef([]);
  
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

      const geometry = new TextGeometry( 'After', {
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
      const geometry2 = new TextGeometry( 'Before', {
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

      const textMesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }))
      const textMesh2 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }))

      scene.current.add(textMesh);
      scene.current.add(textMesh2);
      textMesh.position.set(0.3,0,-1.05)
      textMesh2.position.set(-0.7,0,-1.05)
      textMesh.rotation.x = -3.14159/2
      textMesh2.rotation.x = -3.14159/2
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
      mountRef.current.removeChild(renderer.current.domElement);
      controlsRef.current.dispose();
    };
  }, []);

  const updateScene = () => {
    loadedModels.current.forEach((item) => {
      scene.current.remove(item);
    })

    loadedModels.current = [];

    //old model clean up, keep for now just in case
    // if (scene.current.children.includes(gltfModelRight.current)) {
    //   scene.current.remove(gltfModelRight.current);
    // }
    // if (scene.current.children.includes(gltfModelLeft.current)) {
    //   scene.current.remove(gltfModelLeft.current);
    // }

    loadSurface(props?.layer?.sublayerObjects[props?.renderLayer]?.materialRemoved);
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
          loader.load(`Models/${props?.layer?.sublayers[props?.renderLayer+1]}.gltf`, (gltf) => {
            loadedModels.current.push(gltf.scene)

            gltfModelRight.current = gltf.scene;
            scene.current.add(gltfModelRight.current);

            setIsLoaded(true);
          });
        }else{
          loader.load(`Models/${surface}.gltf`, (gltf) => {
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
      <div className='col-7 viewport' ref={mountRef}></div>
    </>
  );
}
