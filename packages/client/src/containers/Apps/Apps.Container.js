import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Apps.Style.css';
import { apiURL } from '../../apiURL';
import { Card } from '../../components/Card/Card.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';

export const Apps = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [apps, setApps] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function fetchApps() {
      const responseCategories = await fetch(`${apiURL()}/apps/`);
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
    fetchApps();
  }, [searchTerms]);

  useEffect(() => {
    async function fetchApps() {
      const response = await fetch(`${apiURL()}/apps/`);
      const appsResponse = await response.json();
      setApps(appsResponse);
    }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);
    }

    fetchApps();
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
  const cardItems = apps.map((app) => {
    // const relatedTopics = topics
    //   .filter((topic) => topic.categoryId === category.id)
    //   .map((item) => item.id);
    return (
      <Card
        title={app.title}
        description={app.description}
        url={app.url}
        topic={app.topicTitle}
      />
    );
  });
  return (
    <main>
      <Helmet>
        <title>AI apps - browse 200+ apps</title>
        <meta
          name="description"
          content="Find best Chat GPT prompts for free"
        />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero">
        <h1 className="hero-header">AI apps</h1>
        <p className="subheading">Browse 200+ apps</p>
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
