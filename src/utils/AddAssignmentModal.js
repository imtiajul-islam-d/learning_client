import { useEffect, useState } from "react";
import { useAddAssignmentMutation } from "../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../features/videos/videosApi";
import Error from "./Error";

export default function AddAssignmentModal({ open, control }) {
  const [
    addAssignment,
    { isLoading, isSuccess, isError: isAddingError, error: addingError },
  ] = useAddAssignmentMutation();

  const { data: videos } = useGetVideosQuery();

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    totalMark: undefined,
    video_id: "",
    video_title: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    addAssignment(form);
  };
  // close modal if video added
  useEffect(() => {
    if (isSuccess) {
      setForm({
        title: "",
        totalMark: undefined,
        video_id: "",
        video_title: "",
      });
      control();
    }
  }, [isSuccess]);
  // set error
  useEffect(() => {
    if (isAddingError) {
      setError(addingError?.error);
    }
  }, [isAddingError, addingError]);
  return (
    open && (
      <>
        <div
          onClick={() => {
            control();
            setForm({
              title: "",
              totalMark: 0,
              video_id: "",
              video_title: "",
            });
          }}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Assignment
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">
                  To
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                  value={form?.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="totalMark" className="sr-only">
                  url
                </label>
                <input
                  id="totalMark"
                  name="totalMark"
                  type="number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Total Marks"
                  value={form?.totalMark}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalMark: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="videos" className="sr-only">
                  Select Video
                </label>
                <select
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  name="video"
                  id="video"
                  required
                  onChange={(e) => {
                    const val = JSON.parse(e.target.value);
                    setForm({
                      ...form,
                      video_title: val?.title,
                      video_id: val?._id,
                    });
                  }}
                >
                  <option hidden selected value="">
                    Select a video
                  </option>
                  {videos?.map((video) => (
                    <option key={video?._id} value={JSON.stringify(video)}>
                      {video?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add Assignment
              </button>
            </div>
            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </>
    )
  );
}
