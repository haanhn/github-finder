import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Navbar extends Component {

    static defaultProps = {
        title: 'Github Finder',
        iconClass: 'fab fa-github'
    };

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    render() {
        return (
            <div>
                <nav className='navbar bg-primary'>
                    <h1>
                        <i className={this.props.iconClass} />  {this.props.title}
                    </h1>
                </nav>
            </div>
        );
    }
}

export default Navbar;
