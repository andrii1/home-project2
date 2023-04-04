/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { apiURL } from '../../apiURL';
import { Checkbox } from '../../components/Checkbox/Checkbox.component';
import './Prompts.Style.css';

export const Prompts = () => {
  /* Clearing location state on page reload */
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
  const [prompts, setPrompts] = useState([]);
  const [orderBy, setOrderBy] = useState({
    column: 'prompts.id',
    direction: 'asc',
    class: 'arrow-up',
  });
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
  const [searchedPrompts, setSearchedPrompts] = useState('');
  useEffect(() => {
    let urlFilters = '';
    if (
      filteredCategories.length > 0 &&
      filteredTopics.length > 0 &&
      searchedPrompts.length > 0
    ) {
      urlFilters = `?filteredTopics=${filteredTopics}&search=${searchedPrompts}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredCategories.length > 0 && searchedPrompts.length > 0) {
      urlFilters = `?filteredCategories=${filteredCategories}&search=${searchedPrompts}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredTopics.length > 0 && searchedPrompts.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}&search=${searchedPrompts}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredCategories.length > 0 && filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredCategories.length > 0) {
      urlFilters = `?filteredCategories=${filteredCategories}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else if (searchedPrompts.length > 0) {
      urlFilters = `?search=${searchedPrompts}&column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    } else {
      urlFilters = `?column=${orderBy.column}&direction=${orderBy.direction}&page=${controller.page}&size=${controller.rowsPerPage}`;
    }
    console.log('urlFilters', urlFilters);
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
      if (searchedCategories) {
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
      console.log('topicsResponse', topicsResponse);
      // eslint-disable-next-line prefer-arrow-callback
      const arr = [
        { name: 'qewregf dqewafs', value: 'qewregf dqewafs answer', count: 2 },
        {
          name: 'survey with select',
          value: 'survey with select answer',
          count: 2,
        },
        { name: 'werasd', value: 'Donald', count: 1 },
        { name: 'werasd', value: 'Jim', count: 1 },
      ];

      const result = topicsResponse.reduce((acc, d) => {
        const found = acc.find((a) => a.categoryId === d.categoryId);
        /* const value = { name: d.name, val: d.value }; */
        const value = {
          topicId: d.topicId,
          topicTitle: d.topicTitle,
          categoryId: d.categoryId,
          checked: false,
        }; // the element in data property
        if (!found) {
          /* acc.push(...value); */
          acc.push({
            categoryId: d.categoryId,
            categoryTitle: d.categoryTitle,
            checked: false,
            indeterminate: false,
            topics: [value],
          }); // not found, so need to add data property
        } else {
          /* acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] }); */
          found.topics.push(value); // if found, that means data property exists, so just push new element to found.data.
        }
        return acc;
      }, []);
      if (filteredTopics.length > 0) {
        const filteredTopicsResult = topicsResponse.reduce((acc, d) => {
          const found = acc.find((a) => a.categoryId === d.categoryId);
          /* const value = { name: d.name, val: d.value }; */
          let value;
          if (filteredTopics.includes(d.topicId)) {
            value = {
              topicId: d.topicId,
              topicTitle: d.topicTitle,
              categoryId: d.categoryId,
              checked: true,
            };
          } else {
            value = {
              topicId: d.topicId,
              topicTitle: d.topicTitle,
              categoryId: d.categoryId,
              checked: false,
            };
          }
          // the element in data property
          if (!found) {
            /* acc.push(...value); */
            acc.push({
              categoryId: d.categoryId,
              categoryTitle: d.categoryTitle,
              checked: false,
              indeterminate: false,
              topics: [value],
            }); // not found, so need to add data property
          } else {
            /* acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] }); */
            found.topics.push(value); // if found, that means data property exists, so just push new element to found.data.
          }
          return acc;
        }, []);
        setTopics(filteredTopicsResult);
      } else if (filteredCategories.length > 0) {
        const updatedCategories = result.map((item) => {
          if (filteredCategories.includes(item.categoryId)) {
            return {
              categoryId: item.categoryId,
              categoryTitle: item.categoryTitle,
              checked: true,
              indeterminate: false,
              topics: item.topics.map((topic) => {
                return {
                  topicId: topic.topicId,
                  topicTitle: topic.topicTitle,
                  checked: true,
                };
              }),
            };
          }
          return {
            categoryId: item.categoryId,
            categoryTitle: item.categoryTitle,
            checked: false,
            indeterminate: false,
            topics: item.topics.map((topic) => {
              return {
                topicId: topic.topicId,
                topicTitle: topic.topicTitle,
                checked: false,
              };
            }),
          };
        });
        console.log('updatedCategories', updatedCategories);
        setTopics(updatedCategories);
      } else {
        setTopics(result);
      }

      console.log('categoriesAndTopics', result);
      /* if (filteredCategories.length > 0 && searchedTopics.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        const filteredTopicsSearch = relatedPrompts.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );
        setTopics(filteredTopicsSearch);
      } else if (searchedTopics.length > 0) {
        const filteredTopicsSearch = topicsResponse.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );
        setTopics(filteredTopicsSearch);
      } else if (filteredCategories.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        setTopics(relatedPrompts);
      } else {
        setTopics(topicsResponse);
      } */
    }
    fetchPrompts();
    fetchCategories();
    fetchTopics();
    /* fetchPromptsPagination(); */
  }, [
    filteredCategories,
    filteredTopics,
    searchedCategories,
    searchedTopics,
    controller,
    orderBy,
    searchedPrompts,
  ]);

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
  console.log('filteredTopics', filteredTopics);
  const handleSearchPrompts = (event) => {
    setSearchedPrompts(event.target.value);
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

  const sortHandler = (event) => {
    const { id } = event.target;
    let { direction = '' } = orderBy || {};
    const { column = '' } = orderBy || {};
    let sortClass;
    if (id === column) {
      if (direction === '') {
        direction = 'asc';
        sortClass = 'arrow-up';
      } else if (direction === 'asc') {
        direction = 'desc';
        sortClass = 'arrow-down';
      } else if (direction === 'desc') {
        direction = 'asc';
        sortClass = 'arrow-up';
      }
    } else {
      direction = 'asc';
      sortClass = 'arrow-up';
    }

    setOrderBy({ column: id, direction, class: sortClass });
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
  const categoriesList = topics.map((category) => (
    <li key={category.categoryId}>
      <Checkbox
        checked={category.checked}
        value={category.categoryId}
        onChange={filterHandlerCategories}
        label={category.categoryTitle}
        indeterminate={category.indeterminate}
      />
      <ul>
        {category.topics.map((topic) => (
          <li key={topic.topicId}>
            <input
              type="checkbox"
              checked={topic.checked}
              value={topic.topicId}
              onChange={filterHandlerTopics}
            />{' '}
            {topic.topicTitle}
          </li>
        ))}
      </ul>
    </li>
  ));
  /* const topicsList = topics.map((topic) => (
    <li key={topic.id}>
      {filteredTopics[0] === topic.id ? (
        <input
          type="checkbox"
          checked
          value={topic.id}
          onChange={filterHandlerTopics}
        />
      ) : (
        <input
          type="checkbox"
          unchecked
          value={topic.id}
          onChange={filterHandlerTopics}
        />
      )}{' '}
      {topic.title}
    </li>
  )); */

  return (
    <main>
      <h1 className="hero-header">Prompts</h1>

      <section className="container-prompts">
        <div className="prompts-filter">
          <div className="tab-filter">Categories</div>
          <FontAwesomeIcon className="search-icon-filter" icon={faSearch} />
          <input
            type="text"
            placeholder="Search categories"
            className="input-search"
            onChange={handleSearchCategories}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{categoriesList}</ul>
          </div>
          <div className="tab-filter">Topics / Subcategories</div>
          <FontAwesomeIcon className="search-icon-filter" icon={faSearch} />
          <input
            type="text"
            placeholder="Search topics"
            className="input-search"
            onChange={handleSearchTopics}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{''}</ul>
          </div>
        </div>
        <div className="prompts-container">
          <div className="prompts-search">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              type="text"
              placeholder="Search prompts"
              className="input-search-prompts"
              onChange={handleSearchPrompts}
            />
          </div>
          <div className="prompts-table">
            <div className="row prompts-header">
              <div className="col-1">
                <div
                  className={`sort-div ${
                    orderBy.column === 'prompts.title'
                      ? orderBy.class
                      : 'arrows-up-down'
                  }`}
                  id="prompts.title"
                  onClick={sortHandler}
                >
                  Prompt
                </div>
              </div>
              <div className="col-2">Description</div>
              <div className="col-3">
                <div
                  className={`sort-div ${
                    orderBy.column === 'categories.title'
                      ? orderBy.class
                      : 'arrows-up-down'
                  }`}
                  id="categories.title"
                  onClick={sortHandler}
                >
                  Category
                </div>
              </div>
              <div className="col-4">
                <div
                  className={`sort-div ${
                    orderBy.column === 'topics.title'
                      ? orderBy.class
                      : 'arrows-up-down'
                  }`}
                  id="topics.title"
                  onClick={sortHandler}
                >
                  Topic
                </div>
              </div>
              <div className="col-5">
                <div id="ratings">Rating</div>
              </div>
              <div className="col-6">Helpful?</div>
              <div className="col-7">Bookmark</div>
              <div className="col-8">Share</div>
            </div>
            {promptsList}
          </div>
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
