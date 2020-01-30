import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = (props) => {

    console.log(`loading = ${props.loading}; users length = ${props.users.length}`);
    const users = props.users;
    const loading = props.loading;

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

//Do not specify const Users.propTypes because ... 
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Users;
