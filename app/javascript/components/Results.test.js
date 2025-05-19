/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'; // UNCOMMENT TO RUN TEST - See README ## Testing
import Results from './Results';

describe('Results', () => {
  it('renders correctly having candidates and votes', () => {
    const results = [["Sabrina Carpenter",1]]

    render(<Results results={results}/>)

    expect(screen.getByText('Sabrina Carpenter')).toBeInTheDocument();
  });
});