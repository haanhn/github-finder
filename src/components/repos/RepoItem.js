import React from 'react';
import PropTypes from 'prop-types';

function RepoItem({ repo }) {
// function RepoItem({ name, githubUrl }) {
    return (
        <div className='card'>
            <h5><a href={repo.html_url}>{repo.name}</a></h5>
            {/* <h5><a href={githubUrl}>{name}</a></h5> */}
        </div>
    );
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired
};

export default RepoItem;
