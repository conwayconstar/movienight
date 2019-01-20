import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Movie from '../components/Movie';

const Top5 = ({ rated }) => (
  <div className="container mt-5">
    <div className="row">
      {rated.length ? _.orderBy(rated, 'rating', 'desc')
        .slice(0, 5)
        .map(movie => (<Movie movie={movie} key={movie.id} />)) : (
          <div className="col-12">
            <h3>You currently havent rated any movies</h3>
            <Link to="/" className="btn btn-primary">
                Discover films!
            </Link>
          </div>
      )}
    </div>
  </div>
);


Top5.propTypes = {
  rated: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.node,
    }),
  ),
};

Top5.defaultProps = {
  rated: [],
};

const mapStateToProps = (state) => {
  const { rated } = state.movie;
  return { rated };
};


export default connect(mapStateToProps)(Top5);
