import React from 'react';

import './Prompts.Style.css';

import { Card } from '../../components/Card/Card.component';

const cards = [
  'GPT prompts',
  'Design prompts',
  'Coding promtps',
  'Marketing prompts',
  'Visual prompts',
  'Copywriting prompts',
];
export const Prompts = () => {
  const cardItems = cards.map((card) => <Card title={card} />);
  return (
    <main>
      <h1 className="hero-header">Prompts</h1>
      <section className="container-prompts">
        <div className="prompts-filter">
          <div className="tab-filter">Categories</div>
          <div className="checkboxes">
            <ul>
              <li>
                <input type="checkbox" /> GPT
              </li>
              <li>
                <input type="checkbox" /> Coding
              </li>
              <li>
                <input type="checkbox" /> Graphics
              </li>
              <li>
                <input type="checkbox" /> Marketing
              </li>
              <li>
                <input type="checkbox" /> Project Management
              </li>
            </ul>
          </div>
          <div className="tab-filter">Tools</div>
          <div className="checkboxes">
            <ul>
              <li>
                <input type="checkbox" /> ChatGPT
              </li>
              <li>
                <input type="checkbox" /> Dream by Wombo
              </li>
              <li>
                <input type="checkbox" /> Tool #3
              </li>
              <li>
                <input type="checkbox" /> Tool #4
              </li>
            </ul>
          </div>
        </div>
        <div className="prompts-table">
          <div className="row prompts-header">
            <div className="col-1">Prompt</div>
            <div className="col-2">Description</div>
            <div className="col-3">Category</div>
            <div className="col-4">Rating</div>
            <div className="col-5">Helpful?</div>
            <div className="col-6">Favorite</div>
            <div className="col-7">Share</div>
          </div>
          <div className="row prompts-body">
            <div className="col-1">Prompt#1</div>
            <div className="col-2">Text goes here</div>
            <div className="col-3">GPT</div>
            <div className="col-4">2</div>
            <div className="col-5">👍 / 👎</div>
            <div className="col-6">❤️</div>
            <div className="col-7">fb</div>
          </div>
        </div>
      </section>
    </main>
  );
};
