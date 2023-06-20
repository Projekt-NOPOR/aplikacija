import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./button-style.css";
import data from "../deli.json";
import VolumesList from "./volumesList";
import ThreeContainer from "../ThreeContainer/ThreeContainer";
import "./Rezultati.css";

function Rezultati() {
	const [loading, setLoading] = useState(true);

	var [selectedGltfObject, setSelectedGltfObject] = useState(null);
	selectedGltfObject = data.deli[2].gltf;
	console.log(selectedGltfObject);

	function handleGltfObjectChange(gltfObject) {
		//console.log("handleGltfObjectChange", gltfObject);
		setSelectedGltfObject(data.deli[gltfObject].gltf);
	}

	useEffect(() => {
		fetchTreeData();
	}, []);

	const fetchTreeData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/get_data");
			if (response.ok) {
				const jsonTreeData = await response.json();
				setLoading(false);
			} else {
				console.error("Failed to fetch tree data");
				setLoading(false);
			}
		} catch (error) {
			console.error("Error while fetching tree data:", error);
			setLoading(false);
		}
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className="App">
				<header className="App-header" id="header">
					<h1>Stran Rezultati</h1>
					<Link to="/">
						<Button variant="primary">Back</Button>{" "}
					</Link>
				</header>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<VolumesList
							volumes={data.deli}
							click={handleGltfObjectChange}
							selectedGltfObject={selectedGltfObject}
						/>
						{console.log(data)}
					</div>
					<div className="col-sm-6">
						<ThreeContainer
							key={selectedGltfObject}
							gltfObject={selectedGltfObject}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Rezultati;
