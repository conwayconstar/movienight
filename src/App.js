import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authActions from './store/actions/auth.actions';
import movieActions from './store/actions/move.actions';
import history from './helpers/history';
import Discover from './pages/Discover';
import ConditionalRoute from './components/ConditionalRoute';
import Login from './pages/Login';
import Info from './pages/Info';
import Top5 from './pages/Top5';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import alertActions from './store/actions/alert.actions';

class App extends Component {
  static propTypes = {
    createSession: PropTypes.func.isRequired,
    fetchRatings: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    guest: PropTypes.bool,
  };

  static defaultProps = {
    guest: false,
  };

  constructor(props) {
    super(props);
    const { clear } = this.props;

    history.listen(() => clear());
  }

  async componentDidMount() {
    const { createSession, fetchRatings } = this.props;
    await createSession();
    await fetchRatings();
  }

  render() {
    const { guest } = this.props;

    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Header />
            <div className="wrap">
              <Route path="/" component={Discover} exact />
              <Route path="/movie/:id" component={Info} exact />
              <Route path="/top-5" component={Top5} exact />
              <ConditionalRoute path="/login" redirect="/" component={Login} condition={guest} />
              <ConditionalRoute path="/favorites" redirect="/login" component={Favorites} condition={!guest} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { guest } = state.auth;
  return { guest };
};

const mapDispatchToProps = dispatch => ({
  createSession: () => dispatch(authActions.createSession()),
  fetchRatings: () => dispatch(movieActions.fetchRatings()),
  clear: () => dispatch(alertActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
