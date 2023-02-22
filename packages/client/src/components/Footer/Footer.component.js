import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.styles.css';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              About
            </NavLink>
          </li>
          <li>
            <a href="#">Community</a>
          </li>
        </ul>
      </div>
      <span>&copy;2023</span>
    </div>
  );
};
