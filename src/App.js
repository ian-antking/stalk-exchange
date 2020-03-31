import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';

import './styles/App.scss';

class App extends React.Component{
  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav />
        <h1>Stalk Market</h1>
        <h2>coming soon!</h2>
      </div>
    </ThemeProvider>
    )
}

export default App;
