import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Alert from './Alert';

class Header extends Component {
    static propTypes = {
      guest: PropTypes.bool,
      alert: PropTypes.shape({
        type: PropTypes.string,
        message: PropTypes.string,
      }).isRequired,
    };

    static defaultProps = {
      guest: false,
    };

    constructor(props) {
      super(props);
      const { alert, guest } = props;

      this.state = {
        alert,
        guest,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { alert, guest } = nextProps;
      this.setState({
        alert,
        guest,
      });
    }

    render() {
      const { guest, alert } = this.state;

      return (
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Move Night</a>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink activeClassName="is-active" to="/" className="nav-link">
                                Discover
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName="is-active" to="/top-5" className="nav-link">
                        Top 5
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName="is-active" to={guest ? '/login' : '/favorites'} className="nav-link">
                    {guest ? 'Login' : 'Favorites'}
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          { !!Object.keys(alert).length && <Alert type={alert.type} message={alert.message} />}
        </header>
      );
    }
}

const mapStateToProps = (state) => {
  const { guest } = state.auth;
  const { alert } = state;

  return { guest, alert };
};

export default connect(mapStateToProps)(Header);
