import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState(prevState => ({
        error: 'Password must be more than 8 characters',
      }));
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState(prevState => ({
          error: err.reason,
        }));
      } else {
        this.setState(prevState => ({ error: '' }));
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join Short Link</h1>
          <b>{this.state.error}</b>
          <form
            onSubmit={e => this.onSubmit(e)}
            noValidate
            className="boxed-view__form"
          >
            <input type="email" name="email" ref="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              ref="password"
              placeholder="Password"
            />
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Login</Link>
        </div>
      </div>
    );
  }
}
