require('babel-register')({
  presets: ['es2015', 'react'],
});

const fetch = require('node-fetch');
const router = require('./sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

async function generateSitemap() {
  try {
    const response = await fetch(
      `http://localhost:5001/api/prompts/?column=id&direction=asc`,
    );
    const promptsResult = await response.json();
    const prompts = promptsResult.data;
    const idMap = [];

    prompts.forEach((prompt) => {
      idMap.push({ id: prompt.id });
    });

    const paramsConfig = {
      '/prompts/:id': idMap,
    };

    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build('https://www.prompthunt.me')
      .save('./public/sitemap.xml');
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
