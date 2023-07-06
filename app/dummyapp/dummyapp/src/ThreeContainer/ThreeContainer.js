import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "../3luknje_h_d.glb";

const ThreeContainer = ({ gltfObject }) => {
	const containerRef = useRef(null);
	let isDragging = false;
	let previousMouseX = 0;
	let previousMouseY = 0;
	let rotationX = 0;
	let rotationY = 0;
	let mash1 = 0;
	let object = "../5_osna_vs_predfino.glb";

	useEffect(() => {
		console.log("gltfObject THREEEE: " + gltfObject);

		object = "http://" + gltfObject;

		const container = containerRef.current;

		container.style.width = "100%";
		container.style.height = "100%";

		//mouse rotation
		container.addEventListener("mousedown", handleMouseDown);
		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseup", handleMouseUp);

		function handleMouseDown(event) {
			isDragging = true;
			previousMouseX = event.clientX;
			previousMouseY = event.clientY;
		}

		function handleMouseMove(event) {
			if (!isDragging) return;

			const currentMouseX = event.clientX;
			const currentMouseY = event.clientY;

			const deltaX = currentMouseX - previousMouseX;
			const deltaY = currentMouseY - previousMouseY;

			rotationX += deltaY * 0.01;
			rotationY += deltaX * 0.01;

			previousMouseX = currentMouseX;
			previousMouseY = currentMouseY;
		}

		function handleMouseUp() {
			isDragging = false;
			console.log("mash1", mash1);
			//mash1.position.copy(scene.position);
		}

		//scene
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

		console.log("model", object);

		loader.load(
			object,
			(gltf) => {
				console.log("dela");
				const mash = gltf.scene;
				mash1 = mash;
				mash.scale.set(0.05, 0.05, 0.05);
				mash.position.set(0, -1, 0);
				mash.rotation.set(-0.8, 0, -0.2);
				var newMaterial = new THREE.MeshStandardMaterial({
					color: 0xa6a6a6,
				});
				mash.traverse((o) => {
					if (o.isMesh) o.material = newMaterial;
				});

				scene.add(mash);
				scene.background = new THREE.Color(0xffffff);
				function animate() {
					requestAnimationFrame(animate);

					// Apply the rotation to the object
					scene.rotation.x = previousMouseY * 0.01;
					scene.rotation.y = previousMouseX * 0.01;

					// Render the scene
					renderer.render(scene, camera);
				}
				animate();
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				console.log(error);
			}
		);

		camera.position.z = 5;

		const animate = function () {
			requestAnimationFrame(animate);

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			container.removeChild(renderer.domElement);
		};
	}, [gltfObject]);

	return <div ref={containerRef} />;
};

export default ThreeContainer;
