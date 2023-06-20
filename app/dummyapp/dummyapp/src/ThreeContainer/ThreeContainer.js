import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeContainer = ({ gltfObject }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		container.style.width = "100%";
		container.style.height = "100%";

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const loader = new GLTFLoader();
		const jsonGltfObject = JSON.stringify(gltfObject);
		const gltfJson = JSON.parse(jsonGltfObject);

		loader.parse(
			gltfJson,
			"",
			(gltf) => {
				scene.add(gltf.scene);
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				console.log(error);
			}
		);

		camera.position.z = 5;
		console.log("camera.position.z = 5;");

		const animate = function() {
			requestAnimationFrame(animate);

			//console.log("animate");
			//console.log(scene);
			renderer.render(scene, camera);
		};

		animate();

		return () => {
			container.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={containerRef} />;
};

export default ThreeContainer;
