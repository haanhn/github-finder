import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';
// import PropTypes from 'prop-types';

const Users = () => {
    // const users = props.users;
    // const loading = props.loading;

    //access data from githubContext directly, not from Users.props passed down from state of [C] App
    const githubContext = useContext(GithubContext);
    const {loading, users} = githubContext;

    if (loading) {
        return <Spinner/>;
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    //Specify key here (react.org docs)!!!
                    <UserItem key={user.id}
                        user={user} />
                ))}
            </div>
        );
    }    
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

//no need for propTypes
//Do not specify const Users.propTypes because ... 
// Users.propTypes = {
//     users: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired
// };

export default Users;
