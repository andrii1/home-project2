import React from 'react';
import { NavLink } from 'react-router-dom';
import './Pagination.styles.css';

export const Pagination = () => {
  return (
    <div className="pagination">
      <NavLink to="#" className="pagination-button">
        &#8592; Prev
      </NavLink>
      <NavLink to="#" className="page-number">
        1
      </NavLink>
      <NavLink to="#" className="page-number">
        2
      </NavLink>
      <NavLink to="#" className="page-number">
        3
      </NavLink>
      <NavLink to="#" className="page-number">
        4
      </NavLink>
      <NavLink to="#" className="pagination-button">
        Next &#8594;
      </NavLink>
    </div>
  );
};
