import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './FrontPage.Style.css';
import { Button } from '../../components/Button/Button.component';
import { Card } from '../../components/Card/Card.component';

const cards = [
  'GPT prompts',
  'Design prompts',
  'Coding promtps',
  'Marketing prompts',
  'Visual prompts',
  'Copywriting prompts',
];
export const FrontPage = () => {
  const cardItems = cards.map((card) => <Card title={card} />);
  return (
    <div className="main-container">
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
      <main>
        <div className="hero">
          <h1>Find best AI prompts</h1>
          <form>
            <label>
              <input type="text" placeholder="Search" />
            </label>
          </form>
        </div>
        <section className="container-cards">{cardItems}</section>
      </main>

      <div className="footer">
        <span>About</span>
        <span>Community</span>
        <span>&copy;2023</span>
      </div>
    </div>
  );
};
