import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

class User extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array
    };

    componentDidMount() {
        const loginName = this.props.randomName.params.loginName;
        this.props.getUser(loginName);
        this.props.getUserRepos(loginName);
    }

    render() {
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
        } = this.props.user;
        const { loading } = this.props;
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
                <Repos repos={this.props.repos} />
            </Fragment>
        );
    }
}

export default User;
