import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./button-style.css";
import data from "../deli.json";

function Rezultati() {
	const [loading, setLoading] = useState(true);
	const [treeData, setTreeData] = useState(null);

	useEffect(() => {
		fetchTreeData(); // Fetch the tree data when the component mounts
	}, []);

	const fetchTreeData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/get_data");
			if (response.ok) {
				const jsonTreeData = await response.json();
				setTreeData(jsonTreeData);
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

	const renderOtherComponent = () => {
		// Render the OtherComponent in another file
		//TO DO prikaz alternative
		const otherDiv = document.getElementById("alternative");
		renderOtherComponent();
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className="App">
				<header className="App-header">
					<h1>Stran Rezultati</h1>
					<Link to="/">
						<Button variant="primary">Back</Button>{" "}
					</Link>
				</header>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-sm-6">{console.log(data)}</div>
					<div className="col-sm-6">
						<canvas></canvas>
					</div>
				</div>
			</div>
		</>
	);
}

export default Rezultati;
