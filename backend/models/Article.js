// models/Article.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true 
  },
  authors: [{
    type: String,
  }],
  journName: {
    type: String,
  },
  pubyear: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  num: {
    type: Number,
  },
  pages: {
    type: String,
  },
  doi: {
    type: String,
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);