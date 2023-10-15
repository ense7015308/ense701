/* 
  name: index.tsx
  desc: home page. search entry field and button returns included titles records
*/

// imports
import React, { useState } from "react";
import { Article, fetchArticles } from "../pages/articles/index";
import styles from "./home.module.scss";

// defines headings for sortable columns to sort by
type SortableColumns =
  | "title"
  | "authors"
  | "journname"
  | "pubyear"
  | "volume"
  | "num"
  | "pages"
  | "doi";

// export
export default function Home() {
  // initialise constants
  // search-related constants
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  // State for storing articles that match the search term
  const [matchingArticles, setMatchingArticles] = useState<Article[]>([]);

  // sorting-related constants
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<SortableColumns | null>(
    null
  );

  // Function to handle search functionality
  const handleKeywordSearch = async () => {
    try {
      // Fetch all articles
      const articles = await fetchArticles();

      // Filter articles to match the entered search term
      const filteredArticles = articles.filter((article: Article) => {
        return article.title.toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Update state with the matching articles
      setMatchingArticles(filteredArticles);
    } catch (error) {
      // Log any error that arises during fetching or processing articles
      console.error("Error fetching articles: ", error);
    }
  };
  const handleFilterSearch = async () => {
    try {
      const articles = await fetchArticles();

      // Filter articles based on the selected SE method
      const filteredArticles = articles.filter((article: Article) =>
        article.title.toLowerCase().includes(selectedMethod.toLowerCase())
      );

      setMatchingArticles(filteredArticles);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

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
        return isAsc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);

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
        {/* Input field for the user to enter search term */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Please enter your search keywords"
          className={styles.searchInput}
        />
        {/* Button to trigger the search */}
        <button onClick={handleKeywordSearch} className={styles.searchButton}>
          Keyword Search
        </button>
      </div>
      {/* Filter Search */}
      <div className={styles.filterOptions}>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="Waterfall"
            className={styles.radioInput}
            checked={selectedMethod === "Waterfall"}
            onChange={handleMethodChange}
          />
          Waterfall
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="Agile"
            className={styles.radioInput}
            checked={selectedMethod === "Agile"}
            onChange={handleMethodChange}
          />
          Agile
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="V-Model"
            className={styles.radioInput}
            checked={selectedMethod === "V-Model"}
            onChange={handleMethodChange}
          />
          V-Model(Validation and Verification)
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="Scrum"
            className={styles.radioInput}
            checked={selectedMethod === "Scrum"}
            onChange={handleMethodChange}
          />
          Scrum
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="DevOps"
            className={styles.radioInput}
            checked={selectedMethod === "DevOps"}
            onChange={handleMethodChange}
          />
          DevOps
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="Test-Driven Development"
            className={styles.radioInput}
            checked={selectedMethod === "Test-Driven Development"}
            onChange={handleMethodChange}
          />
          Test-Driven Development(TDD)
        </label>
        <label className={styles.labelText}>
          <input
            type="radio"
            value="Rapid Application Development"
            className={styles.radioInput}
            checked={selectedMethod === "Rapid Application Development"}
            onChange={handleMethodChange}
          />
          Rapid Application Development(RAD)
        </label>
      </div>
      <button onClick={handleFilterSearch} className={styles.searchButton}>
        SE Method Search
      </button>

      {/* Container to display the search results */}
      <div id="searchResults" className={styles.resultsContainer}>
        <h3>Searching Result:</h3>
        {matchingArticles.length > 0 ? (
          // Display the search results in a table format
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
          // error handling if there are no matches to the search
          // Display a message if no matching articles are found
          <div>No matching articles found</div>
        )}
      </div>
    </div>
  );
}
