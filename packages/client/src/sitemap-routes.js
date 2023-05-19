import React from 'react';
import { Route } from 'react-router-dom';

export default (
  <Route>
    <Route path="/" />
    <Route path="/prompts" />
    <Route exact path="/prompts/:id" />
    <Route exact path="/faq" />
    <Route exact path="/login" />
    <Route exact path="/signup" />
    <Route exact path="/reset" />
    <Route exact path="/dashboard" />
  </Route>
);
