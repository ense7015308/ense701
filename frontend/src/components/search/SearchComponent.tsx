// components/SearchComponent.tsx
import React, { useState } from "react";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter your search keywords"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
