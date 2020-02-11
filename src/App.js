import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';

const App = () => {
  //no need for useState() of users and setUsers, user, setUser, repos, setRepos, loading, setLoading.. 
  //because users is not in state of App but in githubContext
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
  

  //Get User's repos: moved to  githubState

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
                    <Search setAlert={showAlert} />
                      {/* no need : searchUsers, clearUsers, showClear  */}

                    {/* --> No need Users.props.users or Users.props.loading
                    Because users is now in githubContext, no need to pass it as props */}
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:loginName' component={User}
                // render={(abc) => (
                  // <User randomName={abc.match}
                    />
                    {/* !!! NO NEED to use render prop ---> use component prop
                        ---> remember to change in User: props.randomName -> props.match 
                    */}


                    {/* //no need passing getUser, user, loading, getUserRepos, repos to User as props */}
                    {/* // for desctructuring props <User {...abc} getUser={this.getUser} user={user} loading={loading}/> */}
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
