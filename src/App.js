import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

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

  //Search Users
  const searchUsers = async (value) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${value}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    const users = res.data.items;
    // this.setState({ users: users, loading: false });
    setUsers(users);
    setLoading(false);
  }

  //Get a single User
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({ user: res.data, loading: false });
    setUser(res.data);
    setLoading(false);
  }

  //Get User's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  }

  //Clear Users
  const clearUsers = () => {
    // this.setState({ users: [] });
    setUsers([]);
    setLoading(false);
  }

  //Set Alert
  const showAlert = (msg, type) => {
    // this.setState({
    //   alert: { msg: msg, type: type }
    // });
    setAlert({ msg: msg, type: type });
    
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }


  console.log('App_render()');
  return (
    <Router>
      <div className="App">
        <Navbar iconClass='fab fa-github-alt' />

        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers.bind(this)}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert} />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:loginName'
              render={(abc) => (
                <User {...abc} randomName={abc.match}
                  getUser={getUser} user={user}
                  getUserRepos={getUserRepos} repos={repos}
                  loading={loading} />
                // for desctructuring props <User {...abc} getUser={this.getUser} user={user} loading={loading}/>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
