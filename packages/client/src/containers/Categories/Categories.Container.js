import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Categories.Style.css';
import { apiURL } from '../../apiURL';
import { CardCategories } from '../../components/CardCategories/CardCategories.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Categories = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesAndTopics, setCategoriesAndTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const responseCategories = await fetch(`${apiURL()}/categories/`);
      const responseTopics = await fetch(`${apiURL()}/topics/`);
      const categoriesResponse = await responseCategories.json();
      const topicsResponse = await responseTopics.json();
      const combinedArray = categoriesResponse.concat(topicsResponse);
      if (searchTerms) {
        const filteredSearch = combinedArray.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setResultsHome(filteredSearch);
      } else {
        setResultsHome(categoriesResponse);
      }
    }
    fetchCategories();
  }, [searchTerms]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      setCategories(categoriesResponse);
    }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);

      const topicsAndCategories = topicsResponse.reduce((acc, d) => {
        const found = acc.find((a) => a.categoryId === d.categoryId);
        /* const value = { name: d.name, val: d.value }; */
        const value = {
          id: d.id,
          title: d.title,
          categoryId: d.categoryId,
        }; // the element in data property
        if (!found) {
          /* acc.push(...value); */
          acc.push({
            categoryId: d.categoryId,
            categoryTitle: d.categoryTitle,
            topics: [value],
          }); // not found, so need to add data property
        } else {
          /* acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] }); */
          found.topics.push(value); // if found, that means data property exists, so just push new element to found.data.
        }
        return acc;
      }, []);
      setCategoriesAndTopics(topicsAndCategories);
    }
    fetchCategories();
    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const dropdownList = resultsHome.map((result) => {
    let finalResult;
    if (Object.keys(result).length > 2) {
      finalResult = (
        <Link to="/" state={{ frontPageItem: [result.id] }}>
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    } else {
      const relatedTopics = topics
        .filter((topic) => topic.categoryId === result.id)
        .map((item) => item.id);

      finalResult = (
        <Link to="/" state={{ frontPageItem: relatedTopics }}>
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    }
    return finalResult;
  });
  console.log('categoriesAndTopics', categoriesAndTopics);
  const cardItems = categoriesAndTopics.map((category) => {
    // const relatedTopics = topics
    //   .filter((topic) => topic.categoryId === category.id)
    //   .map((item) => item.id);
    return (
      <CardCategories
        title={category.categoryTitle}
        url={category.categoryId}
        topics={category.topics}
      />
    );
  });
  return (
    <main>
      <Helmet>
        <title>
          Prompt library - 3500+ ChatGPT prompts, 110 topics, 22 categories
        </title>
        <meta
          name="description"
          content="Find best Chat GPT prompts for free"
        />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero">
        <h1 className="hero-header">Categories</h1>
        <p className="subheading">3500+ prompts, 110 topics, 22 categories</p>
        <form>
          <label>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              type="text"
              className="input-search-home"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="Search categories and topics"
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
