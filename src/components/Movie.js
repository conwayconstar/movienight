import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => (
  <div className="col-sm-3 mb-3" key={movie.id}>
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
        alt={movie.title}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">
          {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview }
        </p>

        <Link to={`/movie/${movie.id}`} className="btn btn-primary">
            More Info
        </Link>
      </div>
    </div>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.node.isRequired,
    poster_path: PropTypes.node,
    title: PropTypes.node.isRequired,
    overview: PropTypes.node.isRequired,
  }).isRequired,
};

export default Movie;
