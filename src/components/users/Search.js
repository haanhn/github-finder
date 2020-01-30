import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        searchedValue: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div>
                {/* put onSubmit in form tag not button submit tag */}
                <form className='form' onSubmit={this.onSubmit.bind(this)}>
                    <input type='text'
                        name='searchedValue'
                        placeholder='Search Users...'
                        value={this.state.searchedValue}
                        onChange={this.valueOnChange} />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {this.props.showClear &&
                    (<button className='btn btn-light btn-block' onClick={this.clearUsers}>
                        Clear
                    </button>)
                }
            </div>
        );
    }

    valueOnChange = (e) => this.setState({ [e.target.name]: e.target.value });

    //Note when not using arrow function, use bind 
    onSubmit(e) {
        e.preventDefault();
        const searchedValue = this.state.searchedValue;
        if (searchedValue === '') {
            this.props.setAlert('This field is required', 'light');
        } else {
            this.props.searchUsers(searchedValue);
            this.setState({ searchedValue: '' });
        }
    }

    clearUsers = () => {
        this.props.clearUsers();
    }
}

export default Search;
