import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import React from 'react';


function Home() {
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
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<label htmlFor="formFileLg" className="form-label">
						Naložite excel datoteko
					</label>
					<input
						className="form-control form-control-lg"
						id="formFileLg"
						type="file"
						accept=".txt, .csv, .xlsx"
					/>
				</div>
				<Link to="/rezultati">
					<Button
						className="uploadBtn"
						variant="primary"
						onClick={uploadFile}
					>
						Upload
					</Button>{" "}
				</Link>
			</header>
		</div>
	);
}

export default Home;
