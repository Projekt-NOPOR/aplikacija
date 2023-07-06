import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getProjects = axios
			.get("http://46.182.227.40:5000/projects/list/")
			.then((response) => {
				console.log(response);
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	function getToken(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(
						cookie.substring(name.length + 1)
					);
					break;
				}
			}
		}
		return cookieValue;
	}

	const token = getToken("csrftoken");
	async function uploadFile() {
		const file = document.getElementById("formFileLg").files[0];
		const formData = new FormData();
		formData.append("file", file);
		const response = await Axios.post(
			"http://127.0.0.1:8000/get_data",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					"X-CSRFToken": token,
					Authorization: "Token " + Cookies.get("token"),
				},
			}
		);
		console.log(response.data);
	}

	return loading ? (
		<Loader />
	) : (
		<div className="App">
			<header className="Home-header">
				<div>
					<label htmlFor="formFileLg" className="form-label">
						Naložite excel datoteko
					</label>
					<input
						className="form-control form-control-lg"
						id="formFileLg"
						type="file"
						accept=".step, .stp"
					/>
				</div>
				<Link to="/rezultati/*">
					<Button
						className="uploadBtn"
						variant="primary"
						onClick={uploadFile}
					>
						Upload
					</Button>{" "}
				</Link>
			</header>
			<ul className="list-group">
				{data.projects.map((item, index) => (
					<Link to={"/rezultati/" + item}>
						<li className="list-group-item" key={index}>
							{item}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}

export default Home;
