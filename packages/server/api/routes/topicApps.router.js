const express = require('express');

const router = express.Router({ mergeParams: true });
const commentsController = require('../controllers/comments.controller');

router.get('/', async (req, res) => {
  res.json([]);
});
