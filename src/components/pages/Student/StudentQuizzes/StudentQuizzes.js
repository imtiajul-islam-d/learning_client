import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuizzesQuery } from "../../../../features/quiz/quizApi";
import Loader from "../../../../utils/Loader";
import Error from "../../../../utils/Error";
import Quiz from "./Quiz";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clear } from "../../../../features/quiz/quizSlice";
import { useAddQuizMarkMutation } from "../../../../features/quizMarks/quizMarksApi";
import { toast } from "react-hot-toast";

const StudentQuizzes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [correctAns, setCorrectAns] = useState(0);
  const { score } = useSelector((state) => state.quizSelected);
  const [
    addQuizMark,
    { isLoading: quizSubmitLoading, isSuccess: addQuizSuccess },
  ] = useAddQuizMarkMutation();
  useEffect(() => {
    if (addQuizSuccess) {
      dispatch(clear());
      toast.success("Submission Successful!!");
      navigate("/leaderBoard");
    }
  }, [addQuizSuccess]);

  useEffect(() => {
    const number = score.map((n) => {
      const corr = n.options.filter(
        (f) =>
          (f.isCorrect === true && f.checked !== true) ||
          (f.isCorrect === false && f.checked === true)
      );
      if (corr.length > 0) {
        return 0;
      } else {
        return 1;
      }
    });
    const res = number.reduce((prev, next) => prev + next, 0);
    setCorrectAns(res);
  }, [score]);

  // console.log(correctAns);
  const { id: videoId } = useParams();
  useEffect(() => {
    dispatch(clear());
  }, [videoId]);
  const {
    data: quizzes,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetQuizzesQuery();
  const videoQuizzes = quizzes?.filter((q) => q?.video_id == videoId);
  let obj = {};
  if (!isLoading) {
    obj = videoQuizzes[0];
  }
  const { video_id, video_title } = obj;
  const [form, setForm] = useState({
    student_name: user.name,
    student_id: user.id,
    video_id,
    video_title,
    totalQuiz: videoQuizzes?.length,
    totalMark: videoQuizzes?.length * 5,
    totalCorrect: correctAns,
    totalWrong: videoQuizzes?.length - correctAns,
    mark: correctAns * 5,
  });
  useEffect(() => {
    setForm({
      ...form,
      student_name: user.name,
      student_id: user._id,
      video_id,
      video_title,
      totalQuiz: videoQuizzes?.length,
      totalMark: videoQuizzes?.length * 5,
      totalCorrect: correctAns,
      totalWrong: videoQuizzes?.length - correctAns,
      mark: correctAns * 5,
    });
  }, [isSuccess, correctAns]);
  let content = null;
  if (isLoading) {
    content = <Loader />;
    return;
  }
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && videoQuizzes?.length === 0)
    content = <Error message={"No quizzes found!"} />;
  if (!isLoading && !isError && videoQuizzes?.length > 0) {
    content = videoQuizzes?.map((q, idx) => (
      <Quiz key={q?.id} quiz={q} idx={idx} />
    ));
  }

  // console.log(form);
  // console.log("object");
  const handleSubmit = () => {
    const confirm = window.confirm("Do you want to submit the quiz?");
    if (confirm) {
      addQuizMark(form);
    }
    // console.log("object");
  };
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for "{videoQuizzes?.[0]?.video_title}"
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">{content}</div>
          <button
            disabled={quizSubmitLoading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default StudentQuizzes;
