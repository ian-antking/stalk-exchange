import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';

import './styles/App.scss';

class App extends React.Component{
  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav />
        <Switch>
          <Route
            path='/'
            ecact
            render={props => <Login {...props} />}
          />
        </Switch>
      </div>
    </ThemeProvider>
    )
}

export default App;
