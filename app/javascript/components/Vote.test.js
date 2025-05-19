/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
// import '@testing-library/jest-dom'; // UNCOMMENT TO RUN TEST - See README ## Testing

import Vote from './Vote';

describe('Vote', () => {
  describe("fetch responses", () => {
    beforeEach(() => {
      global.fetch = jest.fn();
      let assignMock = jest.fn();
      delete window.location;
      window.location = { assign: assignMock };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("posts new write in candidate", async () => {
      const mockData = {data: [{id: 1, name: "Sabrina Carpenter"}, {id: 2, name: "Beyonce"}]};
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData),
        ok: true,
      });

      render(<Vote
        candidatesData={[{id: 1, name: "Sabrina Carpenter"}]}
        userData={{hasVoted: false}}
        maxCandidateLimit={10}
      />);

      const input = screen.getByPlaceholderText('Enter name...')
      const value = 'Beyonce'
      fireEvent.change(input, {
          target: {
              value
          }
      })
      const voteButton = screen.getAllByText("Vote");

      await act(() => {
        /* fire events that update state */
        fireEvent.click(voteButton[1]);
      });

      const response = {"body": "{\"name\":\"Beyonce\"}", "headers": {"Content-Type": "application/json", "X-CSRF-Token": undefined}, "method": "POST"}

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith("/candidates", response);
    
      expect(screen.getByText('Beyonce')).toBeInTheDocument();
    });

    it("posts new vote from list", async () => {
      const candidates = [{id: 1, name: "Sabrina Carpenter"}, {id: 2, name: "Beyonce"}]
      const mockData = {data: candidates};
      global.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockData),
        ok: true,
      });

      const mockPath = "/test"
      window.location.pathname = mockPath

      render(<Vote
        candidatesData={candidates}
        userData={{hasVoted: false}}
        maxCandidateLimit={10}
      />);

      await act(() => {
        const button = screen.getByText("Sabrina Carpenter");
        fireEvent.click(button);
        const voteButton = screen.getAllByText("Vote");
        fireEvent.click(voteButton[0]);
      });

      const response = {"body": "{\"vote_id\":1}", "headers": {"Content-Type": "application/json", "X-CSRF-Token": undefined}, "method": "POST"}

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(mockPath, response);
    });
  });

  describe('user has voted', () => {
    it("redirects to results", () => {
      render(<Vote
        candidatesData={[{id: 1, name: "Sabrina Carpenter"}]}
        userData={{hasVoted: true}}
        maxCandidateLimit={10}
      />);

      expect(window.location.href).toBe("/results")
    });
  });

  describe("max amount of candidates", () => {
    it("does not render write in votes", () => {
      const candidates = [
        {id: 1, name: "1"},
        {id: 2, name: "2"},
        {id: 3, name: "3"},
        {id: 4, name: "4"},
        {id: 5, name: "5"},
        {id: 6, name: "6"},
        {id: 7, name: "7"},
        {id: 8, name: "8"},
        {id: 9, name: "9"},
        {id: 10, name: "10"}
      ]
      
      render(<Vote
        candidatesData={candidates}
        userData={{hasVoted: false}}
        maxCandidateLimit={10}
      />);

      const input = screen.queryByPlaceholderText('Enter name...')
      expect(input).toBeNull()
    })
  })
});