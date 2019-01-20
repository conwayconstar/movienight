import React from 'react';
import PropTypes from 'prop-types';


const Alert = ({ type, message }) => (
  <div className={`alert ${type} text-center rounded-0`} role="alert">
    {message}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};


export default Alert;
