import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING, SET_ALERT } from '../types';

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //SEARCH USERS
    const searchUsers = async (value) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${value}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        const users = res.data.items;
        // this.setState({ users: users, loading: false });
        dispatch({ type: SEARCH_USERS, payload: users });
    }

    //GET USER
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        // this.setState({ user: res.data, loading: false });
        // setUser(res.data);
        
        dispatch({ type: GET_USER, payload: res.data });
    }

    //CLEAR USERS
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    //GET REPOS

    //SET LOADING
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert: state.alert,
            searchUsers: searchUsers,
            clearUsers,
            getUser
        }}>
            {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;
