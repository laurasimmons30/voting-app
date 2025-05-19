import React, { useState } from "react";

const WriteInVote = (props) => {
  const [newCandidateName, setNewCandidateName ] = useState("");
  const { submitNewCandidate, showWriteIn } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewCandidate(newCandidateName);
    setNewCandidateName("");
  }
  if (!showWriteIn) { return(<></>); }

  return(
    <div className="vote-input">
      <p className="new-vote">Or add a new candidate:</p>
      <div className="vote-submission">
        <input
          type="text"
          placeholder="Enter name..."
          value={newCandidateName}
          onChange={ e => setNewCandidateName(e.target.value) }
          className="input-box"
        />
        <button type="submit" className="btn vote-btn new-submission" onClick={handleSubmit}>
          Vote
        </button>
        </div>
    </div>
  )
}

export default WriteInVote;