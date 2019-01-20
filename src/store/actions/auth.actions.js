import history from '../../helpers/history';
import axios from '../../helpers/axios';
import alertActions from './alert.actions';
import movieActions from './move.actions';
import constants from '../constants/auth.constants';

function createSession() {
  const request = () => ({ type: constants.SESSION_REQUEST });
  const success = ({ sessionId, guest }) => ({
    type: constants.SESSION_SUCCESS, sessionId, guest,
  });
  const failure = error => ({ type: constants.SESSION_FAILURE, error });
  const session = JSON.parse(localStorage.getItem('session'));

  return (dispatch) => {
    dispatch(request());
    if (!session) {
      return axios.get('authentication/guest_session/new')
        .then((res) => {
          const data = {
            sessionId: res.data.guest_session_id,
            guest: true,
          };

          localStorage.setItem('session', JSON.stringify(data));
          dispatch(success(data));
        })
        .catch((error) => {
          dispatch(alertActions.error(error.response.data.status_message));
          dispatch(failure(error));
        });
    }

    dispatch(movieActions.fetchRatings());
    if (!session.guest) dispatch(movieActions.fetchFavorites());
    return dispatch(success(session));
  };
}

function login(state) {
  const request = () => ({ type: constants.LOGIN_REQUEST });
  const success = ({ sessionId, guest }) => ({
    type: constants.LOGIN_SUCCESS, sessionId, guest,
  });
  const failure = error => ({ type: constants.LOGIN_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    return axios.post('authentication/token/validate_with_login', state)
      .then(res => axios.post('authentication/session/new', { request_token: res.data.request_token })
        .then((r) => {
          const data = {
            sessionId: r.data.session_id,
            guest: false,
          };

          localStorage.setItem('session', JSON.stringify(data));
          dispatch(success(data));
          dispatch(movieActions.fetchRatings());
          dispatch(movieActions.fetchFavorites());
          history.push('/');
        }).catch(error => Promise.reject(error)))
      .catch((error) => {
        dispatch(alertActions.error(error.response.data.status_message));
        dispatch(failure(error));
      });
  };
}

function sessionTimeout() {
  return (dispatch) => {
    localStorage.removeItem('session');
    history.push('/');
    dispatch(alertActions.error('Session timed out, a new guest session will be created.'));
    return dispatch(createSession);
  };
}

export default {
  createSession,
  sessionTimeout,
  login,
};
