import { apiSlice } from "../api/apiSlice";

export const quizMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzesMarks: builder.query({
      query: () => "/quizMark",
    }),
    getQuizMark: builder.query({
      query: (id) => `/quizMark/${id}`,
    }),
    getStudentQuizMark: builder.query({
      query: (id) => `/quizMark?student_id_like/${id}`,
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update quiz pessimistically start
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizzesMarks",
              undefined,
              (draft) => {
                draft.push(quiz.data);
              }
            )
          );
          //   update assignment pessimistically end
        } catch (error) {}
      },
    }),
  }),
});
export const {
  useGetQuizzesMarksQuery,
  useGetStudentQuizMarkQuery,
  useAddQuizMarkMutation,
} = quizMarksApi;
