import React, { Component } from 'react';

class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.randomName.params.loginName);
    }

    render() {
        return (
            <div>
                {this.props.user.login}
            </div>
        );
    }
}

export default User;
