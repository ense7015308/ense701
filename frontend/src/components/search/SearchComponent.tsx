// Import required dependencies from React
import React, { useState } from "react";

// Define the props type for the SearchComponent. It expects a callback function named 'onSearch'.
interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

// Define the functional SearchComponent, which takes 'onSearch' prop
const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  // Create a local state to store and manage the searchTerm
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the search action
  const handleSearch = () => {
    // Call the 'onSearch' callback function passed as a prop and pass the current 'searchTerm' to it
    onSearch(searchTerm);
  };

  // Return the search input and button UI
  return (
    <div>
      {/* Input field to type the search term. The value of this input is bound to the 'searchTerm' state. */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the 'searchTerm' state when the input value changes
        placeholder="Enter your search keywords"
      />
      {/* Button to trigger the search action */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

// Export the SearchComponent for use in other parts of the application
export default SearchComponent;
