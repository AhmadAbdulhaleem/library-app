import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../firebase';

const Header = props => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.history.push('/');
      });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link to="/" className="navbar-brand">
        Library
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/all-books">
              All Books
            </Link>
          </li>

          {props.user ? (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item" onClick={() => signOut()}>
                <Link className="nav-link" to="/sign-out">
                  SignOut
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  Signin
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  Signup
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
