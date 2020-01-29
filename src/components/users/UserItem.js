import React from 'react';
import PropTypes from 'prop-types';

//this func component UserItem has props.user

//1.1. destructuring 
//step 1: destructuring user from props 
//step 2: destructuring loginName, avatarUrl, githubUrl from user
const UserItem = ({user : {loginName, avatarUrl, githubUrl}}) => {
    //1.2. destructuring loginName, avatarUrl, githubUrl from this.props.user
    //2.1. this.props is for class component
    // const { loginName, avatarUrl, githubUrl } = this.props.user;

    //2.2. props is for functional component
    // const { loginName, avatarUrl, githubUrl } = props.user;

    return (
        <div className='card text-center'>
            <img src={avatarUrl} alt='' className='round-img' style={{ width: '60px' }} />
            <h3>{loginName}</h3>
            <a href={githubUrl} className='btn btn-dark btn-sm my-1'>More</a>
        </div>
    );

}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;
