import React from "react";
import StudentsPosition from "./StudentsPosition";
import { useSelector } from "react-redux";

const TBody = () => {
  const { users } = useSelector((state) => state.leaderBoard);
  const usersRender = users.slice() || [];
  const sortedUsers = usersRender?.filter(u => u?.position < 21)?.sort(
    (a, b) => b?.totalMarks - a?.totalMarks
  );

//   console.log(sortedUsers);
  return (
    <>
      <tbody>
        {sortedUsers
          ?.filter((user) => user?.role !== "admin")
          ?.map((user) => (
            <StudentsPosition
              user={user}
              key={user?._id}
            />
          ))}
      </tbody>
    </>
  );
};

export default TBody;
