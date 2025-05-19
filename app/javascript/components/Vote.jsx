import React, { useState, useEffect } from "react";
import CandidateList from "./CandidateList";
import WriteInVote from "./WriteInVote";

const Vote = ({candidatesData, userData, maxCandidateLimit}) => {
  const userId = userData.id;
  const [candidates, setCandidates] = useState(candidatesData);
  const [voted, setVoted] = useState(userData.hasVoted);
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  const goToResults = () => {
    window.location.href = "/results";
  };

  const submitNewCandidate = async (newCandidateName) => {
    try {
      const response = await fetch("/candidates", {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"        
        },
        body: JSON.stringify({name: newCandidateName})
      });

      const json = await response.json();
      setCandidates(json['data']);
      setVoted(true);

      goToResults();
    } catch (error) {
      console.error(error);
    }
  }

  const voteForCandidate = async (voteId) => {
    try {
      const response = await fetch(window.location.pathname, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"        
          },
          body: JSON.stringify({vote_id: voteId})
        });

        const json = await response.json();
        setVoted(true);
        goToResults();
    } catch (error) {
      console.error(error)
    }
  }

  if (voted) {
    goToResults();
  }

  return(
    <>
      <h1>Cast your vote today!</h1>
      <CandidateList
        candidates={candidates}
        voteForCandidate={voteForCandidate}
      />
      <WriteInVote
        showWriteIn={candidates.length < maxCandidateLimit}
        submitNewCandidate={submitNewCandidate}
      />
    </>
  )
};

export default Vote;