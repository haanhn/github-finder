import React from 'react';
import PropTypes from 'prop-types';

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
