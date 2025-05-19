import React, { useState } from "react";

const CandidateList = (props) => {
  const [currentVote, setCurrentVote] = useState(null);
  const { candidates, voteForCandidate } = props;

  const iterateOverCandidates = (candidates) => {
    return candidates.map((candidate) => {
      return(
        <div className="candidate" key={`candidate-${candidate.id}`}>
          <input
            type="radio"
            name="candidate"
            id={`candidate-${candidate.id}`}
            value={candidate.id}
            onChange={ () => { setCurrentVote(candidate.id) }}
          />
          <label htmlFor={`candidate-${candidate.id}`}>
            {candidate.name}
          </label>
        </div>
      )
    });
  }

  const handleVote = (e) => {
    e.preventDefault();
    voteForCandidate(currentVote);
    setCurrentVote(null);
  }

  if (candidates.length === 0) { return(<></>); }

  if (candidates.length > 0) {
    return(
      <>         
        <div className="candidate-list">
          {iterateOverCandidates(candidates)}
        </div>
        <button type="submit" className="btn vote-btn" onClick={handleVote}>
          Vote
        </button>
      </>
    )
  }
}

export default CandidateList;