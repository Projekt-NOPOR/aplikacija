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
import { useParams } from "react-router-dom";
import axios from "axios";

function Rezultati() {
	const name = useParams();
	console.log("Project name: " + name.project_name);

	const [loading, setLoading] = useState(true);
	const [data2, setData2] = useState();

	var [selectedGltfObject, setSelectedGltfObject] = useState(null);

	function handleGltfObjectChange(gltfObject) {
		console.log("handleGltfObjectChange" + gltfObject);
		setSelectedGltfObject(gltfObject);
	}

	useEffect(() => {
		if (
			name.project_name === undefined ||
			name.project_name === null ||
			name.project_name === "" ||
			name.project_name === "*"
		) {
			name.project_name = "test";
		}
		const fetchData = axios
			.post(
				"http://46.182.227.40:5000//projects/get_data/",
				{ project_name: name.project_name },
				{
					headers: {
						"access-control-allow-origin": "*",
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				setData2(response.data);
				setSelectedGltfObject(response.data.deli[0].gltf);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);
	console.log(data2);
	return loading ? (
		<Loader />
	) : (
		<>
			<div className="App">
				<header className="Rezultati-header" id="header">
					<h1>Stran Rezultati</h1>
					<Link to="/">
						<Button variant="primary">Back</Button>{" "}
					</Link>
				</header>
			</div>
			<div className="container">
				<VolumesList
					volumes={data2.deli}
					click={handleGltfObjectChange}
					selectedGltfObject={selectedGltfObject}
				/>
				<div className="canvas">
					<ThreeContainer gltfObject={selectedGltfObject} />
				</div>
			</div>
		</>
	);
}

export default Rezultati;
