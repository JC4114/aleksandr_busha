import React from 'react';
import './index.css';
import './App.css';

import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo.jsx';
import PlayerForm from './components/forma/PlayerForm';
import Diagram from './components/forma/diagram/diagram';

const App = () => {
  return (
    <>
      <BackgroundVideo />
      <div className="content">
        <h1 className='flag'>Welcome to G.O.A.T football coach, Alehandro del Busha !</h1>
        <p>Here you can fill up information about a player</p>

        <div className='player-form-container'>
        <PlayerForm />
        <div className="shapes-container">
        <div className="ten-gon"> </div>
          <Diagram/>
        </div>
        </div>
      </div>
    </>
  );
};

export default App