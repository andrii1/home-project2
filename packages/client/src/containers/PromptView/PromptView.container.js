import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { apiURL } from '../../apiURL';
import './PromptView.styles.css';

export const PromptView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState({});
  useEffect(() => {
    async function fetchSinglePrompt(promptId) {
      const response = await fetch(`${apiURL()}/prompts/${promptId}`);
      const promptResponse = await response.json();
      setPrompt(promptResponse[0]);
    }

    fetchSinglePrompt(id);
  }, [id]);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <h1 className="hero-header">Prompt</h1>

      <section className="container-prompt">
        <div>
          <p>{prompt.title}</p>
          <h3>Category</h3>
          <p>{prompt.categoryTitle}</p>
          <h3>Topic</h3>
          <p>{prompt.topicTitle}</p>
        </div>
        <button type="button" onClick={navigateBack}>
          Back
        </button>
      </section>
    </main>
  );
};
