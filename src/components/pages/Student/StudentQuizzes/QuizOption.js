import React from "react";
import { useDispatch } from "react-redux";
import { checked } from "../../../../features/quiz/quizSlice";

const QuizOption = ({ qo, opt, setOpt, quiz, score }) => {
  const dispatch = useDispatch();
  const { option, isCorrect, id } = qo || {};
  const handleOnChange = () => {
    dispatch(
      checked({
        quiz: quiz,
        option: qo,
      })
    );
  };
  return (
    <>
      <label>
        <input onChange={handleOnChange} type="checkbox" id={id} />
        {option}
      </label>
    </>
  );
};

export default QuizOption;
