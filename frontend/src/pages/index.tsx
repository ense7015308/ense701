import React, { useState } from "react";
import { Article, fetchArticles } from "../pages/articles/index";
import styles from "./home.module.scss"; // Import a SCSS module for styling

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchingArticles, setMatchingArticles] = useState<Article[]>([]);

  const handleSearch = async () => {
    try {
      const articles = await fetchArticles();
      const matchingArticles = articles.filter((article: Article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setMatchingArticles(matchingArticles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Software Practice Empirical Evidence Database (SPEED)
      </h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Please enter your search keywords"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      <div id="searchResults" className={styles.resultsContainer}>
        <h3>Searching result:</h3>
        {matchingArticles.length > 0 ? (
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
          <div>No matching articles found</div>
        )}
      </div>
    </div>
  );
}
