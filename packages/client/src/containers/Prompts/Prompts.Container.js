import React, { useEffect, useState } from 'react';

import { apiURL } from '../../apiURL';
import './Prompts.Style.css';

import { Pagination } from '../../components/Pagination/Pagination.component';

export const Prompts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    async function fetchPrompts() {
      const url = `${apiURL()}/prompts/`;
      const response = await fetch(url);
      const promptsResponse = await response.json();
      console.log('pr', promptsResponse);

      if (filteredCategories.length > 0) {
        const filteredPrompts = promptsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        console.log('filterCategories', filteredCategories);
        console.log('pr3', filteredPrompts);
        setPrompts(filteredPrompts);
      } else {
        setPrompts(promptsResponse);
      }
    }
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      setCategories(categoriesResponse);
    }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);
    }
    fetchPrompts();
    fetchCategories();
    fetchTopics();
  }, [filteredCategories]);

  const filterHandler = (event) => {
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
    console.log(filteredCategories);
  };
  const promptsList = prompts.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <div className="col-1">{prompt.title}</div>
      <div className="col-2">Text goes here</div>
      <div className="col-3">{prompt.categoryTitle}</div>
      <div className="col-4">{prompt.topicTitle}</div>
      <div className="col-5">Rating</div>
      <div className="col-6">👍 / 👎</div>
      <div className="col-7">❤️</div>
      <div className="col-8">fb</div>
    </div>
  ));
  const categoriesList = categories.map((category) => (
    <li key={category.id}>
      <input type="checkbox" value={category.id} onChange={filterHandler} />
      {category.title}
    </li>
  ));
  const topicsList = topics.map((topic) => (
    <li key={topic.id}>
      <input type="checkbox" /> {topic.title}
    </li>
  ));

  return (
    <main>
      <h1 className="hero-header">Prompts</h1>

      <section className="container-prompts">
        <div className="prompts-filter">
          <div className="tab-filter">Categories</div>
          <div className="checkboxes">
            <ul>{categoriesList}</ul>
          </div>
          <div className="tab-filter">Topics</div>
          <div className="checkboxes">
            <ul>{topicsList}</ul>
          </div>
        </div>
        <div className="prompts-table">
          <div className="row prompts-header">
            <div className="col-1">Prompt</div>
            <div className="col-2">Description</div>
            <div className="col-3">Category</div>
            <div className="col-4">Topic</div>
            <div className="col-5">Rating</div>
            <div className="col-6">Helpful?</div>
            <div className="col-7">Bookmark</div>
            <div className="col-8">Share</div>
          </div>
          {promptsList}
        </div>
      </section>
      <Pagination />
    </main>
  );
};
