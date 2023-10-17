/*
  name:   new.tsx
  desc:   page for user to add new articles using a provided form
*/

// imports
import React, { useState } from "react";
import formStyles from "../../styles/Form.module.scss";
import axios from 'axios';
import config from "../../config";
import { useRouter } from "next/router";

// constant 
const NewDiscussion = () => {

  // initialise constants for form input
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [journname, setJournName] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const [pages, setPages] = useState("");
  const [doi, setDoi] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);

  // initialise router
  const router = useRouter();

  // initialise article to include form input fields
  const [article, setArticle] = useState({
    title: '', 
    authors: [''],
    journname: '',
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


  // arrow function that write input values to article and sends to mongoDB
  const submitNewArticle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    const articleData = {
      title,
      authors,
      journname: journname,
      pubyear: pubYear,
      volume: volume,
      num: num,
      pages,
      doi,
    };

    axios
    .post(`${config.apiUrl}/api/articles`, articleData)
    .then((response) => {
        setFeedback(response.data.msg);
        setFeedbackType('success'); 
        setTimeout(() => {
          router.push('/articles');
      }, 2000);
    })
    .catch((err) => {
        if (err.response && err.response.data.msg) {
            setFeedback(err.response.data.msg);
        } else {
            setFeedback('Article with the given title already exists. Please use a different title.');
            setFeedbackType('error');
        }
    })
    .finally(() => {
        setIsSubmitting(false);
    });
  
  };

  // helper methods for the authors array
  // increase number of authors
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  // remove an author
  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  // change select author
  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // return article page
  return (
    <div className="container">

      {/* heading */}
      <h1>New Article</h1>

      {feedback && (
  <p className={feedbackType === 'success' ? formStyles.successFeedback : feedbackType === 'error' ? formStyles.errorFeedback : formStyles.feedback}>
    {feedback}
  </p>
)}


      {/* form */}
      <form className={formStyles.form} onSubmit={submitNewArticle}>

        {/* article title and entry field */}
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

        {/* author title, entry field, and button to add and remove author */}
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

        {/* journal title and entry field */}
        <label htmlFor="journname">Journal Name:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="journname"
          id="journname"
          value={journname}
          onChange={(event) => {
            setJournName(event.target.value);
          }}
        />

        {/* publication year title and entry field */}
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

        {/* volume title and entry field */}
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

        {/* number title and entry field */}
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

        {/* pages title and entry field */}
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

        {/* doi title and entry field */}
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

        {/* button to submit form */}
        <button className={formStyles.formItem} type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
      </form>
    </div>
  );
};

// export
export default NewDiscussion;
