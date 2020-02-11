import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert }) => {
    //searchUsers, showClear, clearUsers is removed from props
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
            {githubContext.users.length > 0 &&
                (<button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
                    Clear
                </button>)
            }
        </div>
    );
}

//no need for propTypes searchUsers, showClear, clearUsers 
//because they are not passed as props from [C] App anymore
//access them directly from githubContext

Search.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default Search;
