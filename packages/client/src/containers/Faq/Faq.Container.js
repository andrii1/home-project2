import React from 'react';
import { Helmet } from 'react-helmet';
import './Faq.Style.css';

export const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <main>
        <h1 className="hero-header">FAQ</h1>
        <h2>How many prompts are here?</h2>
        <p>Over 3500 prompts, spread over 110 topics and 22 categories.</p>
        <h2>What are the main features?</h2>
        <p>
          You can filter prompts by categories, topics, sort by prompts,
          categories, topics, search prompts and export results.
        </p>
        <p>It is possible to copy a specific prompt or go to a prompt page.</p>
      </main>
    </>
  );
};
