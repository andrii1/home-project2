import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FrontPage.Style.css';
import { apiURL } from '../../apiURL';
import { Card } from '../../components/Card/Card.component';

export const FrontPage = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoriesHome, setCategoriesHome] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      if (searchTerms) {
        const filteredCategoriesSearch = categoriesResponse.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setCategoriesHome(filteredCategoriesSearch);
      } else if (showDropdown === true) {
        setCategoriesHome(categoriesResponse);
      } else {
        setCategoriesHome(categoriesResponse);
      }
    }
    fetchCategories();
  }, [searchTerms, showDropdown]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      setCategories(categoriesResponse);
    }
    fetchCategories();
  }, []);

  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownList = categoriesHome.map((category) => (
    <Link to="/prompts" state={{ frontPageCategory: category.id }}>
      <li key={category.id}>{category.title}</li>
    </Link>
  ));
  const cardItems = categories.map((category) => (
    <Card title={category.title} url={category.id} />
  ));
  return (
    <main>
      <div className="hero">
        <h1>Find best AI prompts</h1>
        <form>
          <label>
            <input
              type="text"
              className="input-search-home"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="Search"
            />
          </label>
        </form>
        {searchTerms ? (
          <div className="dropdown-search">
            <ul>{dropdownList}</ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <section className="container-cards">{cardItems}</section>
    </main>
  );
};
