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
  );
};
