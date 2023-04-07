import React from 'react';
import './index.css';
import './App.css';

import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo.jsx';
import PlayerForm from './components/forma/PlayerForm';
import PlayerList from './components/PlayerList/PlayerList';

const App = () => {
  return (
    <>
      <BackgroundVideo />
      <div className="content">
        <h1 className='flag'>Welcome to G.O.A.T football coach, Alehandro del Busha !</h1>
        <p>Here you can fill up information about a player</p>

        <PlayerForm />
        <PlayerList/>
      </div>
    </>
  );
};

export default App