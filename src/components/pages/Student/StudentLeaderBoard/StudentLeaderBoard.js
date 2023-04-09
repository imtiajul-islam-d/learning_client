import React, { useEffect} from "react";
import StudentNav from "../StudentNav/StudentNav";
import MyPosition from "./comp/MyPosition";
import { useGetUsersQuery } from "../../../../features/auth/authApi";
import { useDispatch} from "react-redux";
import {
  addUsers,
  getPosition,
  modifyUser,
} from "../../../../features/leaderBoard/leaderBoardSlice";
import { useGetAssignmentsMarkQuery } from "../../../../features/assignmentMarks/assignmentMarksApi";
import { useGetQuizzesMarksQuery } from "../../../../features/quizMarks/quizMarksApi";
import Loader from "../../../../utils/Loader";
import TBody from "./comp/TBody";

const StudentLeaderBoard = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  // new
  useEffect(() => {
    if (isSuccess) {
      dispatch(addUsers(data));
    }
  }, [isSuccess]);
  // take information to display
  const { data: assignmentMarks, isLoading: assignmentL } =
    useGetAssignmentsMarkQuery();
  const { data: quizMarks, isLoading: quizL } = useGetQuizzesMarksQuery();

  if (assignmentL || quizL) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // calculate marks
  const usersInfo = data?.map((user) => {
    // calculate total assignment marks
    const a = assignmentMarks.slice();
    let totalAssignmentMarks = a
      ?.filter((aa) => aa?.student_id === user?.id)
      ?.reduce((current, next) => current + next?.mark, 0);
    // calculate total quiz marks
    const q = quizMarks?.slice();

    const qResult = q
      ?.filter((qu) => qu?.student_id === user?.id)
      ?.reduce((current, next) => {
        // console.log(quizMarks);
        return current + next?.mark;
      }, 0);
    // calculate total marks
    const totalMarks = totalAssignmentMarks + qResult;
    //   console.log(quizMarks?.student_id, name, id);
    dispatch(
      modifyUser({
        id: user?.id,
        quizMarks: qResult,
        assignmentMarks: totalAssignmentMarks,
        totalMarks,
      })
    );
    dispatch(getPosition())
  });

  return (
    <>
      <StudentNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <MyPosition />
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>
              <TBody />
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentLeaderBoard;
