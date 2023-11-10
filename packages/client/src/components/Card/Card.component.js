import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import { Badge } from '../Badge/Badge.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import appImage from '../../assets/images/app-placeholder.svg';
// import appImage from '../../../public/assets/images/small-screenshot.png';

import './Card.styles.css';

export const Card = ({
  title,
  description,
  topic,
  topicId,
  pricingType,
  url,
  id,
  className,
  smallCard = true,
  listCard = false,
}) => {
  if (smallCard) {
    return (
      <Link
        className="card-category--small card-image--small"
        style={{
          backgroundImage: `url(${appImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="card-header">
          <Link to={`/apps/${id}`} target="_blank">
            <h2>{title}</h2>
          </Link>
        </div>
        <div className="topics-bookmark--small">
          <Badge secondary label={topic} size="small" />
          <Badge label={pricingType} size="small" />
        </div>
      </Link>
    );
  }
  if (!smallCard && !listCard) {
    return (
      <div className="card-category">
        <Link
          to={`/apps/${id}`}
          target="_blank"
          className="card-image"
          style={{
            backgroundImage: `url(/assets/images/finalscout-sm.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <div className="card-body">
          <div className="card-header">
            <div className="card-title">
              <Link to={`/apps/${id}`} target="_blank">
                <h2>{title}</h2>
              </Link>
              <Link to={`/apps/${id}`} target="_blank">
                <FontAwesomeIcon
                  className="icon-card"
                  icon={faArrowUpRightFromSquare}
                  style={{ color: '#e5989b' }}
                  size="lg"
                />
              </Link>
            </div>
            <Badge label={pricingType} size="small" />
          </div>
          <div className="card-description">
            {`${description.split(' ').slice(0, 15).join(' ')}...`}
          </div>
          <div className="topics-bookmark">
            <Link to={`/apps/topic/${topicId}`}>
              <Button label={topic} size="small" />
            </Link>
            <FontAwesomeIcon icon={faHeart} size="lg" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card-list">
      <Link
        to={`/apps/${id}`}
        target="_blank"
        className="card-image list"
        style={{
          backgroundImage: `url(/assets/images/finalscout-sm.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div className="card-body list">
        <div className="card-header">
          <div className="card-title">
            <Link to={`/apps/${id}`} target="_blank">
              <h2>{title}</h2>
            </Link>
            <Link to={`/apps/${id}`} target="_blank">
              <FontAwesomeIcon
                className="icon-card"
                icon={faArrowUpRightFromSquare}
                style={{ color: '#e5989b' }}
                size="lg"
              />
            </Link>
          </div>
          <Badge label={pricingType} size="small" />
        </div>
        <div className="card-description">
          {`${description.split(' ').slice(0, 35).join(' ')}...`}
        </div>
        <div className="topics-bookmark">
          <Link to={`/apps/topic/${topicId}`}>
            <Button label={topic} size="small" />
          </Link>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  topic: PropTypes.string,
  topicId: PropTypes.string,
  pricingType: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.shape,
  smallCard: PropTypes.bool,
  listCard: PropTypes.bool,
  className: PropTypes.string,
};

Card.defaultProps = {
  title: null,
  description: null,
  pricingType: null,
  topicId: null,
  topic: null,
  url: null,
  id: null,
  smallCard: false,
  listCard: false,
  className: null,
};
