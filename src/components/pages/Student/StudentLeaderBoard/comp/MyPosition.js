import React from "react";
import { useSelector } from "react-redux";

const MyPosition = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.leaderBoard);
  const thisUser = users?.find((u) => u._id === user?._id);
  // console.log(thisUser);
  const { name, assignmentMarks, quizMarks, totalMarks, position } =
    thisUser || {};

  return (
    <>
      <tr className="border-2 border-cyan">
        <td className="table-td text-center font-bold">{position}</td>
        <td className="table-td text-center font-bold">{name}</td>
        <td className="table-td text-center font-bold">{quizMarks}</td>
        <td className="table-td text-center font-bold">{assignmentMarks}</td>
        <td className="table-td text-center font-bold">{totalMarks}</td>
      </tr>
    </>
  );
};

export default MyPosition;
