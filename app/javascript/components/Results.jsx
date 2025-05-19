import React, { useState } from "react";

const Results = ({results}) => {
  const resultTotals = results.map(([name, val]) => {
    return (
      <li key={`result-${name}`}>
        <span className="name">{name}</span>
        <span className="count">{val}</span>
      </li>
    )
  });

  return(
    <>
      <h1>Results</h1>
      <ul>{resultTotals}</ul>
    </>
  );
}

export default Results;