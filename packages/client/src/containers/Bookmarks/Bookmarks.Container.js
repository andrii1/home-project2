import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Helmet } from 'react-helmet';
import './Bookmarks.Style.css';
import { apiURL } from '../../apiURL';
import { Promptrow } from '../../components/Promptrow/Promptrow.Component';

export const Bookmarks = () => {
  const { user, loading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    const url = `${apiURL()}/favorites`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const favoritesData = await response.json();
    console.log('favoritesData', favoritesData);
    if (Array.isArray(favoritesData)) {
      setFavorites(favoritesData);
      console.log('favoritesData', favoritesData);
    } else {
      setFavorites([]);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const favoritesList = favorites.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <Promptrow
        id={prompt.id}
        title={prompt.title}
        category={prompt.category}
        topic={prompt.topic}
      />
    </div>
  ));
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);
  return (
    <>
      <Helmet>
        <title>Bookmarks</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Bookmarks</h1>
        {favoritesList}
      </main>
    </>
  );
};
