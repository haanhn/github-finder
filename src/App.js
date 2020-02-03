import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    loading: false,
    user: {},
    users: [],
    alert: null
  }

  // async componentDidMount() {
  //   console.log('B4 App_compDidMount()');
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //   this.setState({loading: true});
  //   //Cach 1:
  //   // axios.get('https://api.github.com/users').then(res => console.log(res.data));

  //   //Cach 2:
  //   const  res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false });

  //   console.log('After App_compDidMount()');
  // }

  render() {
    console.log('App_render()');
    //destructuring this.state
    const {users, user, loading} = this.state;
    return (
      <Router>
      <div className="App">
          <Navbar iconClass='fab fa-github-alt' />

          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers.bind(this)}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:loginName'
                render={(abc) => (
                  <User  randomName={abc.match} getUser={this.getUser} user={user}/>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  //Search Users
  searchUsers = async (value) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${value}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const users = res.data.items;
    this.setState({ users: users, loading: false });
  }

  //Get a single User
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const user = res.data;
    console.log(user);
    this.setState({ user: user, loading: false });
  }

  //Clear Users
  clearUsers = () => {
    this.setState({ users: [] });
  }

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({
      alert: { msg: msg, type: type }
    });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  }
}

export default App;
