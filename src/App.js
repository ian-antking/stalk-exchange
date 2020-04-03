import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import Dashboard from './components/dashboard';
import Message from './components/message';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import TokenManager from './utils/token-manager';
import {
  isSunday,
} from './utils/date-helpers';
import {
  filterTodayPrices,
  filterPeriodPrices,
  lowestPrice,
  highestPrice,
} from './utils/filter-helpers';
import { getPrices } from './utils/fetch-helpers';

import './styles/App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      prices: null,
      message: null,
    };
  }

  componentDidMount = () => {
    this.handleLogin();
  }

  get isLoggedIn() {
    return this.state.user && TokenManager.isTokenValid();
  };

  handleLogin = () => {
    this.setState({
      ...this.state,
      user: TokenManager.getTokenPayload()
    }, () => {
      !this.isLoggedIn && this.handleLogout();
      this.isLoggedIn && this.getPrices()
    });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  setMessage = (messageText, error = false) => {
    this.setState({
      ...this.state,
      message: {
        text: messageText,
        error,
      }
    })
  }

  getPrices = async () => {
      const data = await getPrices();
      const todayPrices = data ? filterTodayPrices(data) : [];
      const periodPrices = isSunday() ? null : filterPeriodPrices(todayPrices);
      this.setState({
        ...this.state,
        prices: periodPrices || todayPrices,
        bestPrice: isSunday() ? lowestPrice(todayPrices) : highestPrice(periodPrices),
      })
  }

  render = () => (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Nav isLoggedIn={this.isLoggedIn} />
        { this.state.message && <Message message={this.state.message} /> }
        <Switch>
          <Route exact path="/">
            {this.isLoggedIn ? <Redirect to="/dashboard" /> : props => {
              return <SignUp
                {...props}
                onLogin={this.handleLogin}
                setMessage={this.setMessage}
              />}
            }
          </Route>
          <Route exact path="/dashboard">
            {!this.isLoggedIn ? <Redirect to="/" /> : props => (
              <Dashboard
                {...props}
                user={this.state.user}
                prices={this.state.prices}
                bestPrice={this.state.bestPrice}
                setMessage={this.setMessage}
                getPrices={this.getPrices}
              />
            )}
          </Route>
          <Route
            path='/login'
            exact
            render={props => {
                return <Login
                  {...props}
                  onLogin={this.handleLogin}
                  setMessage={this.setMessage}
                />
              }
            }
          />
        </Switch>
      </div>
    </ThemeProvider>
    )
}

export default App;
