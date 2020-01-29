import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
    state = {
        users: [
            {
                id: 1,
                loginName: "mojombo",
                avatarUrl: "https://avatars0.githubusercontent.com/u/1?v=4",
                githubUrl: "https://github.com/mojombo"
            },
            {
                id: 2,
                loginName: "defunkt",
                avatarUrl: "https://avatars0.githubusercontent.com/u/2?v=4",
                githubUrl: "https://github.com/defunkt"
            },
            {
                id: 3,
                loginName: "pjhyett",
                avatarUrl: "https://avatars0.githubusercontent.com/u/3?v=4",
                githubUrl: "https://github.com/pjhyett"
            }
        ]
    }

    render() {
        const users = this.state.users;
        return (
            <div style={userStyle}>
                {users.map(user => (
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
