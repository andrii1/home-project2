/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CSVLink } from 'react-csv';
import { TablePagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonMui from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import {
  faSearch,
  faArrowUp,
  faArrowsUpDown,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import iconCopy from '../../assets/images/icons8-copy-24.png';
import { apiURL } from '../../apiURL';
import { Checkbox } from '../../components/Checkbox/Checkbox.component';
import './Prompts.Style.css';

const ButtonMuiStyled = styled(ButtonMui)({
  color: '#946b54',
  border: '1px solid #946b54',
  '&:hover': {
    backgroundColor: '#f4f1ee',
  },
});

export const Prompts = () => {
  /* Clearing location state on page reload */
  window.history.replaceState({}, document.title);

  const location = useLocation();
  const { frontPageItem = '' } = location.state || {};
  let initialStateTopics;
  console.log(
    'frontPageItem',
    frontPageItem,
    Object.keys(frontPageItem).length,
  );
  if (frontPageItem) {
    initialStateTopics = frontPageItem;
  } else {
    initialStateTopics = [];
  }

  const [isLoading, setIsLoading] = useState(false);
  const [topicsListActive, setTopicsListActive] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [orderBy, setOrderBy] = useState({
    column: 'prompts.id',
    direction: 'asc',
    class: 'arrow-up',
  });
  const [promptsCount, setPromptsCount] = useState(0);
  const [promptsExport, setPromptsExport] = useState([]);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 50,
  });
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);
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

    async function fetchPrompts() {
      const url = `${apiURL()}/prompts/${urlFilters}`;
      const response = await fetch(url);
      const promptsResponse = await response.json();
      setPromptsCount(promptsResponse.totalCount);
      setPrompts(promptsResponse.data);
      const promptsExportReady = promptsResponse.dataExport.map((prompt) => {
        return {
          id: prompt.id,
          prompt: prompt.title,
          category: prompt.categoryTitle,
          topic: prompt.topicTitle,
        };
      });
      setPromptsExport(promptsExportReady);
    }

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

      // eslint-disable-next-line prefer-arrow-callback
      let topicsAfterSearch;
      if (searchedTopics) {
        const filteredTopicsSearch = topicsResponse.filter(
          (item) =>
            item.title.toLowerCase().includes(searchedTopics.toLowerCase()) ||
            item.categoryTitle
              .toLowerCase()
              .includes(searchedTopics.toLowerCase()),
        );
        topicsAfterSearch = filteredTopicsSearch;
      } else {
        topicsAfterSearch = topicsResponse;
      }
      const result1 = topicsAfterSearch.reduce((acc, d) => {
        const found = acc.find((a) => a.categoryId === d.categoryId);
        /* const value = { name: d.name, val: d.value }; */
        const value = {
          id: d.id,
          title: d.title,
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
            active: false,
            topics: [value],
          }); // not found, so need to add data property
        } else {
          /* acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] }); */
          found.topics.push(value); // if found, that means data property exists, so just push new element to found.data.
        }
        return acc;
      }, []);

      let result;
      if (topicsListActive) {
        const activeTopics = result1.map((category) => {
          if (topicsListActive.includes(category.categoryId)) {
            return {
              categoryId: category.categoryId,
              categoryTitle: category.categoryTitle,
              checked: category.checked,
              indeterminate: category.indeterminate,
              active: !category.active,
              topics: category.topics,
            };
          }
          return {
            categoryId: category.categoryId,
            categoryTitle: category.categoryTitle,
            checked: category.checked,
            indeterminate: category.indeterminate,
            active: category.active,
            topics: category.topics,
          };
        });
        result = activeTopics;
      } else {
        result = result1;
      }
      if (filteredTopics.length > 0) {
        const filteredTopicsResult = result.map((category) => {
          const topicsList = category.topics.map((topic) => {
            if (filteredTopics.includes(topic.id)) {
              return {
                id: topic.id,
                title: topic.title,
                categoryId: topic.categoryId,
                checked: true,
              };
            }
            return {
              id: topic.id,
              title: topic.title,
              categoryId: topic.categoryId,
              checked: false,
            };
          });

          const relatedTopics = topicsResponse
            .filter((item) => item.categoryId === category.categoryId)
            .map((item) => item.id);
          const allFounded = relatedTopics.every((ai) =>
            filteredTopics.includes(ai),
          );
          const someFounded = relatedTopics.some((ai) =>
            filteredTopics.includes(ai),
          );

          if (allFounded) {
            return {
              categoryId: category.categoryId,
              categoryTitle: category.categoryTitle,
              checked: true,
              indeterminate: false,
              active: category.active,
              topics: topicsList,
            };
          }
          if (someFounded) {
            return {
              categoryId: category.categoryId,
              categoryTitle: category.categoryTitle,
              checked: false,
              indeterminate: true,
              active: category.active,
              topics: topicsList,
            };
          }
          return {
            categoryId: category.categoryId,
            categoryTitle: category.categoryTitle,
            checked: false,
            indeterminate: false,
            active: category.active,
            topics: topicsList,
          };
        });

        setTopics(filteredTopicsResult);
      } else if (filteredCategories.length > 0) {
        const updatedCategories = result.map((item) => {
          if (filteredCategories.includes(item.categoryId)) {
            return {
              categoryId: item.categoryId,
              categoryTitle: item.categoryTitle,
              checked: true,
              indeterminate: false,
              active: item.active,
              topics: item.topics.map((topic) => {
                return {
                  id: topic.id,
                  title: topic.title,
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
            active: item.active,
            topics: item.topics.map((topic) => {
              return {
                id: topic.id,
                title: topic.title,
                checked: false,
              };
            }),
          };
        });
        setTopics(updatedCategories);
      } else {
        setTopics(result);
      }
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
    topicsListActive,
  ]);

  /*
  useEffect(() => {
    //Runs only on the first render
  }, []); */

  const filterHandlerCategories = async (event) => {
    if (event.target.checked) {
      const relatedTopics = await getTopicsByCategory(
        parseInt(event.target.value, 10),
      );
      setFilteredTopics([...filteredTopics.concat(relatedTopics)]);
    } else {
      const relatedTopics = await getTopicsByCategory(
        parseInt(event.target.value, 10),
      );
      setFilteredTopics(
        filteredTopics.filter((el) => !relatedTopics.includes(el)),
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

  const getTopicsByCategory = async (categoryId) => {
    const response = await fetch(`${apiURL()}/topics/`);
    const topicsResponse = await response.json();
    const relatedTopics = topicsResponse
      .filter((item) => item.categoryId === categoryId)
      .map((item) => item.id);
    return relatedTopics;
  };
  const handleSearchPrompts = (event) => {
    setSearchedPrompts(event.target.value);
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

  const toggleTopicsList = (id) => {
    if (!topicsListActive.includes(id)) {
      setTopicsListActive([...topicsListActive, parseInt(id, 10)]);
    } else {
      setTopicsListActive(
        topicsListActive.filter(
          (activeTopic) => activeTopic !== parseInt(id, 10),
        ),
      );
    }
  };

  const promptsList = prompts.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <div className="col-1">{prompt.title}</div>
      <div className="col-2">
        <span className="prompt-additional-text">Category:&nbsp;</span>
        {prompt.categoryTitle}
      </div>
      <div className="col-3">
        <span className="prompt-additional-text">Topic:&nbsp;</span>
        {prompt.topicTitle}
      </div>
      {/*<div className="col-4">Rating</div>
      <div className="col-5">👍 / 👎</div>
      <div className="col-6">❤️</div>*/}
      <div className="col-7">
        <div className="icons-prompts">
          <button
            type="button"
            className="button-copy"
            onClick={() => {
              navigator.clipboard.writeText(prompt.title);
            }}
          >
            <img src={iconCopy} alt="copy" className="icon-copy" />
          </button>
          <Link to={prompt.id.toString()} params={{ id: prompt.id }}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
          <FacebookShareButton
            url={`https://www.example.com/prompts/${prompt.id}`}
          >
            <FontAwesomeIcon className="share-icon" icon={faFacebookF} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.example.com/prompts/${prompt.id}`}
            title={`Check out this GPT prompt: '${prompt.title}'`}
            hashtags={['prompts']}
          >
            <FontAwesomeIcon className="share-icon" icon={faTwitter} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`https://www.example.com/prompts/${prompt.id}`}
          >
            <FontAwesomeIcon className="share-icon" icon={faLinkedinIn} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  ));
  const categoriesList = topics.map((category) => (
    <li key={category.categoryId} className="category">
      <Checkbox
        checked={category.checked}
        value={category.categoryId}
        onChange={filterHandlerCategories}
        label={category.categoryTitle}
        indeterminate={category.indeterminate}
        className="category-list"
        active={category.active}
        toggleTopicsList={() => toggleTopicsList(category.categoryId)}
      />
      <ul
        className={`topics-list ${
          category.active ? 'topics-active' : 'topics-disabled'
        }`}
      >
        {category.topics.map((topic) => (
          <li key={topic.id}>
            <input
              type="checkbox"
              checked={topic.checked}
              value={topic.id}
              onChange={filterHandlerTopics}
            />{' '}
            {topic.title}
          </li>
        ))}
      </ul>
    </li>
  ));

  const exportButton = false;
  return (
    <>
      <Helmet>
        <title>Prompt library</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Prompts</h1>

        <section className="container-prompts">
          <div className="prompts-filter">
            <div className="tab-filter">Categories and Topics</div>
            <FontAwesomeIcon className="search-icon-filter" icon={faSearch} />
            <input
              type="text"
              placeholder="Search categories or topics"
              className="input-search"
              onChange={handleSearchTopics}
            />
            <div className="checkboxes">
              <ul className="checkboxes-list">{categoriesList}</ul>
            </div>
          </div>
          <div className="prompts-container">
            <div className="prompts-container-header">
              <div className="prompts-search">
                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                <input
                  type="text"
                  placeholder="Search prompts"
                  className="input-search-prompts"
                  onChange={handleSearchPrompts}
                />
              </div>
              {exportButton ? (
                <CSVLink filename={'prompts.csv'} data={promptsExport}>
                  <ButtonMuiStyled
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    style={{
                      color: '#946b54',
                      border: '1px solid #946b54',
                      '&:hover': {
                        backgroundColor: 'red!important',
                        color: '#3c52b2',
                      },
                    }}
                  >
                    Export
                  </ButtonMuiStyled>
                </CSVLink>
              ) : (
                <Tooltip
                  disableFocusListener
                  title="Please create an account to access this feature"
                  arrow
                >
                  <span>
                    <ButtonMui
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      disabled
                    >
                      Export
                    </ButtonMui>
                  </span>
                </Tooltip>
              )}
            </div>
            <div className="prompts-table">
              <div className="row prompts-header">
                <div className="col-1">
                  <div
                    className="sort-div"
                    id="prompts.title"
                    onClick={sortHandler}
                  >
                    <FontAwesomeIcon
                      className={`sort-icon ${
                        orderBy.column === 'prompts.title' ? orderBy.class : ''
                      }`}
                      icon={
                        orderBy.column === 'prompts.title'
                          ? faArrowUp
                          : faArrowsUpDown
                      }
                    />
                    Prompt
                  </div>
                </div>

                <div className="col-2">
                  <div
                    className="sort-div"
                    id="categories.title"
                    onClick={sortHandler}
                  >
                    <FontAwesomeIcon
                      className={`sort-icon ${
                        orderBy.column === 'categories.title'
                          ? orderBy.class
                          : ''
                      }`}
                      icon={
                        orderBy.column === 'categories.title'
                          ? faArrowUp
                          : faArrowsUpDown
                      }
                    />
                    Category
                  </div>
                </div>
                <div className="col-3">
                  <div
                    className="sort-div"
                    id="topics.title"
                    onClick={sortHandler}
                  >
                    <FontAwesomeIcon
                      className={`sort-icon ${
                        orderBy.column === 'topics.title' ? orderBy.class : ''
                      }`}
                      id="topics.title"
                      icon={
                        orderBy.column === 'topics.title'
                          ? faArrowUp
                          : faArrowsUpDown
                      }
                    />
                    Topic
                  </div>
                </div>
                {/*<div className="col-4">
                <div id="ratings">Rating</div>
              </div>
                  <div className="col-5">Helpful?</div>
              <div className="col-6">Bookmark</div>*/}
                <div className="col-7" />
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
    </>
  );
};
