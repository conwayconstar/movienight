import constants from '../constants/user.constants';

const session = JSON.parse(localStorage.getItem('session'));
const initialState = session || {};

export default function user(state = initialState, action) {
  const { sessionId, guest } = action;

  switch (action.type) {
    case constants.GUEST_SESSION_SUCCESS:
      return {
        ...state,
        sessionId,
        guest,
      };
    default:
      return state;
  }
}
