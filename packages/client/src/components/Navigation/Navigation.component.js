import React from 'react';
import './Navigation.Style.css';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Navigation = () => {
  const { user, logout } = useUserContext();
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
          {user ? (
            <div className="container-logged-in">
              <Link to="/">
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <Button
                label="Logout"
                backgroundColor="#F5F5F5"
                onClick={logout}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
