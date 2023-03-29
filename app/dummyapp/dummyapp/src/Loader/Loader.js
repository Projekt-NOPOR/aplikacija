import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className='App'>
      <header className='App-header'>
    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </header>
    </div>
  );
}

export default Loader;
