import { apiSlice } from "../api/apiSlice";

export const videoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update videos pessimistically start
        try {
          const video = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(video.data);
            })
          );
          //   update videos pessimistically end
        } catch (error) {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // update videos pessimistically start
        try {
          const video = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const videoUpdate = draft.find((v) => v._id == arg.id);
              videoUpdate.title = video.data.title;
              videoUpdate.url = video.data.url;
              videoUpdate.views = video.data.views;
              videoUpdate.description = video.data.description;
              videoUpdate.duration = video.data.duration;
            })
          );
          //   update message pessimistically end
        } catch (error) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update start
        const deleteVideo = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            // (JSON.stringify(draft));
            return draft.filter((t) => t._id != arg.toString());
          })
        );
        // optimistic update end
        try {
          const videoD = await queryFulfilled;
        } catch (error) {
          deleteVideo.undo();
        }
      },
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
