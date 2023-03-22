import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TablePagination } from '@mui/material';

import { apiURL } from '../../apiURL';
import './Prompts.Style.css';

export const Prompts = () => {
  //Clearing location state on page reload
  window.history.replaceState({}, document.title);
  const location = useLocation();
  const { frontPageItem = '' } = location.state || {};
  let initialStateCategories;
  let initialStateTopics;
  console.log(
    'frontPageItem',
    frontPageItem,
    Object.keys(frontPageItem).length,
  );
  if (frontPageItem && Object.keys(frontPageItem).length > 2) {
    initialStateTopics = [frontPageItem.id];
    initialStateCategories = [];
  } else if (frontPageItem && Object.keys(frontPageItem).length <= 2) {
    initialStateCategories = [frontPageItem.id];
    initialStateTopics = [];
  } else {
    initialStateCategories = [];
    initialStateTopics = [];
  }
  console.log('initialStateCategories', initialStateCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedTopics, setCheckedTopics] = useState([1]);
  const [prompts, setPrompts] = useState([]);
  const [promptsCount, setPromptsCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 50,
  });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(
    initialStateCategories,
  );
  const [filteredTopics, setFilteredTopics] = useState(initialStateTopics);
  const [searchedCategories, setSearchedCategories] = useState('');
  const [searchedTopics, setSearchedTopics] = useState('');
  useEffect(() => {
    let urlFilters = '';
    if (filteredCategories.length > 0 && filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredCategories.length > 0) {
      urlFilters = `?filteredCategories=${filteredCategories}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else {
      urlFilters = `?page=${controller.page}&size=${controller.rowsPerPage}`;
    }
    async function fetchPrompts() {
      const url = `${apiURL()}/prompts/${urlFilters}`;
      const response = await fetch(url);
      const promptsResponse = await response.json();
      setPromptsCount(promptsResponse.totalCount);
      setPrompts(promptsResponse.data);
    }

    /*
    async function fetchPromptsPagination() {
      const url = `${apiURL()}/prompts/?page=${controller.page}&size=${
        controller.rowsPerPage
      }`;
      const response = await fetch(url);
      const promptsResponse = await response.json();
      console.log('response', promptsResponse.totalCount, promptsResponse.data);
      setPromptsCount(promptsResponse.totalCount);
      setPrompts(promptsResponse.data);
    }
*/
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      /* if (filteredTopics.length > 0) {
        const categoriesOfFilteredTopics = await findCategoryByTopicId(
          filteredTopics,
        );
        console.log(
          'filteredTopics',
          filteredTopics,
          categoriesResponse,
          categoriesOfFilteredTopics,
        );
        const relatedCategories = categoriesResponse.filter((item) =>
          categoriesOfFilteredTopics.includes(item.id),
        );
        console.log('relCats', relatedCategories);
        setCategories(relatedCategories);
      } */ if (searchedCategories) {
        const filteredCategoriesSearch = categoriesResponse.filter((item) =>
          item.title.toLowerCase().includes(searchedCategories.toLowerCase()),
        );
        setCategories(filteredCategoriesSearch);
      } else {
        setCategories(categoriesResponse);
      }
    }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      let topicsAfterFiltering;
      if (filteredCategories.length > 0 && searchedTopics.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        const filteredTopicsSearch = relatedPrompts.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );

        topicsAfterFiltering = filteredTopicsSearch;
      } else if (searchedTopics.length > 0) {
        const filteredTopicsSearch = topicsResponse.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );
        topicsAfterFiltering = filteredTopicsSearch;
      } else if (filteredCategories.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        topicsAfterFiltering = relatedPrompts;
      } else {
        topicsAfterFiltering = topicsResponse;
      }

      const topicsWithChecked = topicsAfterFiltering.map((topic) => {
        let result;
        if (checkedTopics.includes(topic.id)) {
          result = {
            id: topic.id,
            title: topic.title,
            category_id: topic.category_id,
            checked: true,
          };
          return result;
        }
        result = {
          id: topic.id,
          title: topic.title,
          category_id: topic.category_id,
          checked: false,
        };
        return result;
      });

      setTopics(topicsWithChecked);
    }

    fetchPrompts();
    fetchCategories();
    fetchTopics();
  }, [
    filteredCategories,
    filteredTopics,
    searchedCategories,
    searchedTopics,
    controller,
    checkedTopics,
  ]);
  console.log('topics', topics);
  const testArray = [1, 2, 3];
  const test = testArray.map((item) => {
    if (item === 1) {
      return { item: 1 };
    } else {
      return item;
    }
  });
  console.log('test', test);

  const testFunction = (a) => {
    let b;
    if (a > 3) {
      b = 5;
    } else {
      b = 3;
    }
    console.log('b', b);
  };
  testFunction(2);
  const findCategoryByTopicId = async (topicIds) => {
    const response = await fetch(`${apiURL()}/topics/`);
    const topicsResponse = await response.json();
    const topicsItems = topicsResponse.filter((item) =>
      topicIds.includes(item.id),
    );
    const topicsCategories = topicsItems.map((item) => item.category_id);
    const uniqueTopicsCategories = [...new Set(topicsCategories)];
    return uniqueTopicsCategories;
  };

  const filterHandlerCategories = (event) => {
    if (event.target.checked) {
      setFilteredCategories([
        ...filteredCategories,
        parseInt(event.target.value, 10),
      ]);
    } else {
      setFilteredCategories(
        filteredCategories.filter(
          (filterCategory) =>
            filterCategory !== parseInt(event.target.value, 10),
        ),
      );
    }
  };
  console.log('checkedTopics', checkedTopics);
  const filterHandlerTopics = (event) => {
    if (event.target.checked) {
      setFilteredTopics([...filteredTopics, parseInt(event.target.value, 10)]);
      setCheckedTopics([...checkedTopics, parseInt(event.target.value, 10)]);
    } else {
      setFilteredTopics(
        filteredTopics.filter(
          (filterTopic) => filterTopic !== parseInt(event.target.value, 10),
        ),
      );
      setCheckedTopics(
        checkedTopics.filter(
          (checkedTopic) => checkedTopic !== parseInt(event.target.value, 10),
        ),
      );
    }
  };

  const handleSearchCategories = (event) => {
    setSearchedCategories(event.target.value);
  };
  const handleSearchTopics = (event) => {
    setSearchedTopics(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };
  const promptsList = prompts.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <div className="col-1">
        <Link to={prompt.id.toString()} params={{ id: prompt.id }}>
          {prompt.title}
        </Link>
      </div>
      <div className="col-2">Desc</div>
      <div className="col-3">{prompt.categoryTitle}</div>
      <div className="col-4">{prompt.topicTitle}</div>
      <div className="col-5">Rating</div>
      <div className="col-6">👍 / 👎</div>
      <div className="col-7">❤️</div>
      <div className="col-8">fb</div>
    </div>
  ));
  const categoriesList = categories.map((category) => (
    <li key={category.id}>
      {filteredCategories[0] === category.id ? (
        <input
          type="checkbox"
          checked
          value={category.id}
          onChange={filterHandlerCategories}
        />
      ) : (
        <input
          type="checkbox"
          unchecked
          value={category.id}
          onChange={filterHandlerCategories}
        />
      )}{' '}
      {category.title}
    </li>
  ));

  const topicsList = topics.map((topic) => (
    <li key={topic.id}>
      <input
        type="checkbox"
        checked={topic.checked}
        value={topic.id}
        onChange={filterHandlerTopics}
      />{' '}
      {topic.title}
    </li>
  ));

  return (
    <main>
      <h1 className="hero-header">Prompts</h1>

      <section className="container-prompts">
        <div className="prompts-filter">
          <div className="tab-filter">Categories</div>
          <input
            type="text"
            placeholder="Search categories"
            className="input-search-filter"
            onChange={handleSearchCategories}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{categoriesList}</ul>
          </div>
          <div className="tab-filter">Topics / Subcategories</div>
          <input
            type="text"
            placeholder="Search topics"
            className="input-search-filter"
            onChange={handleSearchTopics}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{topicsList}</ul>
          </div>
        </div>
        <div className="prompts-table">
          <div className="row prompts-header">
            <div className="col-1">Prompt</div>
            <div className="col-2">Description</div>
            <div className="col-3">Category</div>
            <div className="col-4">Topic</div>
            <div className="col-5">Rating</div>
            <div className="col-6">Helpful?</div>
            <div className="col-7">Bookmark</div>
            <div className="col-8">Share</div>
          </div>
          {promptsList}
        </div>
      </section>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={promptsCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </main>
  );
};
