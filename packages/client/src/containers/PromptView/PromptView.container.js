import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal/Modal.Component';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import TextFormTextarea from '../../components/Input/TextFormTextarea.component';
import useInputValidation from '../../utils/hooks/useInputValidation';
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
import { useUserContext } from '../../userContext';

export const PromptView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUserContext();
  const [validForm, setValidForm] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [comment, setComment] = useState('');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  useEffect(() => {
    async function fetchSinglePrompt(promptId) {
      const response = await fetch(`${apiURL()}/prompts/${promptId}`);
      const promptResponse = await response.json();
      setPrompt(promptResponse[0]);
    }

    fetchSinglePrompt(id);
  }, [id]);

  const fetchCommentsByPromptId = useCallback(async (promptId) => {
    const response = await fetch(`${apiURL()}/comments?promptId=${promptId}`);
    const commentResponse = await response.json();
    setComments(commentResponse);
  }, []);

  useEffect(() => {
    fetchCommentsByPromptId(id);
  }, [fetchCommentsByPromptId, id]);

  const navigateBack = () => {
    navigate(-1);
  };

  const addComment = async (commentContent) => {
    const response = await fetch(`${apiURL()}/comments`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: commentContent,
        prompt_id: id,
      }),
    });
    if (response.ok) {
      fetchCommentsByPromptId(id);
    }
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comment) {
      setError('Comment is required!');
      console.log('error');
      setInvalidForm(true);
      setValidForm(false);
      return;
    }
    if (comment.trim().length < 5) {
      setError('Comment must be more than five characters!');
      console.log('error');
      setInvalidForm(true);
      setValidForm(false);
      return;
    }

    setInvalidForm(false);
    setValidForm(true);
    addComment(comment);
    setOpenConfirmationModal(true);
    setComment('');
  };
  const getOnlyYearMonthDay = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Helmet>
        <title>{`${String(prompt.title).substring(
          0,
          50,
        )} - Chat GPT prompts`}</title>
        <meta
          name="description"
          content={`Top Chat GPT prompts for ${prompt.topicTitle} and ${prompt.categoryTitle}`}
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
                  `https://www.prompthunt.me/prompts/${prompt.id}`,
                );
              }}
            />
            <FacebookShareButton url={`/prompts/${prompt.id}`}>
              <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://www.prompthunt.me/prompts/${prompt.id}`}
              title={`Check out this GPT prompt: '${prompt.title}'`}
              hashtags={['prompts']}
            >
              <FontAwesomeIcon className="share-icon" icon={faTwitter} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://www.prompthunt.me/prompts/${prompt.id}`}
            >
              <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
            </LinkedinShareButton>
            <EmailShareButton
              subject="Check out this GPT prompt!"
              body={`This GPT prompt is great: '${prompt.title}'`}
              url={`https://www.prompthunt.me/prompts/${prompt.id}`}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </EmailShareButton>
          </div>
          {comments.length === 0 && (
            <i>No comments for this prompt. Add first one below.</i>
          )}
          {comments.length > 0 &&
            comments.map((item) => (
              <div className="form-container">
                <div className="comment-box submit-box">
                  <div>{item.content}</div>
                  <div className="comment-author-date">{`by ${
                    item.full_name
                  } on ${getOnlyYearMonthDay(item.created_at)}`}</div>
                </div>
              </div>
            ))}
          <div className="form-container">
            <div className="comment-box submit-box">
              <form onSubmit={handleSubmit}>
                <textarea
                  className="form-input"
                  value={comment}
                  placeholder="Your comment"
                  onChange={commentHandler}
                />

                <Button
                  primary
                  className="btn-add-prompt"
                  type="submit"
                  label="Add comment"
                />
                {validForm && (
                  <Modal
                    title="Your comment has been submitted!"
                    open={openConfirmationModal}
                    toggle={() => setOpenConfirmationModal(false)}
                  />
                )}
                {invalidForm && <p className="error-message">{error}</p>}
              </form>
            </div>
          </div>
          <Button className="button-back" label="Back" onClick={navigateBack} />
        </section>
      </main>
    </>
  );
};
