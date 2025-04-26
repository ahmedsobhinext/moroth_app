// components/CubePanorama.js
'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CubePanorama = ({ id }) => {
  const mountRef = useRef(null);
  console.log('Current ID:', id);

  useEffect(() => {
    const container = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = 0.01;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Load cube texture based on id
    const loader = new THREE.CubeTextureLoader();
    let texturePaths = [];

    switch (id) {
      case 'a7Wfu3uwFHsjzcgwvtEZ':
        texturePaths = [
          '/cube/px.png',
          '/cube/nx.png',
          '/cube/py.png',
          '/cube/ny.png',
          '/cube/pz.png',
          '/cube/nz.png',
        ];
        break;
      case 'cy9QKPXXQMozFvVVL2XK':
        texturePaths = [
          '/cube1/px.png',
          '/cube1/nx.png',
          '/cube1/py.png',
          '/cube1/ny.png',
          '/cube1/pz.png',
          '/cube1/nz.png',
        ];
        break;
      case 'CM0Pf08e0ycroA0KSCbm':
        texturePaths = [
          '/cube2/px.png',
          '/cube2/nx.png',
          '/cube2/py.png',
          '/cube2/ny.png',
          '/cube2/pz.png',
          '/cube2/nz.png',
        ];
        break;
      case 'bwpqZa7GMAVfMjXJRx8t':
        texturePaths = [
          '/cube4/px.png',
          '/cube4/nx.png',
          '/cube4/py.png',
          '/cube4/ny.png',
          '/cube4/pz.png',
          '/cube4/nz.png',
        ];
        break;
      // default:
      //   console.warn('Invalid id provided, loading default cube1');
      //   texturePaths = [
      //     '/cube1/px.png',
      //     '/cube1/nx.png',
      //     '/cube1/py.png',
      //     '/cube1/ny.png',
      //     '/cube1/pz.png',
      //     '/cube1/nz.png',
      //   ];
      //   break;
    }

    const texture = loader.load(texturePaths);
    scene.background = texture;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, [id]); // <--- re-run useEffect when id changes!

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CubePanorama;
