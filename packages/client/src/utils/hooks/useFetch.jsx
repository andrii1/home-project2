import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { apiURL } from '../../apiURL';

function useFetch(page, topicIdParam, categoryIdParam) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [apps, setApps] = useState([]);
  const location = useLocation();

  const fetchApps = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      let url;
      if (topicIdParam) {
        url = `${apiURL()}/apps?filteredTopics=${topicIdParam}&page=${page}`;
      } else if (categoryIdParam) {
        url = `${apiURL()}/apps?filteredCategories=${categoryIdParam}&page=${page}`;
      } else {
        url = `${apiURL()}/apps?page=${page}`;
      }
      const response = await fetch(url);
      const appsResponse = await response.json();
      setApps((prevItems) => [...prevItems, ...appsResponse]);
      // setApps((prevItems) => [...prevItems, ...appsResponse]);

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [page, categoryIdParam, topicIdParam]);

  useEffect(() => {
    fetchApps();
  }, [page, fetchApps]);

  useEffect(() => {
    setApps([]);
  }, [location]);

  return { loading, error, apps };
}

export default useFetch;
