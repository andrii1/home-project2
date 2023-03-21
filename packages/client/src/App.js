import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { FrontPage } from './containers/FrontPage/FrontPage.Container';
import { LandingPage } from './containers/LandingPage/LandingPage.Container';
import { Prompts } from './containers/Prompts/Prompts.Container';
import { PromptView } from './containers/PromptView/PromptView.container';
import { Signup } from './containers/Signup/Signup.Container';
import { Login } from './containers/Login/Login.Container';
import { About } from './containers/About/About.container';
import { Navigation } from './components/Navigation/Navigation.component';
import { Footer } from './components/Footer/Footer.component';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route exact path="/prompts/:id" element={<PromptView />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
