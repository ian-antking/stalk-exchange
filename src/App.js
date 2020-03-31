import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import TokenManager from './utils/token-manager';
import apiString from './utils/api-string';

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
    this.getPrices()
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  getPrices = () => {
    window.fetch(`${apiString}/price`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TokenManager.getToken(),
      }
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav isLoggedIn={this.isLoggedIn} />
        <Switch>
          <Route exact path="/">
            {this.isLoggedIn ? <Redirect to="/dashboard" /> : props => <SignUp {...props} onLogin={this.handleLogin} />}
          </Route>
          <Route exact path="/dashboard">
            {!this.isLoggedIn ? <Redirect to="/" /> : props => <h1>Dashboard</h1>}
          </Route>
          <Route
            path='/login'
            exact
            render={props => <Login {...props} onLogin={this.handleLogin} />}
          />
        </Switch>
      </div>
    </ThemeProvider>
    )
}

export default App;
