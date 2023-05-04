import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  lighterBg,
  className,
  backgroundColor,
  color,
  size,
  label,
  ...props
}) => {
  let mode;
  if (primary) {
    mode = 'storybook-button--primary';
  } else if (lighterBg) {
    mode = 'storybook-button--lighterBg';
  } else {
    mode = 'storybook-button--secondary';
  }
  return (
    <button
      type="button"
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        className,
      ].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
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

Button.defaultProps = {
  backgroundColor: null,
  className: null,
  color: null,
  primary: false,
  lighterBg: false,
  size: 'medium',
  onClick: undefined,
};
