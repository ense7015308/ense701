// Import required modules
const express = require("express");
const router = express.Router(); // Initialize a new router instance
const Article = require("../models/Article"); // Import the Article model

// Define a POST route for searching articles based on a keyword
router.post("/", async (req, res) => {
  // Extract the keyword from the request body
  const userInput = req.body.keyword;

  try {
    // Perform a case-insensitive search in the Article collection based on the user input
    const matchingArticles = await Article.find({
      title: { $regex: new RegExp(userInput, "i") },
    });

    // Respond with the matching articles
    res.json(matchingArticles);
  } catch (error) {
    // Log the error and send a generic error message to the client
    console.error("Error searching articles: ", error);
    res.status(500).json({ error: "An error occurred while searching articles." });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
