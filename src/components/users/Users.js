import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';
//no need to import propTypes

const Users = () => {

    //no need to get data from props, because users & loading is in githubContext
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

export default Users;
