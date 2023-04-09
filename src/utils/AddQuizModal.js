import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAddQuizMutation } from "../features/quiz/quizApi";
import { useGetVideosQuery } from "../features/videos/videosApi";
import Error from "./Error";

export default function AddQuizModal({ open, control }) {
  const [
    addQuiz,
    { isLoading, isSuccess, isError: isAddingError, error: addingError },
  ] = useAddQuizMutation();

  const { data: videos } = useGetVideosQuery();

  const [error, setError] = useState("");
  const [option, setOption] = useState({
    id: undefined,
    option: "",
    isCorrect: false,
  });
  const [form, setForm] = useState({
    question: "",
    options: [],
    video_id: "",
    video_title: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // check if correct answer selected;
    let permitted = false;
    form?.options?.map((op) => {
      if (op.isCorrect === true) {
        permitted = true;
      }
    });
    if (permitted) {
      addQuiz(form);
    } else {
      toast.error("Please select a correct option!!");
    }
  };
  // close modal if quiz added
  useEffect(() => {
    if (isSuccess) {
      setForm({
        question: "",
        options: [],
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
            setForm({
              question: "",
              options: [],
              video_id: "",
              video_title: "",
            });
            control();
          }}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Quiz
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">
                  To
                </label>
                <input
                  id="question"
                  name="question"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Question"
                  value={form?.question}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      question: e.target.value,
                    })
                  }
                />
              </div>
              {form?.options?.length > 0 && (
                <div className="grid grid-cols-2 my-2">
                  {form?.options?.map((o) => (
                    <div className="my-1 flex items-center">
                      <input
                        onChange={() => {
                          const val = o;
                          let confirm;
                          if (val.isCorrect === false) {
                            confirm = window.confirm(
                              "Do you want to set this option as correct answer?"
                            );
                          } else {
                            confirm = window.confirm(
                              "Do you want to remove this option from correct answer list?"
                            );
                          }

                          //
                          const opts = form?.options?.map((opt) => {
                            if (opt?.option === val?.option) {
                              if (opt.isCorrect === false) {
                                toast(`${opt.option} added as correct option`);
                                return (opt = {
                                  ...val,
                                  isCorrect: true,
                                });
                              } else {
                                toast(
                                  `${opt.option} removed from correct option list`
                                );
                                return (opt = {
                                  ...val,
                                  isCorrect: false,
                                });
                              }
                            } else {
                              return opt;
                            }
                          });
                          if (confirm) {
                            setForm({
                              ...form,
                              options: opts,
                            });
                          }
                        }}
                        checked={o?.isCorrect}
                        type="checkbox"
                        name="option"
                        id="option"
                      />
                      <label className="text-black ml-2" htmlFor="option">
                        {o?.option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <input
                  id="option"
                  name="option"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Enter option"
                  value={option.option}
                  onChange={(e) =>
                    setOption({
                      ...option,
                      id: new Date().getTime(),
                      option: e.target.value,
                    })
                  }
                />
                {/* add option */}
                <button
                  onClick={() => {
                    if (option?.option !== "") {
                      form?.options?.push(option);
                      setOption({
                        id: undefined,
                        option: "",
                        isCorrect: false,
                      });
                      toast(`${option?.option} option added!`);
                    } else {
                      toast.error("Please add a valid option");
                    }
                  }}
                  className="bg-red-500 px-2 py-1 mb-2"
                >
                  Add option
                </button>
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
                Add Quiz
              </button>
            </div>
            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </>
    )
  );
}
