import React, { Component } from 'react';

class UserItem extends Component {
    // state = {
    //     loginName: 'mojombo',
    //     avatarUrl: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //     githubUrl: 'https://github.com/mojombo'
    // }

    render() {
        const { loginName, avatarUrl, githubUrl } = this.props.user;
        
        return (
            <div className='card text-center'>
                <img src={avatarUrl} alt='' className='round-img' style={{width: '60px'}} />
                <h3>{loginName}</h3>
                <a href={githubUrl} className='btn btn-dark btn-sm my-1'>More</a>
            </div>
        )
    }
}

export default UserItem;
