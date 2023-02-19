import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FrontPage } from './containers/FrontPage/FrontPage.Container';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
