import { IoMdArrowDropdown } from "react-icons/io";
import React from "react";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  const handleSearch = (searchQuery: string | number) => {
    console.log("Search Query:", searchQuery);
    // Implement search functionality here
    // You can now use the searchQuery to filter your articles
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>

      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
