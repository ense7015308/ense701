/*
  name:   index.tsx
  desc:   page for user to view all added articles
*/

// imports
import React, { useEffect, useState } from "react";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";
import config from "../../config";
import tableStyles from "../../components/table/tableStyles.module.scss";

// interface initialises article attributes and datatypes
interface Article {
  id: string;
  title: string;
  authors: string[];
  journname: string;
  pubyear: number;
  volume: number;
  num: number;
  pages: string;
  doi: string;
}

// arrow function to fetch articles
const Articles = () => {
  // initialise article arraylist
  const [articles, setArticles] = useState<Article[]>([]);

  // initialise article attribute headings
  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "journname", label: "Journal Name" },
    { key: "pubyear", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "num", label: "Number" },
    { key: "pages", label: "Pages" },
    { key: "doi", label: "DOI" },
  ];

  // useEffect to get articles from mongodb
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };
    fetchArticles();
  }, []);

  // return index page
  return (
    <div className="container">
      {/* headings */}
      <h1>Articles Index Page</h1>
      <h3>
        <p>Page containing a table of articles:</p>
      </h3>

      {/* table of articles using initialised headings */}
      <div className={tableStyles.borderedSortableTable}>
        <SortableTable headers={headers} data={articles} />
      </div>
    </div>
  );
};
const fetchArticles = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/articles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles: ", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
};
// export
export default Articles;
export type { Article }; // Export the Article type
export { fetchArticles };
