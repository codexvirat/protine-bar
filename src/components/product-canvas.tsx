"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ProductCanvasProps {
  color: string;
}

export default function ProductCanvas({ color }: ProductCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const themeLight = new THREE.DirectionalLight(new THREE.Color(color), 4.0);
    themeLight.position.set(-5, -3, -2);
    scene.add(themeLight);

    const specularLight = new THREE.PointLight(0xffffff, 2.0, 8);
    specularLight.position.set(0, 0, 3);
    scene.add(specularLight);

    // 3. Create the Protein Bar Mesh
    const barGroup = new THREE.Group();
    scene.add(barGroup);

    // 3a. Inner textured core (Chocolate)
    const chocolateGeo = new THREE.BoxGeometry(2.0, 0.64, 0.32, 8, 8, 2);
    // Rough up the chocolate mesh slightly
    const pos = chocolateGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      if (Math.abs(z) > 0.1) {
        const noise = Math.sin(x * 12) * 0.02;
        pos.setZ(i, z + (z > 0 ? noise : -noise));
      }
    }
    chocolateGeo.computeVertexNormals();

    const chocolateMat = new THREE.MeshStandardMaterial({
      color: 0x1d140e,
      roughness: 0.9,
      metalness: 0.05,
    });
    const chocolateMesh = new THREE.Mesh(chocolateGeo, chocolateMat);
    barGroup.add(chocolateMesh);

    // 3b. Outer Foil wrapper (Partial reveal of chocolate)
    const wrapperGeo = new THREE.BoxGeometry(1.4, 0.68, 0.36);
    const wrapperMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
    });
    const wrapperMesh = new THREE.Mesh(wrapperGeo, wrapperMat);
    wrapperMesh.position.x = -0.55; // reveal right end
    barGroup.add(wrapperMesh);

    // 4. Floating Molecular Nodes
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeCount = 5;
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.5,
    });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMaterial);
      
      // Orbit specs
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.4;
      nodeMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.2, Math.sin(angle) * radius);
      
      nodesGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    }

    // 5. Interactive Drag controls variables
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousPointerPosition.x,
        y: e.clientY - previousPointerPosition.y,
      };

      // Direct drag rotation
      barGroup.rotation.y += deltaMove.x * 0.007;
      barGroup.rotation.x += deltaMove.y * 0.007;

      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    containerRef.current.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate bar gently when not dragging
      if (!isDragging) {
        barGroup.rotation.y += 0.005;
        barGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;
      }

      // Rotate nodes around the bar
      nodesGroup.rotation.y = elapsedTime * 0.2;
      nodes.forEach((node, idx) => {
        node.position.y += Math.sin(elapsedTime * 2 + idx) * 0.002;
      });

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

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      
      if (containerRef.current) {
        containerRef.current.removeEventListener("pointerdown", handlePointerDown);
        if (renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }

      chocolateGeo.dispose();
      chocolateMat.dispose();
      wrapperGeo.dispose();
      wrapperMat.dispose();
      nodeMaterial.dispose();
      nodes.forEach(node => node.geometry.dispose());
      renderer.dispose();
    };
  }, [color]);

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute inset-0 border border-white/[0.02] rounded-2xl pointer-events-none" />
      <div className="absolute top-3 left-3 bg-[#020204]/60 border border-white/[0.05] rounded-md px-2 py-1 text-[8px] font-mono text-zinc-400 pointer-events-none tracking-widest uppercase">
        DRAG TO INSPECT TEXTURES
      </div>
    </div>
  );
}
