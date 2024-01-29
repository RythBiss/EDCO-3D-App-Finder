import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Viewport(props: any) {
  const mountRef = useRef(null);
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, 1, 0.01, 1000));
  const renderer = useRef(new THREE.WebGLRenderer());
  const gltfModelRight = useRef();
  const gltfModelLeft = useRef();
  const loader = new GLTFLoader();
  const controlsRef = useRef();

  useEffect(() => {
    document.body.appendChild(renderer.current.domElement);

    //init the renderer
    if(mountRef.current){
      renderer.current.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
      mountRef.current.appendChild(renderer.current.domElement);
    }
    renderer.current.shadowMap.enabled = true;

    //build environment
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    const ambLight = new THREE.AmbientLight(0xffffff, 0.25);

    scene.current.add(light);
    scene.current.add(directionalLight);
    scene.current.add(ambLight);
    scene.current.background = new THREE.Color("rgb(90%, 90%, 90%)");
    light.position.set(1, 1, 1).normalize();

    camera.current.position.z = 2.05;

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

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("maximize", onWindowResize, false);

    animate();

    return () => {
      mountRef.current.removeChild(renderer.current.domElement);
      controlsRef.current.dispose();
    };
  }, []);

  const updateScene = () => {
    if (scene.current.children.includes(gltfModelRight.current)) {
      scene.current.remove(gltfModelRight.current);
    }
    if (scene.current.children.includes(gltfModelLeft.current)) {
      scene.current.remove(gltfModelLeft.current);
    }

    loadSurface(props?.layer?.materialRemoved);
  };

  const loadSurface = (surface) => {
    loader.load(`Models/${surface}.gltf`, (gltf) => {
      gltfModelRight.current = gltf.scene;
      scene.current.add(gltfModelRight.current);
    });

    loader.load(`Models/${surface}.gltf`, (gltf) => {
      gltfModelLeft.current = gltf.scene;
      gltfModelLeft.current.rotation.y = 3.14159;
      scene.current.add(gltfModelLeft.current);
    });
  };

  updateScene();

  return (
    <>
      <div className='col-7 viewport' ref={mountRef}></div>
    </>
  );
}
