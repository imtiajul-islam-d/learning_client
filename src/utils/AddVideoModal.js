import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddVideoMutation } from "../features/videos/videosApi";
import Error from "./Error";

export default function AddVideoModal({ open, control }) {
  const [
    addVideo,
    { isLoading, isSuccess, isError: isAddingError, error: addingError },
  ] = useAddVideoMutation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    url: "",
    views: "",
    duration: "",
    description: "",
    createdAt: new Date(),
  });
  // createdAt
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    addVideo(form);
  };
  // close modal if video added
  useEffect(() => {
    if (isSuccess) {
      setForm({
        title: "",
        url: "",
        views: "",
        duration: "",
        description: "",
        createdAt: new Date(),
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
              url: "",
              views: "",
              duration: "",
              description: "",
              createdAt: new Date(),
            });
          }}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Video
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
                <label htmlFor="url" className="sr-only">
                  url
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="URL"
                  value={form?.url}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      url: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="views" className="sr-only">
                  views
                </label>
                <input
                  id="views"
                  name="views"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Views (51.2K)"
                  value={form?.views}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      views: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="duration" className="sr-only">
                  views
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Video duration (5:30)"
                  value={form?.duration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  value={form?.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add video
              </button>
            </div>
            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </>
    )
  );
}
