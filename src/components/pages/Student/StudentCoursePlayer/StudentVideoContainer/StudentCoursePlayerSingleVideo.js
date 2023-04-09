import React, { useState } from "react";
import { useGetQuizzesQuery } from "../../../../../features/quiz/quizApi";
import { useGetAssignmentsQuery } from "../../../../../features/assignment/assignmentApi";
import { useSelector } from "react-redux";
import { useGetAssignmentsMarkQuery } from "../../../../../features/assignmentMarks/assignmentMarksApi";
import AssignmentMarkModal from "../SingleStudentVideoContainer/AssignmentMarkModal";
import { Link } from "react-router-dom";
import { useGetQuizzesMarksQuery } from "../../../../../features/quizMarks/quizMarksApi";

const StudentVideoContainerSingleVideo = ({ videos }) => {
  // modal elements start
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  // modal elements end
  // get user info
  const { user } = useSelector((state) => state.auth);
  const { title, createdAt, url, description, _id } = videos[0] || {};
  let d = new Date(createdAt);
  d = d.toString();
  // get quizzes
  const { data: quizzes, isLoading: quizLoading } = useGetQuizzesQuery();
  const {
    data: quizMark,
    isLoading: quizMarkLoading,
    refetch: quizMarkRefetch,
  } = useGetQuizzesMarksQuery();
  const thisVideoQuizzes = quizzes?.filter((quiz) => quiz?.video_id === _id);
  const thisVideoQuizzesMark = quizMark?.filter(
    (quiz) => quiz?.video_id === _id && quiz?.student_id === user?._id
  );

  // / get assignment mark history
  const { data: assignmentMark, refetch: markRefetch } =
    useGetAssignmentsMarkQuery();
  // get assignment
  const { data: assignments } = useGetAssignmentsQuery();
  const thisVideoAssignment = assignments?.filter((assignment) => {
    if (assignment?.video_id === _id) {
      const found = assignmentMark?.find((a) => {
        if (a?.student_id == user._id && assignment._id == a.assignment_id) {
          return true;
        } else {
          return false;
        }
      });
      if (found) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  });
  console.log(assignments);
  return (
    <>
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title={title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {d}
          </h2>

          <div className="flex gap-4">
            {thisVideoAssignment?.length > 0 && (
              <Link
                onClick={controlModal}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </Link>
            )}

            {thisVideoQuizzes?.length > 0 &&
              thisVideoQuizzesMark?.length === 0 && (
                <Link
                  to={`/quiz/${_id}`}
                  className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                >
                  কুইজে অংশগ্রহণ করুন
                </Link>
              )}
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
        {opened && (
          <AssignmentMarkModal
            markRefetch={markRefetch}
            open={opened}
            control={controlModal}
            assignment={thisVideoAssignment[0]}
          />
        )}
      </div>
    </>
  );
};

export default StudentVideoContainerSingleVideo;
