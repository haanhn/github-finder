import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showClear, clearUsers, setAlert }) => {
    //searchUsers is removed from props
    //access searchUsers directly through context -> no need to pass down searchUsers as props from [C]:App
    const githubContext = useContext(GithubContext);

    const [searchedValue, setText] = useState('');

    const valueOnChange = (e) => setText(e.target.value);

    //Note when not using arrow function, use bind 
    const onSubmit = (e) => {
        e.preventDefault();
        if (searchedValue === '') {
            setAlert('This field is required', 'light');
        } else {
            githubContext.searchUsers(searchedValue);
            setText('');
        }
    }

    return (
        <div>
            {/* put onSubmit in form tag not button submit tag */}
            <form className='form' onSubmit={onSubmit}>
                <input type='text'
                    name='searchedValue'
                    placeholder='Search Users...'
                    value={searchedValue}
                    onChange={valueOnChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {showClear &&
                (<button className='btn btn-light btn-block' onClick={clearUsers}>
                    Clear
                </button>)
            }
        </div>
    );
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
};

export default Search;
