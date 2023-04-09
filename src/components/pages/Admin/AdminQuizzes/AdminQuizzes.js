import React, { useState } from "react";
import { useGetQuizzesQuery } from "../../../../features/quiz/quizApi";
import AddQuizModal from "../../../../utils/AddQuizModal";
import AdminNav from "../Nav/AdminNav";
import SingleQuiz from "./SingleQuiz";
import Loader from "../../../../utils/Loader";
import Error from "../../../../utils/Error";

const AdminQuizzes = () => {
  // modal elements start
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  // modal elements end

  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  let content = null;
  if (isLoading) content = <Loader />;
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && quizzes?.length === 0)
    content = <Error message={"No Quizzes found!"} />;
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((quiz) => <SingleQuiz key={quiz?.id} quiz={quiz} />);
  }

  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={controlModal} className="btn ml-auto">
                Add Quiz
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddQuizModal open={opened} control={controlModal} />
      </section>
    </>
  );
};

export default AdminQuizzes;
