import React from "react";
import { Accordion } from "react-bootstrap";
import ThreeContainer from "../ThreeContainer/ThreeContainer";

const VolumesList = ({ volumes, click }) => {
	const handleItemClick = (gltfObject) => {
		click(gltfObject);
	};

	console.log("VolumesList: " + volumes);

	return (
		<Accordion defaultActiveKey="">
			{volumes.map((del, index) => (
				<Accordion.Item
					key={index}
					eventKey={index.toString()}
					onClick={() => handleItemClick(del.gltf)} // Assign the click event correctly
				>
					<Accordion.Header>{del.objekt}</Accordion.Header>
					<Accordion.Body>
						<ul style={{ listStyle: "none", textAlign: "center" }}>
							{del.postopki.map((postopek, subIndex) => (
								<li
									key={subIndex}
									style={{ textAlign: "left" }}
								>
									<div
										style={{
											display: "inline-block",
											textAlign: "center",
										}}
									>
										{postopek.postopek} : {postopek.volumen}
									</div>
								</li>
							))}
						</ul>
					</Accordion.Body>
				</Accordion.Item>
			))}
		</Accordion>
	);
};

export default VolumesList;
