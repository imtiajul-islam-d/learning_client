import { apiSlice } from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: () => "/assignmentMark",
    }),
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark?student_id_like=${id}`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update assignment pessimistically start
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentsMark",
              undefined,
              (draft) => {
                draft.push(assignment);
              }
            )
          );
          //   update assignment pessimistically end
        } catch (error) {}
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update assignment pessimistically start
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignmentsMark",
              undefined,
              (draft) => {
                const assignmentUpdate = draft.find((v) => v._id == arg.id);
                assignmentUpdate.assignment_id = assignment.data.assignment_id;
                assignmentUpdate.createdAt = assignment.data.createdAt;
                assignmentUpdate.mark = assignment.data.mark;
                assignmentUpdate.repo_link = assignment.data.repo_link;
                assignmentUpdate.status = assignment.data.status;
                assignmentUpdate.student_id = assignment.data.student_id;
                assignmentUpdate.student_name = assignment.data.student_name;
                assignmentUpdate.title = assignment.data.title;
                assignmentUpdate.totalMark = assignment.data.totalMark;
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
  useGetAssignmentsMarkQuery,
  useGetAssignmentMarkQuery,
  useAddAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
} = assignmentMarkApi;
