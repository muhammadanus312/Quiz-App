import React from 'react'
import style from "./Result.module.css"
const Reult = ({questions,finalResult}) => {
  return (
    <div className={`${style.resultBox}`}>
    <div>
      <span className="fw-bold">Total Questions: </span>
      <span>{questions.length}</span>
    </div>
    <div>
      <span className="fw-bold">Corrected: </span>
      <span>{finalResult.corrected}</span>
    </div>
    <div>
      <span className="fw-bold">Wrong: </span>
      <span>{questions.length - finalResult.corrected}</span>
    </div>
    <div>
      <span className="fw-bold">Score: </span>
      <span>{finalResult.score}</span>
    </div>
    <div>
      <span className="fw-bold">Percentage: </span>
      <span>
        {Number(
          (finalResult.score / finalResult.totalPoints) * 100
        ).toFixed(2)}{" "}
        %
      </span>
    </div>
  </div>
  )
}

export default Reult