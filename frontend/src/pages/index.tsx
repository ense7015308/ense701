import React, { useState } from "react";
import { Article, fetchArticles } from "../pages/articles/index";
import styles from "./home.module.scss";

// Define a type for sortable columns
type SortableColumns = "title" | "authors" | "journname" | "pubyear" | "volume" | "num" | "pages" | "doi";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchingArticles, setMatchingArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<SortableColumns | null>(null);

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

  const handleSort = (column: SortableColumns) => {
    const isAsc = sortedColumn === column && sortOrder === "asc";
    setSortedColumn(column);
    setSortOrder(isAsc ? "desc" : "asc");
  
    const sortedArticles = [...matchingArticles];
    sortedArticles.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return isAsc ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  
    setMatchingArticles(sortedArticles);
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
                <th onClick={() => handleSort("title")}>Title</th>
                <th onClick={() => handleSort("authors")}>Authors</th>
                <th onClick={() => handleSort("journname")}>Journal Name</th>
                <th onClick={() => handleSort("pubyear")}>Publication Year</th>
                <th onClick={() => handleSort("volume")}>Volume</th>
                <th onClick={() => handleSort("num")}>Number</th>
                <th onClick={() => handleSort("pages")}>Pages</th>
                <th onClick={() => handleSort("doi")}>DOI</th>
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
