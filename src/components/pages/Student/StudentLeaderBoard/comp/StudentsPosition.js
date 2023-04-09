import React from "react";
import { useSelector } from "react-redux";

const StudentsPosition = ({ user }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.leaderBoard);
  const thisUser = users?.find((u) => u.id === user?.id);
  // console.log(thisUser);
  const { name, assignmentMarks, quizMarks, totalMarks, position } =
    thisUser || {};
  return (
    <>
      <tr
        className={`border-b ${
          loggedInUser?.id === thisUser?.id
            ? "border-2 border-cyan"
            : "border-slate-600/50"
        }`}
      >
        <td className="table-td text-center">{position}</td>
        <td className="table-td text-center">{name}</td>
        <td className="table-td text-center">{quizMarks}</td>
        <td className="table-td text-center">{assignmentMarks}</td>
        <td className="table-td text-center">{totalMarks}</td>
      </tr>
    </>
  );
};

export default StudentsPosition;
