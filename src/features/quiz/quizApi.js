import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update quiz pessimistically start
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(quiz.data);
            })
          );
          //   update assignment pessimistically end
        } catch (error) {}
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update quiz pessimistically start
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const quizUpdate = draft.find((v) => v._id == arg.id);
              quizUpdate.question = quiz.data.question;
              quizUpdate.video_id = quiz.data.video_id;
              quizUpdate.video_title = quiz.data.video_title;
              quizUpdate.options = quiz.data.options;
            })
          );
          //   update message pessimistically end
        } catch (error) {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update start
        const deleteQuiz = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            // (JSON.stringify(draft));
            return draft.filter((t) => t._id != arg.toString());
          })
        );
        // optimistic update end
        try {
          const quiz = await queryFulfilled;
        } catch (error) {
          deleteQuiz.undo();
        }
      },
    }),
  }),
});
export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
