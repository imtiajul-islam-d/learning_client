import React from "react";
import QuizOption from "./QuizOption";
import { useState } from "react";

const Quiz = ({ quiz, idx: serial, score: sc }) => {
  const [opt, setOpt] = useState([]);
  const { question, options } = quiz || {};

  return (
    <>
      <div className="quiz">
        <h4 className="question">
          Quiz {serial + 1} - {question}
        </h4>
        <form className="quizOptions">
          {/* <!-- Option 1 --> */}
          {options?.length > 0 &&
            options?.map((qo, sq) => (
              <QuizOption
                qo={qo}
                opt={opt}
                quiz={quiz}
                score={sc}
                setOpt={setOpt}
              />
            ))}
        </form>
      </div>
    </>
  );
};

export default Quiz;
