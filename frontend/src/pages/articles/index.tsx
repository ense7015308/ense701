import React, { useEffect, useState } from "react";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";
import config from "../../config";

interface Article {
  id: string;
  title: string;
  authors: string[];
  source: string;
  pubyear: number;
  doi: string;
  claim: string;
  evidence: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
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
