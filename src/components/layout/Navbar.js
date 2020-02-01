import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// destructuring iconClass and title from props
// const Navbar = (props) => {
const Navbar = ({iconClass, title}) => {
    return (
        <div>
            <nav className='navbar bg-primary'>
                <h1>
                    {/* <i className={props.iconClass} />  {props.title} */}
                    <i className={iconClass} />  {title}
                </h1>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );

}

Navbar.defaultProps = {
    title: 'Github Finder',
    iconClass: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

export default Navbar;
