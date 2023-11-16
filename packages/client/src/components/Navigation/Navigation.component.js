import React, { useState, useEffect } from 'react';
import './Navigation.Style.css';
import { apiURL } from '../../apiURL';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/images/logo.png';
import {
  faUser,
  faRightFromBracket,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal.Component';

export const Navigation = () => {
  const { user, name, logout } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [resultsHomeApps, setResultsHomeApps] = useState([]);
  const [topics, setTopics] = useState([]);
  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };
  const toggleSearchModal = () => {
    setOpenSearchModal(false);
    document.body.style.overflow = 'visible';
  };
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchModal((modal) => !modal);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const responseCategories = await fetch(`${apiURL()}/categories/`);
      const responseTopics = await fetch(`${apiURL()}/topics/`);
      const categoriesResponse = await responseCategories.json();
      const topicsResponse = await responseTopics.json();
      setTopics(topicsResponse);
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
        setResultsHomeApps(filteredSearch);
      }
    }

    fetchCategories();
    fetchApps();
  }, [searchTerms]);
  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const dropDownResultsTopics = resultsHome.map((result) => {
    let finalResult;
    if (Object.keys(result).length > 2) {
      finalResult = (
        <Link
          to={`/apps/topic/${result.id}`}
          /* state={{ frontPageItem: [result.id] }} */
          onClick={() => toggleSearchModal()}
        >
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    } else {
      finalResult = (
        <Link
          to={`/apps/category/${result.id}`}
          /* state={{ frontPageItem: relatedTopics }} */
          onClick={() => toggleSearchModal()}
        >
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    }
    return finalResult;
  });
  const dropDownResultsApps = resultsHomeApps.map((result) => (
    <Link
      to={`/apps/${result.id}`}
      /* state={{ frontPageItem: relatedTopics }} */
      onClick={() => toggleSearchModal()}
    >
      <li key={result.id}>{result.title}</li>
    </Link>
  ));
  return (
    <>
      <div className="navigation">
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                <img src={logo} alt="logo" className="img-logo" />
              </NavLink>
            </li>
            <li>
              <form>
                <label>
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input
                    type="text"
                    className="input-search-navigation"
                    onFocus={() => setOpenSearchModal((modal) => !modal)}
                    placeholder="Search ( ⌘ + k )"
                  />
                </label>
              </form>
            </li>
            <li>
              <NavLink to="/categories" className="nav-link">
                Categories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-buttons">
          <ul>
            <li>
              {user ? (
                <NavLink to="/apps/new" className="login submit">
                  Submit
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => {
                    setOpenModal(true);
                    setModalTitle('Do you want to add your prompts?');
                  }}
                  className="login submit"
                >
                  Submit
                </NavLink>
              )}
            </li>
            {user ? (
              <div className="container-logged-in">
                <NavLink to="/bookmarks" className="login">
                  Bookmarks
                </NavLink>
                {name}
                <Link to="/">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <FontAwesomeIcon
                  onClick={logout}
                  className="share-icon"
                  icon={faRightFromBracket}
                />
              </div>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="login">
                    Log in
                  </NavLink>
                </li>
                <li>
                  <Link to="/signup" className="signup">
                    <Button primary label="Sign up" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Modal title={modalTitle} open={openModal} toggle={toggleModal}>
        <Link to="/signup">
          <Button primary label="Create an account" />
        </Link>
        or
        <Link to="/login">
          <Button label="Log in" />
        </Link>
      </Modal>
      <Modal
        open={openSearchModal}
        toggle={toggleSearchModal}
        overlayClass="overlay-navigation"
      >
        <form>
          <label>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              className="input-search-modal"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="Search"
            />
          </label>
        </form>
        {searchTerms ? (
          <div className="dropdown-search-modal">
            <h3>Apps</h3>
            <ul>
              {dropDownResultsApps.length > 0 ? (
                dropDownResultsApps
              ) : (
                <li>No apps found :(</li>
              )}
            </ul>
            <h3>Topics & categories</h3>
            <ul>
              {dropDownResultsTopics.length > 0 ? (
                dropDownResultsTopics
              ) : (
                <li>No topics found :(</li>
              )}
            </ul>
          </div>
        ) : (
          ''
        )}
      </Modal>
    </>
  );
};
