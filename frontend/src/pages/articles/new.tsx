import React, { useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import axios from 'axios';
import config from "../../config";
import { useRouter } from "next/router";

const NewDiscussion = () => {
  
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [selectedClaim, setSelectedClaim] = useState("Code Quality Improvement");
  const [selectedEvidence, setSelectedEvidence] = useState("Strong Support");
  
  const router = useRouter();

  const [article, setArticle] = useState({
    title: '', 
    authors: [''],
    source: '',
    pubyear: 0,
    doi: '',
    claim: '',
    evidence: '',
  })

  // eslint-disable-next-line no-unused-vars
  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setArticle({ ...article, [name]: value });
  };


  const submitNewArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const articleData = {
      title,
      authors,
      source,
      pubyear: pubYear,
      doi,
      claim: selectedClaim,
      evidence: selectedEvidence,
    };
  
    console.log(JSON.stringify(articleData));
  
    axios
      .post(`${config.apiUrl}/api/articles`, articleData) // Use articleData here
      .then(() => {
        // ... rest of your code ...
      })
      .catch((error) => {
        console.log('Error logging article: ', error);
      });
  
    router.push('/articles');
  };

  // Some helper methods for the authors array

  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // Return the full form

  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />

        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />

        <label htmlFor="dropdown">Select a claim option:</label>
        <select
          id="dropdown"
          value={selectedClaim}
          onChange={(event) => setSelectedClaim(event.target.value)}
        >
          <option value="Code Quality Improvement">Code Quality Improvement</option>
          <option value="Product Quality Improvement">Product Quality Improvement</option>
        </select>

        <label htmlFor="dropdown">Select an evidence option:</label>
        <select
          id="dropdown"
          value={selectedEvidence}
          onChange={(event) => setSelectedEvidence(event.target.value)}
        >
          <option value="Strong Support">Strong Support</option>
          <option value="Weak Support">Weak Support</option>
        </select>

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
