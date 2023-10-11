import React from 'react'; // For React components
import { render, waitFor } from '@testing-library/react'; // For rendering React components and waiting for asynchronous actions
import axios from 'axios'; // For mocking HTTP requests with Jest
import Index from './index'; 
import '@testing-library/jest-dom';


test('should fetch articles successfully', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Article 1',
        authors: ['Author 1'],
        journname: 'Journal 1',
        pubyear: 2021,
        volume: 2,
        num: 1,
        pages: '1-10',
        doi: 'doi1'
      },
      {
        id: '2',
        title: 'Article 2',
        authors: ['Author 2'],
        journname: 'Journal 2',
        pubyear: 2022,
        volume: 2,
        num: 3,
        pages: '11-20',
        doi: 'doi2'
      }
    ];
  
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockArticles });
  
    const { getByText } = render(<Index/>);
  
    await waitFor(() => {
      expect(getByText('Article 1')).toBeInTheDocument();
      expect(getByText('doi1')).toBeInTheDocument();
  
      expect(getByText('Article 2')).toBeInTheDocument();
      expect(getByText('doi2')).toBeInTheDocument();
    });
  });
