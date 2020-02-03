import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

function Repos({repos}) {
    return (
        repos.map(repo => (
            <RepoItem key={repo.id} repo={repo} />
            // <RepoItem key={repo.id} githubUrl={repo.html_url} name={repo.name} />
        ))
    );
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired
}

export default Repos;
