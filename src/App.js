import React from 'react';
import Nav from './components/nav';

import './styles/App.scss';

class App extends React.Component{
  render = () => (
      <div className='App'>
        <Nav />
        <h1>Stalk Market</h1>
        <h2>coming soon!</h2>
      </div>
    )
}

export default App;
