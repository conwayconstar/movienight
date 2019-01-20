import constants from '../constants/auth.constants';

const session = JSON.parse(localStorage.getItem('session'));
const initialState = session || { guest: true };

export default function auth(state = initialState, action) {
  const { sessionId, guest } = action;

  switch (action.type) {
    case constants.SESSION_SUCCESS:
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        sessionId,
        guest,
      };
    default:
      return state;
  }
}
