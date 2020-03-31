import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
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

  get isLoggedIn() {
    return this.state.user && TokenManager.isTokenValid();
  };

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayload() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav isLoggedIn={this.isLoggedIn} />
        <Switch>
          <Route
            path='/login'
            exact
            render={props => <Login {...props} onLogin={this.handleLogin} />}
          />
          <Route
            path='/signup'
            exact
            render={props => <SignUp {...props} onLogin={this.handleLogin} />}
          />
        </Switch>
      </div>
    </ThemeProvider>
    )
}

export default App;
