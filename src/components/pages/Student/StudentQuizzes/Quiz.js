import React from "react";
import QuizOption from "./QuizOption";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Quiz = ({ quiz, idx: serial, score: sc }) => {
  const [opt, setOpt] = useState([]);
  const { question, options } = quiz || {};
  // // new
  // const [correctAns, setCorrectAns] = useState(0);
  // const { score } = useSelector((state) => state.quizSelected);

  // let lim = quiz.options.reduce((current, next) => {
  //   if (next.isCorrect === true) {
  //     return current + 1;
  //   } else {
  //     return current;
  //   }
  // }, 0);
  // const ans = score?.map((sc) => {
  //   // let r = true;
  //   const ca = sc.selected.map((cs) => {
  //     if (cs.isCorrect === true) {
  //       lim -= 1;
  //       // r = false;
  //     }
  //   });
  // });
  // console.log(lim);

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
