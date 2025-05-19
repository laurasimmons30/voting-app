/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom'; // UNCOMMENT TO RUN TEST - See README ## Testing
import WriteInVote from './WriteInVote';

describe('WriteInVote', () => {
  it('renders initially with empty input', () => {
    render(<WriteInVote placeholder='Enter name...' showWriteIn={true}/>);

    const input = screen.getByPlaceholderText('Enter name...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
  });

  it('updates onChange event with input', () => {
    render(<WriteInVote placeholder='Enter name...' showWriteIn={true} />);
    const input = screen.getByPlaceholderText('Enter name...')
    const value = 'Beyonce'
    fireEvent.change(input, {
        target: {
            value
        }
    })
    expect(input).toHaveValue('Beyonce')
    });

  it('hits the submitNewCandidate function', () => {
    const handleClick = jest.fn();

    render(<WriteInVote
      submitNewCandidate={handleClick}
      placeholder='Enter name...'
      showWriteIn={true}
    />);

    const input = screen.getByPlaceholderText('Enter name...')
    const value = 'Beyonce'
    fireEvent.change(input, {
        target: {
            value
        }
    })
    const voteButton = screen.getByText("Vote");
    fireEvent.click(voteButton);

    expect(handleClick).toHaveBeenCalledWith(value);
  });
});