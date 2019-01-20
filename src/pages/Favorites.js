import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Movie from '../components/Movie';

const Favorites = ({ favorites }) => (
  <div className="container mt-5">
    <div className="row">
      {favorites.length ? _.orderBy(favorites, 'rating', 'desc')
        .map(movie => (<Movie movie={movie} key={movie.id} />)) : (
          <div className="col-12">
            <h3>You currently have no favorites</h3>
            <Link to="/" className="btn btn-primary">
                        Discover films!
            </Link>
          </div>
      )}
    </div>
  </div>
);


Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.node,
    }),
  ),
};

Favorites.defaultProps = {
  favorites: [],
};

const mapStateToProps = (state) => {
  const { favorites } = state.movie;
  return { favorites };
};


export default connect(mapStateToProps)(Favorites);
