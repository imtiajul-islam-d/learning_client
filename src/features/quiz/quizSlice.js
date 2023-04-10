import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: [],
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    checked: (state, action) => {
      // console.log(action.payload);
      const quizAvailable = state.score.find(
        (sc) => sc._id === action.payload.quiz._id
      );
      if (quizAvailable) {
        // console.log(action.payload);
        const newScore = state.score.map((sc) => {
          const options = sc.options.map(
            (c) => {
              if (c.checked && c.id == action.payload.option.id) {
                // console.log("object");
                return {
                  ...c,
                  checked: false,
                };
              } else if (!c.checked && c.id == action.payload.option.id) {
                return {
                  ...c,
                  checked: true,
                };
              } else {
                return c;
              }
            }
            // c.checked && c.id == action.payload.option.id
          );
          // console.log(options);
          return {
            ...sc,
            options,
          };
          //   console.log(JSON.stringify(options));
          //   console.log(checked);
        });
        state.score = newScore;
      } else {
        const opt = action.payload.quiz.options.map((q) => {
          if (q.id === action.payload.option.id) {
            return {
              ...q,
              checked: true,
            };
          } else {
            return {
              ...q,
              checked: false,
            };
          }
        });
        const quiz = {
          ...action.payload.quiz,
          options: opt,
        };
        state.score.push(quiz);
      }
    },
    clear: (state, action) => {
      state.score = [];
    },
  },
});

export const { checked, clear } = quizSlice.actions;
export default quizSlice.reducer;
