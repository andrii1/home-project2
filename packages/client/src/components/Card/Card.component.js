import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';

import './Card.styles.css';

export const Card = ({ title, url }) => {
  return (
    <Link to={`/prompts/category/${url}`}>
      <div className="card-category">
        <h2>{title}</h2>
        <Button label="Find prompts" />
      </div>
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  url: PropTypes.shape,
};

Card.defaultProps = {
  title: null,
  url: null,
};
