import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import TokenManager from './utils/token-manager';

import './styles/App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = () => {
    this.handleLogin();
  }

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayload() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  isLoggedIn = () => {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  };

  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav />
        <Switch>
          <Route
            path='/login'
            ecact
            render={props => <Login {...props} onLogin={this.handleLogin} />}
          />
        </Switch>
      </div>
    </ThemeProvider>
    )
}

export default App;
