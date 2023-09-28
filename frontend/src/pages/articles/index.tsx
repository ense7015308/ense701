import React, { useEffect, useState } from "react";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";
import config from "../../config";

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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles: ', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export default Articles;
