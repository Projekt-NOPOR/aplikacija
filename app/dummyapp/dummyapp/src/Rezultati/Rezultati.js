import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Rezultati.css";


import DecisionTree from './DecisionTree';
function Rezultati() {
	const [loading, setLoading] = useState(true);
	const [treeData, setTreeData] = useState(null);

	useEffect(() => {
		fetchTreeData(); // Fetch the tree data when the component mounts
	}, []);

	const fetchTreeData = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/tree");
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

				<div style={{ height: '100%', 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', }}>
					<div style={{ flexBasis: '50%'}}>
						<div>
						<h1> Pie Chart</h1>
						
						</div>
						
					</div>
					<div style={{ flexBasis: '50%' ,
						justifyContent: 'center', 
						alignItems: 'center',}}>
						{treeData && (
							<div className="tree-container">
								<h1>Tree</h1>
								
								<div>
									{ <DecisionTree treeData={treeData} />}
								</div>
								{/*<pre>{JSON.stringify(treeData, null, 2)}</pre>*/}
							</div>
						)}
					</div>
				</div>
				<div style={{ height: '100%', 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', }}>
					<div style={{ flexBasis: '50%' }}>
						<div>razlaga</div>
					</div>
					<div style={{ flexBasis: '50%' }}>
						<div>alternative</div>
					</div>
				</div>


				
			</div>
		</>
	);
}

export default Rezultati;
