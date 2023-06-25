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

	useEffect(() => {
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
			mash1.position.copy(scene.position);
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

		//console.log("To je: ", gltfObject);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const loader = new GLTFLoader();

		const gltfString = Uint8Array.from(atob(gltfObject), (c) =>
			c.charCodeAt(0)
		);
		//console.log("gltfString", gltfString);
		const jsonGltfObject = JSON.stringify(gltfString);
		const gltfJson = JSON.parse(jsonGltfObject);
		//console.log("gltfJson", gltfObject);

		console.log("model", model);

		loader.load(
			model,
			(gltf) => {
				const mash = gltf.scene;
				mash1 = mash;
				mash.scale.set(0.07, 0.07, 0.07);
				mash.position.set(0, -1, 0);
				mash.rotation.set(-0.8, 0, -0.2);
				var newMaterial = new THREE.MeshStandardMaterial({
					color: 0xe79548,
				});
				mash.traverse((o) => {
					if (o.isMesh) o.material = newMaterial;
				});

				scene.add(mash);
				scene.background = new THREE.Color(0xffffff);
				function animate() {
					requestAnimationFrame(animate);

					// Calculate the rotation angles based on mouse movement
					//	rotationX = mouseY * 0.5;
					//	rotationY = mouseX * 0.5;

					// Apply the rotation to the object
					scene.rotation.x = previousMouseY * 0.01;
					scene.rotation.y = previousMouseX * 0.01;

					// Render the scene
					renderer.render(scene, camera);
				}
				animate();

				//console.log("gltf.scene", mash);
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				console.log(error);
			}
		);
		/*
		loader.parse(
			gltfJson,
			"",
			(gltf) => {
				const mash = gltf.scene;
				mash.scale.set(0.07, 0.07, 0.07);
				mash.position.set(0, -1, 0);
				mash.rotation.set(-0.8, 0, -0.2);
				var newMaterial = new THREE.MeshStandardMaterial({
					color: 0xff0000,
				});
				mash.traverse((o) => {
					if (o.isMesh) o.material = newMaterial;
				});
				scene.add(mash);
				//console.log("gltf.scene", mash);
			},
			(xhr) => {
				//console.log("ta je error: " + xhr);
				//console.log("xhr", xhr);
				//console.log("xhr.loaded", xhr.loaded);
				//console.log("xhr.total", xhr.total);
				//console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				console.log(error);
			}
		);*/

		//console.log("gltfObject", scene);

		camera.position.z = 5;
		//console.log("camera.position.z = 5;");

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
