import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Checkbox = ({
  indeterminate = false,
  label,
  value,
  onChange,
  checked,
  ...props
}) => {
  const cRef = useRef();

  useEffect(() => {
    cRef.current.indeterminate = indeterminate;
  }, [cRef, indeterminate]);

  return (
    <>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        ref={cRef}
      />{' '}
      <span>{label}</span>
    </>
  );
};
