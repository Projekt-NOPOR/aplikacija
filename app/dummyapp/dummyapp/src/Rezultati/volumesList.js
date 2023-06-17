import React from 'react';
import { Accordion } from 'react-bootstrap';

const VolumesList = ({ volumes }) => {
  return (
    <Accordion  defaultActiveKey="" >
      {volumes.map((volume, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header >{volume.volumen}</Accordion.Header>
          <Accordion.Body>
            <ul style={{ listStyle: 'none', textAlign: 'center' }}>
              {volume.postopki.map((postopek, subIndex) => (
                <li key={subIndex} style={{ textAlign: 'left' }}>
                  <div style={{ display: 'inline-block', textAlign: 'center' }}>
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
