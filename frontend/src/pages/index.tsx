/* 
  name: index.tsx
  desc: home page. search entry field and button returns included titles records
*/

// imports
import React, { useState } from "react";
import { Article, fetchArticles } from "../pages/articles/index";
import styles from "./home.module.scss";

// defines headings for sortable columns to sort by
type SortableColumns = "title" | "authors" | "journname" | "pubyear" | "volume" | "num" | "pages" | "doi";

// export
export default function Home() {

  // initialise constants
  // search-related constants
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchingArticles, setMatchingArticles] = useState<Article[]>([]);

  // sorting-related constants
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<SortableColumns | null>(null);

  // function to accept title-search input, find matching articles, and return them
  const handleSearch = async () => {
    try {
      const articles = await fetchArticles();
      const matchingArticles = articles.filter((article: Article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setMatchingArticles(matchingArticles);

    // error handling
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  // function to sort table data by column selection
  const handleSort = (column: SortableColumns) => {

    // choose which column name and sort type
    const isAsc = sortedColumn === column && sortOrder === "asc";
    setSortedColumn(column);
    setSortOrder(isAsc ? "desc" : "asc");
  
    // sortable articles are records that the search returnd
    const sortedArticles = [...matchingArticles];
    sortedArticles.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      // 'authors' column is array object, so the sorting algorithm is different
      if (column === "authors") {
        const aAuthorsString = a.authors.join(", ");
        const bAuthorsString = b.authors.join(", ");
        if (isAsc) {
          return aAuthorsString.localeCompare(bAuthorsString);
        } else {
          return bAuthorsString.localeCompare(aAuthorsString);
        }

      // 'title', 'journal name', 'pages', and 'doi' columns have atomic string values
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      
      // 'publish year', 'volume', and 'num' columns have atomic number values
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return isAsc ? aValue - bValue : bValue - aValue;
      
      // error handling
      } else {
        return 0;
      }
    });
  
    // set final matching articles to those that match the search input, with user-selected sorting
    setMatchingArticles(sortedArticles);
  };

  // returm
  return (
    <div className={styles.container}>

      {/* heading */}
      <h1 className={styles.heading}>
        Software Practice Empirical Evidence Database (SPEED)
      </h1>

      {/* search input field and button */}
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

      {/* search results table */}
      <div id="searchResults" className={styles.resultsContainer}>
        <h3>Searching result:</h3>
        {matchingArticles.length > 0 ? (
          <table className={styles.resultsTable}>

            {/* sortable column headings */}
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

            {/* matching article values */}
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

        // error handling if there are no matches to the search
        ) : (
          <div>No matching articles found</div>
        )}
      </div>
    </div>
  );
}
