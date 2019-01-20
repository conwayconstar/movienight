import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../helpers/axios';
import movieActions from '../store/actions/move.actions';

class Info extends Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.node,
        }),
      }).isRequired,
      setRating: PropTypes.func.isRequired,
      setFavorite: PropTypes.func.isRequired,
      rated: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.node,
        }),
      ),
      favorites: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.node,
        }),
      ),
    };

    static defaultProps = {
      rated: [],
      favorites: [],
    };

    constructor(props) {
      super(props);

      this.state = {
        movie: {},
        rating: 0,
        favorite: false,
      };

      this.createRating = this.createRating.bind(this);
      this.handleRating = this.handleRating.bind(this);
      this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
      const { match, rated, favorites } = this.props;
      const { id } = match.params;
      const movie = rated.find(x => x.id === Number(id));
      const favorite = !!favorites.find(x => x.id === Number(id));

      if (movie) {
        this.setState({
          movie,
          rating: Math.round(movie.rating / 2),
          favorite,
        });
      } else {
        axios.get(`movie/${id}`).then((res) => {
          this.setState({
            movie: res.data,
            favorite,
          });
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      const { movie } = this.state;
      const m = nextProps.rated.find(x => x.id === movie.id);
      const favorite = !!nextProps.favorites.find(x => x.id === movie.id);
      this.setState({
        rating: m ? Math.round(m.rating / 2) : 0,
        favorite,
      });
    }

    createRating() {
      const { movie, rating } = this.state;
      const buttons = [];

      for (let i = 1; i <= 5; i += 1) {
        buttons.push(
          <button
            type="button"
            className={`btn btn-${rating >= i ? 'primary' : 'secondary'}`}
            key={`rating-${i}`}
            onClick={() => this.handleRating(movie, i)}
          >
            {i}
          </button>,
        );
      }

      return buttons;
    }

    handleRating(id, i) {
      const { setRating } = this.props;
      setRating(id, i);
      this.setState({
        rating: i,
      });
    }

    handleFavorite() {
      const { setFavorite } = this.props;
      const { movie, favorite } = this.state;
      setFavorite(movie, !favorite);
    }

    render() {
      const { movie, favorite } = this.state;
      if (!movie) return false;

      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top"
              />
            </div>
            <div className="col-md-8">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <h5>
                {`User rating: ${Math.round(movie.vote_average / 2)}/5`}
              </h5>

              <h3>Rate this movie!!</h3>
              <div className="btn-toolbar">
                <div className="btn-group mr-2" role="group" aria-label="Rating">
                  {this.createRating()}
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Favorite">
                  <button
                    type="button"
                    onClick={() => this.handleFavorite()}
                    className={`btn btn-${favorite ? 'primary' : 'secondary'}`}
                  >
                      Add to favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { rated, favorites } = state.movie;
  return { rated, favorites };
};


const mapDispatchToProps = dispatch => ({
  setRating: (movie, rating) => dispatch(movieActions.setRating(movie, rating)),
  setFavorite: (movie, favorite) => dispatch(movieActions.setFavorite(movie, favorite)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Info);
