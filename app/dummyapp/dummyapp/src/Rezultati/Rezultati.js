import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import "./Rezultati.css";

function Rezultati() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
		//setLoading(false);
	}, []);

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
		</>
	);
}

export default Rezultati;
