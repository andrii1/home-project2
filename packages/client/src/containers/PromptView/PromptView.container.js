import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';

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
    <>
      <Helmet>
        <title>
          {`${prompt.title} - ChatGPT prompts for ${prompt.categoryTitle}`}
        </title>
        <meta
          name="description"
          content={`Find ChatGPT prompts related to ${prompt.topicTitle} and ${prompt.categoryTitle}`}
        />
      </Helmet>
      <main>
        <h1 className="hero-header">Prompt</h1>

        <section className="container-prompt">
          <div>
            <p className="prompt-title-view">{prompt.title}</p>
            <h3>Category</h3>
            <p>{prompt.categoryTitle}</p>
            <h3>Topic</h3>
            <p>{prompt.topicTitle}</p>
          </div>
          <div className="icons-prompts-page">
            <button
              type="button"
              className="button-copy"
              onClick={() => {
                navigator.clipboard.writeText(prompt.title);
              }}
            >
              <img src={iconCopy} alt="copy" className="icon-copy" />
            </button>
            <FontAwesomeIcon
              icon={faLink}
              className="button-copy"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.example.com/prompts/${prompt.id}`,
                );
              }}
            />
            <FacebookShareButton url={`/prompts/${prompt.id}`}>
              <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://www.example.com/prompts/${prompt.id}`}
              title={`Check out this GPT prompt: '${prompt.title}'`}
              hashtags={['prompts']}
            >
              <FontAwesomeIcon className="share-icon" icon={faTwitter} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://www.example.com/prompts/${prompt.id}`}
            >
              <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
            </LinkedinShareButton>
            <EmailShareButton
              subject="Check out this GPT prompt!"
              body={`This GPT prompt is great: '${prompt.title}'`}
              url={`https://www.example.com/prompts/${prompt.id}`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </EmailShareButton>
          </div>
          <Button label="Back" onClick={navigateBack} />
        </section>
      </main>
    </>
  );
};
