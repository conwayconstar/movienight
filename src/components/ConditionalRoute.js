import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConditionalRoute = ({
  component: Component, condition, redirect, ...rest
}) => (
  <Route
    {...rest}
    render={props => (condition
      ? <Component {...props} />
      : <Redirect to={{ pathname: redirect, state: { from: props.location } }} />)}
  />
);

ConditionalRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  redirect: PropTypes.node.isRequired,
  location: PropTypes.node,
  condition: PropTypes.bool.isRequired,
};

ConditionalRoute.defaultProps = {
  location: null,
};

export default ConditionalRoute;
