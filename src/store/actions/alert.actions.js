import constants from '../constants/alert.constants';

export default {
  success: message => ({ type: constants.SUCCESS, message }),
  error: message => ({ type: constants.ERROR, message }),
  clear: () => ({ type: constants.CLEAR }),
};
