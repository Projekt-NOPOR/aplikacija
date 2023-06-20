import React from "react";
import { Accordion } from "react-bootstrap";
import ThreeContainer from "../ThreeContainer/ThreeContainer";

const VolumesList = ({ volumes, click }) => {
	const handleItemClick = (gltfObject) => {
		console.log("Clicked on item", gltfObject);
		click(gltfObject);
	};

	return (
		<Accordion defaultActiveKey="">
			{volumes.map((volume, index) => (
				<Accordion.Item
					key={index}
					eventKey={index.toString()}
					onClick={() => handleItemClick(index)} // Assign the click event correctly
				>
					<Accordion.Header>{volume.volumen}</Accordion.Header>
					<Accordion.Body>
						<ul style={{ listStyle: "none", textAlign: "center" }}>
							{volume.postopki.map((postopek, subIndex) => (
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
										{postopek.postopek} : {postopek.cas}
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
