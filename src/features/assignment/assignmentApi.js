import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
    }),
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update assignment pessimistically start
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(assignment.data);
              }
            )
          );
          //   update assignment pessimistically end
        } catch (error) {}
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update videos pessimistically start
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
              const assignmentUpdate = draft.find((v) => v._id == arg.id);
              assignmentUpdate.title = assignment.data.title;
              assignmentUpdate.totalMark = assignment.data.totalMark;
              assignmentUpdate.video_id = assignment.data.video_id;
              assignmentUpdate.video_title = assignment.data.video_title;
            })
          );
          //   update message pessimistically end
        } catch (error) {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update start
        const deleteAssignment = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              // (JSON.stringify(draft));
              return draft.filter((t) => t._id != arg.toString());
            }
          )
        );
        // optimistic update end
        try {
          const assignment = await queryFulfilled;
        } catch (error) {
          deleteAssignment.undo();
        }
      },
    }),
  }),
});
export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
