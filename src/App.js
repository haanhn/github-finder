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
import GithubState from './context/github/GithubState';

const App = () => {
  //no need for users and setUsers because users is not in state of App but in githubContext
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({}); 
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
  //moved to GithubState

  //Get a single User: moved to githubState
  

  //Get User's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  }

  //Clear Users: moved to githubContext

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
    <GithubState>
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
                      // searchUsers={searchUsers.bind(this)}
                      //no need : searchUsers, clearUsers, showClear 
                      // to pass as props: just access context githubContext directly
                      setAlert={showAlert} />

                    {/* --> No need Users.props.users or Users.props.loading
                    Because users is now in githubContext, no need to pass it as props */}
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:loginName'
                render={(abc) => (
                  <User {...abc} randomName={abc.match}
                    // getUser={getUser} user={user} : no need
                    getUserRepos={getUserRepos} repos={repos}
                    // loading={loading} : no need
                    />
                  // for desctructuring props <User {...abc} getUser={this.getUser} user={user} loading={loading}/>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
