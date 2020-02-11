import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
//no need to import propsTypes: loading, getUser, user, getUserRepos, repos
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = (props) => {
    //access directly from githubContext
    const githubContext = useContext(GithubContext);
    const { user, getUser, loading, getUserRepos, repos } = githubContext;

    //remove getUser, user, loading, getUserRepos, repos  from props
    
    useEffect(() => {
        const loginName = props.match.params.loginName;
        getUser(loginName);
        getUserRepos(loginName);
        //for disabling warning not using dependencies in useEffect
        //eslint-disable-next-line
    },[]);

    const {
        hireable,
        avatar_url,
        name,
        location,
        bio,
        html_url,
        login,
        company,
        blog,
        followers, following,
        public_repos, public_gists
    } = user;

    if (loading) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back to Home</Link>

            Hiarable: {' '}
            {hireable ? (<i className='fas fa-check text-success'></i>) : (
                <i className='fa fa-times-circle text-danger'></i>
            )}

            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} alt='User Avatar' className='round-img'
                        style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location} </p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1' >Visit Github profile</a>
                    <ul>
                        <li>
                            {login &&
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            }
                        </li>
                        <li>
                            {company &&
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            }
                        </li>
                        <li>
                            {blog &&
                                <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>
                            }
                        </li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    );

}

export default User;
