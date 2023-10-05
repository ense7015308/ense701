const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.post("/", async (req, res) => {
  const userInput = req.body.keyword;

  try {
    const matchingArticles = await Article.find({
      title: { $regex: new RegExp(userInput, "i") }, // Case-insensitive search
    });

    res.json(matchingArticles);
  } catch (error) {
    console.error("Error searching articles: ", error);
    res.status(500).json({ error: "An error occurred while searching articles." });
  }
});

module.exports = router;
