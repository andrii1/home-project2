import React, { useState } from 'react';
import './Navigation.Style.css';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faRightFromBracket,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal.Component';

export const Navigation = () => {
  const { user, name, logout } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [searchTerms, setSearchTerms] = useState();
  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenModal((openModal) => !openModal);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };
  return (
    <>
      <div className="navigation">
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="nav-link">
                Categories
              </NavLink>
            </li>
            <li>
              <form>
                <label>
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input
                    type="text"
                    className="input-search-navigation"
                    onChange={handleSearch}
                    onFocus={() => setOpenModal((openModal) => !openModal)}
                    placeholder="Search ( ⌘ + k )"
                  />
                </label>
              </form>
            </li>
          </ul>
        </div>
        <div className="nav-buttons">
          <ul>
            <li>
              {user ? (
                <NavLink to="/prompts/new" className="login submit">
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
    </>
  );
};
