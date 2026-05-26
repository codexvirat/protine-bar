"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HomeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lighting Setup (Cinematic Biotech Lighting)
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00c2ff, 4.0);
    keyLight.position.set(5, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff3366, 2.5);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 2.0, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // 3. Create Procedural Protein Bar Mesh
    const barGroup = new THREE.Group();
    scene.add(barGroup);

    // 3a. The Core Chocolate Bar
    const chocolateGeo = new THREE.BoxGeometry(2.4, 0.8, 0.4, 16, 16, 4);
    // Add procedural surface noise to represent textured chocolate
    const pos = chocolateGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      
      // Bump noise
      const noise = Math.sin(x * 10) * Math.cos(y * 10) * 0.03;
      if (Math.abs(z) > 0.15) {
        pos.setZ(i, z + (z > 0 ? noise : -noise));
      }
    }
    chocolateGeo.computeVertexNormals();

    const chocolateMat = new THREE.MeshStandardMaterial({
      color: 0x1d140e,
      roughness: 0.8,
      metalness: 0.1,
      bumpScale: 0.05,
    });
    const chocolateMesh = new THREE.Mesh(chocolateGeo, chocolateMat);
    barGroup.add(chocolateMesh);

    // 3b. The Metallic Wrapper Left Section
    const wrapperLeftGeo = new THREE.BoxGeometry(1.3, 0.86, 0.46);
    const wrapperLeftMat = new THREE.MeshPhysicalMaterial({
      color: 0x07111f,
      roughness: 0.18,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const wrapperLeftMesh = new THREE.Mesh(wrapperLeftGeo, wrapperLeftMat);
    wrapperLeftMesh.position.x = -0.6;
    barGroup.add(wrapperLeftMesh);

    // 3c. The Metallic Wrapper Right Section (Foil wrapper opening)
    const wrapperRightGeo = new THREE.BoxGeometry(1.3, 0.86, 0.46);
    const wrapperRightMat = new THREE.MeshPhysicalMaterial({
      color: 0x00c2ff,
      roughness: 0.18,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const wrapperRightMesh = new THREE.Mesh(wrapperRightGeo, wrapperRightMat);
    wrapperRightMesh.position.x = 0.6;
    barGroup.add(wrapperRightMesh);

    // 4. Create Floating Molecular/Nutrient Particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const cyanColor = new THREE.Color(0x00c2ff);
    const crimsonColor = new THREE.Color(0xff3366);

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in a cylinder around the bar
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 3.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation
      const mixedColor = Math.random() > 0.5 ? cyanColor : crimsonColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom shader material for glowing particle points
    const pMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particleSystem);

    // 5. Scroll Interaction Handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const p = scrollProgress.current;

      // Rotate group gently in idle state
      barGroup.rotation.y = elapsedTime * 0.15 + p * Math.PI * 1.5;
      barGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.1 + p * 0.5;
      barGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.05 + p * 0.2;

      // Separate wrappers dynamically as scroll increases (Tear wrapper effect)
      // Transition range: 0.05 to 0.4 scroll progress
      const wrapperTear = Math.max(0, Math.min(1, (p - 0.05) / 0.35));
      wrapperLeftMesh.position.x = -0.6 - wrapperTear * 1.8;
      wrapperRightMesh.position.x = 0.6 + wrapperTear * 1.8;
      
      // Rotate wrappers outward as they pull away
      wrapperLeftMesh.rotation.y = -wrapperTear * 0.5;
      wrapperRightMesh.rotation.y = wrapperTear * 0.5;

      // Fade wrappers slightly as they split off (simulating camera refocusing on chocolate)
      wrapperLeftMat.opacity = 1.0 - wrapperTear * 0.3;
      wrapperRightMat.opacity = 1.0 - wrapperTear * 0.3;

      // Gentle camera zoom-in/out based on scroll progress
      camera.position.z = 8.0 - p * 3.0;
      camera.position.y = Math.sin(p * Math.PI) * 0.5;

      // Animate floating particles
      const positionsArr = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Slow float up
        positionsArr[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.002;
        // Orbit rotation
        const x = positionsArr[i * 3];
        const z = positionsArr[i * 3 + 2];
        const theta = 0.002 * (1 + (i % 3)); // speed
        positionsArr[i * 3] = x * Math.cos(theta) - z * Math.sin(theta);
        positionsArr[i * 3 + 2] = x * Math.sin(theta) + z * Math.cos(theta);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Pulse Pointlight
      pointLight.intensity = 1.5 + Math.sin(elapsedTime * 3) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      chocolateGeo.dispose();
      chocolateMat.dispose();
      wrapperLeftGeo.dispose();
      wrapperLeftMat.dispose();
      wrapperRightGeo.dispose();
      wrapperRightMat.dispose();
      particleGeometry.dispose();
      pMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* ThreeJS Container */}
      <div ref={containerRef} className="w-full h-full" />
      
      {/* 3D Hud Overlay UI */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#00C2FF] flex flex-col gap-1 tracking-widest select-none pointer-events-none opacity-40">
        <span>RENDER_ENGINE: WEBGL_2.0</span>
        <span>OBJECT: FORMULA_CELL_MATRIX</span>
        <span>MESH_VERTS: 3,248</span>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-zinc-600 flex flex-col gap-1 tracking-widest text-right select-none pointer-events-none">
        <span>AESTHETIX CORE TELEMETRY</span>
        <span>ROTATION: AUTORUN_X_Y</span>
      </div>
    </div>
  );
}
