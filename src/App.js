import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import Nav from './components/nav';
import Dashboard from './components/dashboard';
import Message from './components/message';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import TokenManager from './utils/token-manager';
import { isSunday } from 'date-fns';
import {
  filterTodayPrices,
  filterPeriodPrices,
  lowestPrice,
  highestPrice,
} from './utils/filter-helpers';
import { getPrices, getUsers} from './utils/fetch-helpers';

import './styles/App.scss';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      prices: null,
      message: null,
      users: null,
      working: true,
    };
  }

  componentDidMount = async () => {
    this.handleLogin();
  }

  get isLoggedIn() {
    return this.state.user && TokenManager.isTokenValid();
  };

  toggleWorking = () => {
    this.setState({
      ...this.state,
      working: !this.state.working
    })
  }

  refreshPrices = async () => {
    this.toggleWorking();
    await this.getPrices();
    this.toggleWorking();
  }

  handleLogin = async () => {
    this.setState({
      ...this.state,
      user: TokenManager.getTokenPayload()
    }, () => {
      !this.isLoggedIn && this.handleLogout();
      this.isLoggedIn && this.getData();
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
      const periodPrices = isSunday(Date.now()) ? null : filterPeriodPrices(todayPrices);
      this.setState({
        ...this.state,
        prices: periodPrices || todayPrices,
        bestPrice: isSunday(Date.now()) ? lowestPrice(todayPrices) : highestPrice(periodPrices),
      })
  }

  getUsers = async () => {
    const users = await getUsers();
    this.setState({
      ...this.state,
      users,
    });
  }

  getData = async () => {
    await this.getUsers().then( async () => {
      await this.getPrices().then(() => {
        this.toggleWorking();
      })
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
                refreshPrices={this.refreshPrices}
                users={this.state.users}
                working={this.state.working}
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
