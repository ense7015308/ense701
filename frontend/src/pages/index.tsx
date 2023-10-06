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
          matchingArticles.map((article) => (
            <div key={article.id}>{article.title}</div>
          ))
        ) : (
          <div>No matching articles found</div>
        )}
      </div>
    </div>
  );
}
