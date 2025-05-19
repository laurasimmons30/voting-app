/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom'; // UNCOMMENT TO RUN TEST - See README ## Testing
import CandidateList from './CandidateList';

describe('CandidateList', () => {
  it('renders correctly having candidates', () => {

    render(<CandidateList 
      candidates={[
        { id: 1, name: "Chappell Roan"},
        { id: 2, name: "Sabrina Carpenter"}
      ]}
      voteForCandidate={() => {}}
    />);
    expect(screen.getByText('Chappell Roan')).toBeInTheDocument();
  });

  it("does not render list when there are no candidates", () => {
    render(<CandidateList
      candidates={{}}
      voteForCandidate={() => {}}
    />);

    const list = screen.queryByText('candidate-list')
    expect(list).toBeNull()
  });

  it('hits the voteForCandidate function', () => {
    const handleClick = jest.fn();

    render(<CandidateList 
      candidates={[
        { id: 1, name: "Chappell Roan"},
        { id: 2, name: "Sabrina Carpenter"}
      ]}
      voteForCandidate={handleClick}
    />);

    const button = screen.getByText("Sabrina Carpenter");
    fireEvent.click(button);
    const voteButton = screen.getByText("Vote");
    fireEvent.click(voteButton);

    expect(handleClick).toHaveBeenCalledWith(2);
  });
});