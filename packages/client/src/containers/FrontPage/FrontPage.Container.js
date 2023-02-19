import React, { useEffect, useState } from 'react';

import { apiURL } from '../../apiURL';
import './FrontPage.Style.css';
import { Button } from '../../components/Button/Button.component';

export const FrontPage = () => {
  const [exampleResources, setExampleResources] = useState([]);
  useEffect(() => {
    async function fetchExampleResources() {
      const response = await fetch(`${apiURL()}/exampleResources`);
      const examples = await response.json();
      setExampleResources(examples);
    }

    fetchExampleResources();
  }, []);

  return (
    <div className="main-container">
      <div className="navigation">
        <div className="logo">Home</div>
        <div className="menu">
          <ul>
            <li>
              <span>Log in</span>
            </li>
            <li>
              <Button primary label="Sign up" />
            </li>
          </ul>
        </div>
      </div>
      <main>
        <div className="main-container">
          <div className="hero">
            <h1>Find best prompts</h1>
            <form>
              <label>
                <input type="text" placeholder="Search" />
              </label>
              <br />
              <input type="submit" value="Find prompts!" />
            </form>
          </div>
        </div>
      </main>

      <div className="footer">
        <span>Prompts</span>
        <span>About</span>
        <span>&copy;2023</span>
      </div>
    </div>
  );
};
