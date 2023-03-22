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
      const responseCategories = await fetch(`${apiURL()}/categories/`);
      const responseTopics = await fetch(`${apiURL()}/topics/`);
      const categoriesResponse = await responseCategories.json();
      const topicsResponse = await responseTopics.json();
      const combinedArray = categoriesResponse.concat(topicsResponse);
      console.log('combined', combinedArray);
      if (searchTerms) {
        const filteredCategoriesSearch = combinedArray.filter((item) =>
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

  const dropdownList = categoriesHome.map((item) => (
    <Link to="/prompts" state={{ frontPageItem: item }}>
      <li key={item.id}>{item.title}</li>
    </Link>
  ));
  const cardItems = categories.map((item) => (
    <Card title={item.title} url={item} />
  ));
  return (
    <main>
      <div className="hero">
        <h1>Find best GPT prompts</h1>
        <p className="subheading">3500+ prompts, 110 topics, 22 categories</p>
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
