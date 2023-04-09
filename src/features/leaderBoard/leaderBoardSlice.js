import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  users: [],
};

const LeaderboardSlice = createSlice({
  name: "leaderBoard",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = [...action.payload];
    },
    modifyUser: (state, action) => {
      const newUsers = state.users.map((user) => {
        if (user?.id === action.payload.id) {
          return {
            ...user,
            quizMarks: action.payload.quizMarks,
            assignmentMarks: action.payload.assignmentMarks,
            totalMarks: action.payload.totalMarks,
          };
        } else {
          return user;
        }
      });
      state.users = newUsers;
    },
    getPosition: (state, action) => {
      const position = state.users
        .filter((f) => f.role !== "admin")
        .sort((a, b) => b.totalMarks - a.totalMarks)
        .map((user, idx) => {
          return {
            ...user,
            position: idx + 1,
          };
        });
      const newOne = [];
      const positionFinal = position?.map((up, idx) => {
        if (up.position === 1) {
          newOne.push(up);
          return up;
        } else {
          const prev = newOne[newOne.length - 1];
          if (prev.totalMarks === up.totalMarks) {
            newOne.push({
              ...up,
              position: newOne[newOne.length - 1].position
            })
            return {
              ...up,
              position: newOne[newOne.length - 1].position,
            };
          } else {
            newOne.push({
              ...up,
              position: newOne[newOne.length - 1].position + 1
            })
            return {
              ...up,
              position: newOne[newOne.length - 1].position,
            };
          }
        }
      });
      state.users = positionFinal;
    },
  },
});
export const { addUsers, modifyUser, getPosition } = LeaderboardSlice.actions;
export default LeaderboardSlice.reducer;
