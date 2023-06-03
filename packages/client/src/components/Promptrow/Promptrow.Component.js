import React from 'react';
import PropTypes from 'prop-types';
import './Promptrow.Style.css';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faArrowUp,
  faArrowUpRightFromSquare,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

/**
 * Primary UI component for user interaction
 */
export const Promptrow = ({
  id,
  title,
  category,
  topic,
  deleteBookmark,
  ...props
}) => {
  return (
    <>
      <div className="col-1">{title}</div>
      <div className="col-2">
        <span className="prompt-additional-text">Category:&nbsp;</span>
        {category}
      </div>
      <div className="col-3">
        <span className="prompt-additional-text">Topic:&nbsp;</span>
        {topic}
      </div>
      <div className="col-7">
        <div className="icons-prompts">
          <button
            type="button"
            className="button-copy"
            onClick={() => {
              navigator.clipboard.writeText(title);
            }}
          >
            <img src={iconCopy} alt="copy" className="icon-copy" />
          </button>
          <Link to={`../prompts/${id.toString()}`} params={{ id }}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
          <FacebookShareButton url={`https://www.prompthunt.me/prompts/${id}`}>
            <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.prompthunt.me//prompts/${id}`}
            title={`Check out this GPT prompt: '${title}'`}
            hashtags={['prompts']}
          >
            <FontAwesomeIcon className="share-icon" icon={faTwitter} />
          </TwitterShareButton>
          <LinkedinShareButton url={`https://www.prompthunt.me//prompts/${id}`}>
            <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
          </LinkedinShareButton>
          <Link className="remove-bookmark" onClick={deleteBookmark}>
            Remove from bookmarks
          </Link>
        </div>
      </div>
    </>
  );
};

Promptrow.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  lighterBg: PropTypes.bool,

  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  /**
   * How large should the button be?
   */
  color: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Promptrow.defaultProps = {
  backgroundColor: null,
  className: null,
  color: null,
  primary: false,
  lighterBg: false,
  size: 'medium',
  onClick: undefined,
};
