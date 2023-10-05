// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Article model
const Article = require('../../models/Article');

const checkArticleExistence = async (title) => {
  const article = await Article.findOne({ title });
  return article !== null;
};

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('article route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => res.status(404).json({ noarticlesfound: 'No Articles found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(404).json({ noarticlefound: 'No Article found' }));
});

// @route GET api/books/check-duplicate
// @description Check for duplicate articles by title
// @access Public
router.get('/check-duplicate', async (req, res) => {
  const { title } = req.query;

  try {
    const existingArticle = await Article.findOne({ title: { $regex: new RegExp("^" + title + "$", "i") } }).exec();
    
    if (existingArticle) {
      return res.status(200).json({ duplicate: true });
    } else {
      return res.status(200).json({ duplicate: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error checking for duplicate article' });
  }
});

// @route POST api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  // First check if an article with the same title exists
  Article.findOne({ title: { $regex: new RegExp("^" + req.body.title + "$", "i") } }).exec()
    .then(article => {
      if (article) {
        // If an article with the same title is found, send a "Duplicated article" response
        return res.status(400).json({ msg: 'Duplicated article' });
      } else {
        // If no duplicate is found, proceed with creating a new article
        Article.create(req.body)
          .then(article => res.json({ msg: 'Article added successfully' }))
          .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'Unable to add this article' });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error checking for duplicate article' });
    });
});

// @route PUT api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(article => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id, req.body)
    .then(article => res.json({ mgs: 'Article entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such article' }));
});

module.exports = router;
