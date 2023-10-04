import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios"; // Import Axios and AxiosResponse
import Articles from "./index";

jest.mock("axios");

const mockArticles = [
  {
    id: "1",
    title: "Sample Article 1",
    authors: ["Author 1", "Author 2"],
    journname: "Journal 1",
    pubyear: 2022,
    volume: 1,
    num: 1,
    pages: "1-10",
    doi: "doi-1",
  },
  // Add more mock articles as needed
];

describe("Articles component", () => {
  it("renders the Articles component with a table", async () => {
    // Update the Axios mock to return a Promise with AxiosResponse
    (axios.get as jest.Mock).mockResolvedValue(({ data: mockArticles } as AxiosResponse));
    
    render(<Articles />);
    
    // Wait for the data to be fetched and the component to re-render
    await waitFor(() => {
      expect(screen.getByText("Articles Index Page")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Authors")).toBeInTheDocument();
      expect(screen.getByText("Journal Name")).toBeInTheDocument();
      expect(screen.getByText("Publication Year")).toBeInTheDocument();
      expect(screen.getByText("Volume")).toBeInTheDocument();
      expect(screen.getByText("Number")).toBeInTheDocument();
      expect(screen.getByText("Pages")).toBeInTheDocument();
      expect(screen.getByText("DOI")).toBeInTheDocument();
      
      // Verify that the mock data is displayed in the table
      expect(screen.getByText("Sample Article 1")).toBeInTheDocument();
      // Add more expectations for other articles if needed
    });
  });

  it("handles error when fetching articles", async () => {
    // Update the Axios mock to reject with an error
    (axios.get as jest.Mock).mockResolvedValue((new Error("Fetch error")));

    render(<Articles />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching articles:")).toBeInTheDocument();
    });
  });
});