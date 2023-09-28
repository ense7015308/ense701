import React, { useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import axios from 'axios';
import config from "../../config";
import { useRouter } from "next/router";

const NewDiscussion = () => {
  
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [journName, setJournName] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const [pages, setPages] = useState("");
  const [doi, setDoi] = useState("");
  
  const router = useRouter();

  const [article, setArticle] = useState({
    title: '', 
    authors: [''],
    journName: '',
    pubyear: 0,
    volume: 0,
    num: 0,
    pages: '',
    doi: '',
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
      journName,
      pubyear: pubYear,
      volume: volume,
      num: num,
      pages,
      doi,
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

        <label htmlFor="journName">Journal Name:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="journName"
          id="journName"
          value={journName}
          onChange={(event) => {
            setJournName(event.target.value);
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

        <label htmlFor="volume">Volume:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="volume"
          id="volume"
          value={volume}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setVolume(0);
            } else {
              setVolume(parseInt(val));
            }
          }}
        />

        <label htmlFor="num">Number:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="num"
          id="num"
          value={num}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setNum(0);
            } else {
              setNum(parseInt(val));
            }
          }}
        />

        <label htmlFor="pages">Pages:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="pages"
          id="pages"
          value={pages}
          onChange={(event) => {
            setPages(event.target.value);
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

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
