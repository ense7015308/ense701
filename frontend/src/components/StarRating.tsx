/*
  name:   StarRating.tsx
  desc:   Component for rating articles
*/
import React, { useState } from "react";
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'
import config from '../config';


export function MyComponent() {
  const [rating, setRating] = useState(0);

  // Handle Rating value
  const handleRating = (rating:number) => {
    setRating(rating);
  };

  // Send the rating to the backend
  const saveRating = async () => {
    try {
      // Send a POST request with the rating to the server
      const response = await axios.get(`${config.apiUrl}/api/articles`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors here 
    }
  };
  return (
    <div className="App">
      <Rating
        onClick={handleRating}
       
      />
      <button onClick={saveRating}>Save Rating</button>
    </div>
  );
}