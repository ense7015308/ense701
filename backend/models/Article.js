// models/Book.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
  }],
  source: {
    type: String,
  },
  pubyear: {
    type: Number,
  },
  doi: {
    type: String,
  },
  claim: {
    type: String,
  },
  evidence: {
    type: String,
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);