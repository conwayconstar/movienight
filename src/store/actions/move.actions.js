import constants from '../constants/movie.constants';
import axios from '../../helpers/axios';
import history from '../../helpers/history';
import alertActions from './alert.actions';

export default {
  fetchRatings: () => {
    const request = () => ({ type: constants.FETCH_RATING_REQUEST });
    const success = movies => ({ type: constants.FETCH_RATING_SUCCESS, movies });
    const failure = error => ({ type: constants.FETCH_RATING_FAILURE, error });

    return (dispatch, getState) => {
      dispatch(request());

      const { auth } = getState();
      const { guest, sessionId } = auth;

      const url = guest
        ? `guest_session/${sessionId}/rated/movies`
        : `/account/{account_id}/rated/movies?session_id=${sessionId}`;

      return axios.get(url)
        .then(res => dispatch(success(res.data.results)))
        .catch(error => dispatch(failure(error)));
    };
  },
  setRating: (m, rating) => {
    const request = () => ({ type: constants.SET_RATING_REQUEST });
    const success = movie => ({ type: constants.SET_RATING_SUCCESS, movie });
    const failure = error => ({ type: constants.SET_RATING_FAILURE, error });
    const value = rating * 2;

    return (dispatch, getState) => {
      dispatch(request());

      const { auth } = getState();
      const { guest, sessionId } = auth;

      return axios.post(`movie/${m.id}/rating?${guest ? 'guest_' : ''}session_id=${sessionId}`, { value })
        .then(() => dispatch(success({ ...m, rating: value })))
        .catch(error => dispatch(failure(error)));
    };
  },


  fetchFavorites: () => {
    const request = () => ({ type: constants.FETCH_FAVORITE_FAILURE });
    const success = movies => ({ type: constants.FETCH_FAVORITE_SUCCESS, movies });
    const failure = error => ({ type: constants.FETCH_FAVORITE_FAILURE, error });

    return (dispatch, getState) => {
      dispatch(request());

      const { auth } = getState();
      const { sessionId } = auth;

      return axios.get(`account/{account_id}/favorite/movies?session_id=${sessionId}`)
        .then(res => dispatch(success(res.data.results)))
        .catch(error => dispatch(failure(error)));
    };
  },

  setFavorite: (m, favorite) => {
    const request = () => ({ type: constants.SET_FAVORITE_FAILURE });
    const success = movie => ({ type: constants.SET_FAVORITE_SUCCESS, movie });
    const failure = error => ({ type: constants.SET_FAVORITE_FAILURE, error });

    return (dispatch, getState) => {
      dispatch(request());

      const { auth } = getState();
      const { guest, sessionId } = auth;

      if (guest) {
        history.push('/login');
        dispatch(failure('Not logged in'));
        return dispatch(alertActions.error('You cant add favorites unless you are logged in!'));
      }
      return axios.post(`account/{account_id}/favorite?session_id=${sessionId}`, {
        media_type: 'movie',
        media_id: m.id,
        favorite,
      }).then(() => dispatch(success(m)))
        .catch(error => dispatch(failure(error)));
    };
  },
};
