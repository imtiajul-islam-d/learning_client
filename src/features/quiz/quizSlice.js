import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: [],
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // quizId:1,
    // optionSelected:[
    // {
    //  id: 1123,
    //  option: "emi"
    //  isCorrect: true
    // }
    // ]
    checked: (state, action) => {
      const quizAvailable = state.score.find(
        (sc) => sc.id === action.payload.quiz.id
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
      //   if (quizAvailable) {
      //     const optAvailable = quizAvailable.selected.find(
      //       (qa) => qa.id === action.payload.id
      //     );
      //     if (optAvailable) {
      //       const newOpt = state.score.map((op) => {
      //         if (op.quizId === action.payload.quizId) {
      //           const n = op.selected.filter((o) => o.id !== action.payload.id);
      //           return {
      //             quizId: action.payload.quizId,
      //             selected: [...n],
      //           };
      //         } else {
      //           return op;
      //         }
      //       });
      //       state.score = newOpt;
      //     } else {
      //       const newOpt = state.score.map((op) => {
      //         if (op.quizId === action.payload.quizId) {
      //           return {
      //             quizId: action.payload.quizId,
      //             selected: [...op.selected, action.payload],
      //           };
      //         } else {
      //           return op;
      //         }
      //       });
      //       state.score = newOpt;
      //     }
      //   } else {
      //     state.score.push({
      //       quizId: action.payload.quizId,
      //       selected: [
      //         {
      //           ...action.payload,
      //         },
      //       ],
      //     });
      //   }
    },
    clear: (state, action) => {
      state.score = [];
    },
  },
});

export const { checked, clear } = quizSlice.actions;
export default quizSlice.reducer;
