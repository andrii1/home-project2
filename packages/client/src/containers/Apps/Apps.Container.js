import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Apps.Style.css';
import { apiURL } from '../../apiURL';
import { Card } from '../../components/Card/Card.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/Button/Button.component';

import {
  faSearch,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';

export const Apps = () => {
  const { topicIdParam, categoryIdParam } = useParams();
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [apps, setApps] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setupUrlFilters = useCallback(async () => {
    let urlFilters = '';
    if (filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}`;
    }
    return urlFilters;
  }, [filteredTopics]);
  useEffect(() => {
    async function fetchApps() {
      const responseApps = await fetch(`${apiURL()}/apps/`);

      const responseAppsJson = await responseApps.json();
      if (searchTerms) {
        const filteredSearch = responseAppsJson.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchTerms.toLowerCase()) ||
            item.topicTitle.toLowerCase().includes(searchTerms.toLowerCase()) ||
            item.categoryTitle
              .toLowerCase()
              .includes(searchTerms.toLowerCase()),
        );
        setResultsHome(filteredSearch);
      }
    }
    fetchApps();
  }, [searchTerms]);

  const fetchApps = useCallback(async () => {
    // const urlFilters = await setupUrlFilters();
    let url;
    if (topicIdParam) {
      url = `${apiURL()}/apps?filteredTopics=${topicIdParam}`;
    } else if (categoryIdParam) {
      url = `${apiURL()}/apps?filteredCategories=${categoryIdParam}`;
    } else {
      url = `${apiURL()}/apps/`;
    }

    const response = await fetch(url);
    const appsResponse = await response.json();
    setApps(appsResponse);

    // const promptsExportReady = promptsResponse.dataExport.map((prompt) => {
    //   return {
    //     id: prompt.id,
    //     prompt: prompt.title,
    //     category: prompt.categoryTitle,
    //     topic: prompt.topicTitle,
    //   };
    // });
    // setPromptsExport(promptsExportReady);
    setIsLoading(false);
  }, [topicIdParam, categoryIdParam]);

  useEffect(() => {
    setIsLoading(true);
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    // async function fetchApps() {
    //   const response = await fetch(`${apiURL()}/apps/`);
    //   const appsResponse = await response.json();
    //   setApps(appsResponse);
    // }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);
    }

    // fetchApps();
    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const filterHandlerTopics = (event) => {
    if (event.target.checked) {
      setFilteredTopics([...filteredTopics, parseInt(event.target.value, 10)]);
    } else {
      setFilteredTopics(
        filteredTopics.filter(
          (filterTopic) => filterTopic !== parseInt(event.target.value, 10),
        ),
      );
    }
  };

  const dropdownList = resultsHome.map((app) => (
    <Link key={app.id} to={`/apps/${app.id}`}>
      <li>{app.title}</li>
    </Link>
  ));
  const cardItems = apps.map((app) => {
    // const relatedTopics = topics
    //   .filter((topic) => topic.categoryId === category.id)
    //   .map((item) => item.id);
    return (
      <Card
        id={app.id}
        title={app.title}
        description={app.description}
        url={app.url}
        topic={app.topicTitle}
        pricingType={app.pricing_type}
      />
    );
  });

  const topicsList = topics.map((topic) => {
    if (topicIdParam) {
      return (
        <Link to={`/apps/topic/${topic.id}`}>
          <Button
            primary={topic.id.toString() === topicIdParam.toString() && true}
            secondary={topic.id !== topicIdParam && true}
            label={topic.title}
          />
        </Link>
      );
    }
    if (categoryIdParam) {
      return (
        <Link to={`/apps/topic/${topic.id}`}>
          <Button secondary label={topic.title} />
        </Link>
      );
    }
    return (
      <Link to={`/apps/topic/${topic.id}`}>
        <Button secondary label={topic.title} />
      </Link>
    );
  });
  return (
    <main>
      <Helmet>
        <title>AI apps - browse 200+ apps</title>
        <meta name="description" content="Find best AI apps for free" />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero">
        <h1 className="hero-header">Browse 200+ AI apps</h1>
        <form className="home">
          <label>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              type="text"
              className="input-search-home"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="I want to build..."
            />
          </label>
        </form>
        {searchTerms ? (
          <div className="dropdown-search">
            <ul>
              {resultsHome.length > 0 ? (
                dropdownList
              ) : (
                <span className="search-no-apps">No apps found :(</span>
              )}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      <section className="container-topics">{topicsList}</section>
      <section className="container-cards">{cardItems}</section>
    </main>
  );
};
