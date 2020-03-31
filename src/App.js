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
import { format } from 'date-fns';
import {
  isSunday,
  sameDay,
} from './utils/date-helpers';

import './styles/App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      priced: null,
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
    const action = isSunday() ? 'buy' : 'sell';
    const url = `${apiString}/price?type=${action}`;
    window.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': TokenManager.getToken(),
      }
    })
    .then(res => res.json())
    .then(data => {
      const todayPrices = data.filter(price => {
        return sameDay(price.date, Date.now());
      })
      const currentPrices = isSunday() ? null : todayPrices.filter(price => {
        return format(price.date, 'a..aaa') === format(Date.now(), 'a..aaa');
      })
      console.log(currentPrices);
      this.setState({
        ...this.state,
        prices: currentPrices || todayPrices,
      })
    });
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
