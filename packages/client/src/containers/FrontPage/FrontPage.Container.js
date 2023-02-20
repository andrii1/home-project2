import React from 'react';

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
        <div className="logo">Home</div>
        <div className="menu">
          <ul>
            <li>
              <span>Log in</span>
            </li>
            <li>
              <Button primary label="Sign up" />
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
