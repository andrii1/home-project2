import React from 'react';
import PropTypes from 'prop-types';

import './Card.styles.css';
import imgCard from '../../assets/images/img-card-placeholder.png';

/**
 * Primary UI component for user interaction
 */
export const Card = ({ title }) => {
  return (
    <a href="#">
      <div className="card-category">
        <h2>{title}</h2>
        <img src={imgCard} alt="Placeholder" />
      </div>
    </a>
  );
};

Card.propTypes = {
  title: PropTypes.string,
};

Card.defaultProps = {
  title: null,
};
