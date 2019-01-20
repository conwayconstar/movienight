import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../helpers/axios';
import authActions from '../store/actions/auth.actions';
import alertActions from '../store/actions/alert.actions';

class Login extends Component {
    static propTypes = {
      login: PropTypes.func.isRequired,
      error: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
        request_token: '',
        submitted: false,
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      axios.get('authentication/token/new')
        .then(res => this.setState({ request_token: res.data.request_token }));
    }

    handleInputChange(e) {
      const { target } = e;
      const { name, value } = target;

      this.setState({
        [name]: value,
      });
    }

    handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });

      const { username, password } = this.state;
      const { login, error } = this.props;

      if (username && password) {
        login(this.state);
      } else {
        error('Please fill out all the fields');
      }
    }

    render() {
      const { submitted, username, password } = this.state;

      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-6 ml-auto mr-auto">
              <div className="jumbotron">
                <form onSubmit={this.handleSubmit}>
                  <h3>Login</h3>

                  <div className="form-group">
                    <label htmlFor="login-username">
                    Username
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      id="login-username"
                      onChange={this.handleInputChange}
                      value={username}
                      placeholder="Username"
                    />

                    {submitted && !username && (
                      <small className="form-text text-muted">
                                    Username is required.
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="login-password">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="login-password"
                      onChange={this.handleInputChange}
                      value={password}
                      placeholder="Password"
                    />

                    {submitted && !password && (
                      <small className="form-text text-muted">
                            Password is required.
                      </small>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => ({
  login: (data) => {
    dispatch(authActions.login(data));
  },
  error: (error) => {
    dispatch(alertActions.error(error));
  },
});

export default connect(null, mapDispatchToProps)(Login);
