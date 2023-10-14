// Import necessary React and utility functions
import React, { useState } from "react";
import { Article, fetchArticles } from "../pages/articles/index";
// Import styling for the Home component
import styles from "./home.module.scss";

// Define the Home component
export default function Home() {
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for storing articles that match the search term
  const [matchingArticles, setMatchingArticles] = useState<Article[]>([]);

  // Function to handle search functionality
  const handleSearch = async () => {
    try {
      // Fetch all articles
      const articles = await fetchArticles();

      // Filter articles to match the entered search term
      const matchingArticles = articles.filter((article: Article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Update state with the matching articles
      setMatchingArticles(matchingArticles);
    } catch (error) {
      // Log any error that arises during fetching or processing articles
      console.error("Error fetching articles: ", error);
    }
  };

  // Render the Home component
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Software Practice Empirical Evidence Database (SPEED)
      </h1>
      <div className={styles.searchContainer}>
        {/* Input field for the user to enter search term */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Please enter your search keywords"
          className={styles.searchInput}
        />
        {/* Button to trigger the search */}
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      {/* Container to display the search results */}
      <div id="searchResults" className={styles.resultsContainer}>
        <h3>Searching Result:</h3>
        {matchingArticles.length > 0 ? (
          // Display the search results in a table format
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Journal Name</th>
                <th>Publication Year</th>
                <th>Volume</th>
                <th>Number</th>
                <th>Pages</th>
                <th>DOI</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterate over each matching article and display its details */}
              {matchingArticles.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.authors.join(", ")}</td>
                  <td>{article.journname}</td>
                  <td>{article.pubyear}</td>
                  <td>{article.volume}</td>
                  <td>{article.num}</td>
                  <td>{article.pages}</td>
                  <td>{article.doi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // Display a message if no matching articles are found
          <div>No matching articles found</div>
        )}
      </div>
    </div>
  );
}
