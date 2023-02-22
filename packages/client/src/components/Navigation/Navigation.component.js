import React from 'react';
import './Navigation.styles.css';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';

export const Navigation = () => {
  return (
    <div className="navigation">
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/prompts" className="nav-link">
              Prompts
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-buttons">
        <ul>
          <li>
            <NavLink to="/login" className="login">
              Log in
            </NavLink>
          </li>
          <li>
            <Link to="/signup" className="signup">
              <Button primary label="Sign up" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
