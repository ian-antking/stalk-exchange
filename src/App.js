import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from './utils/theme';
import { Box } from 'rebass';
import Nav from './components/nav';
import Dashboard from './components/dashboard';
import Message from './components/message';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/sign-up';
import TokenManager from './utils/token-manager';
import { getUsers, patchUser } from './utils/fetch-helpers';
import Profile from './components/profile';


import './styles/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: true,
    };
  }

  componentDidMount = async () => {
    this.handleLogin();
  };

  get isLoggedIn() {
    return TokenManager.isTokenValid();
  }

  toggleWorking = (state = !this.state.working) => {
    this.setState({
      ...this.state,
      working: state,
    });
  };

  handleLogin = () => {
    this.isLoggedIn && this.getUsers();
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  setMessage = (messageText, error) => {
    const message = messageText ? { text: messageText, error } : null;
    this.setState({
      ...this.state,
      message,
    });
  };

  getUsers = async () => {
    this.toggleWorking(true);
    const users = await getUsers();
    const user = users.find(user => user._id === TokenManager.getTokenPayload()._id)
    this.setState({
      ...this.state,
      users,
      user,
    });
    this.toggleWorking(false);
  };

  updateUser = async (body) => {
    await patchUser(JSON.stringify(body)).then((res) => {
      const message = body.dodoCode
        ? `Submitted new DodoCode: ${res.dodoCode}`
        : 'DodoCode Removed';
      this.setMessage(message);
      this.getUsers();
    });
  };

  render = () => (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Nav isLoggedIn={this.isLoggedIn} user={this.state.user} />
        {this.state.message && <Message message={this.state.message} />}
        <Switch>
          <Route exact path="/">
            {this.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              (props) => {
                return (
                  <Login
                    {...props}
                    onLogin={this.handleLogin}
                    setMessage={this.setMessage}
                  />
                );
              }
            )}
          </Route>
          <Route exact path="/dashboard">
            {!this.isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              (props) => (
                <Dashboard
                  {...props}
                  user={this.state.user}
                  setMessage={this.setMessage}
                  refreshPrices={this.getUsers}
                  users={this.state.users}
                  working={this.state.working}
                  updateUser={this.updateUser}
                />
              )
            )}
          </Route>
          <Route
            path="/sign-up"
            exact
            render={props => {
              return (
                <SignUp
                  {...props}
                  onLogin={this.handleLogin}
                  setMessage={this.setMessage}
                />
              );
            }}
          />
          <Route
            path="/user"
            render={props => (
              <Profile
                {...props}
                loggedIn={this.isLoggedIn}
                users={this.state.users}
              />
            )}
          />
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
