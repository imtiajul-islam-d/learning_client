import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddAssignmentMarkMutation } from "../../../../../features/assignmentMarks/assignmentMarksApi";
import Error from "../../../../../utils/Error";
import { toast } from "react-hot-toast";

export default function AssignmentMarkModal({
  open,
  control,
  assignment,
  // refetch,
  markRefetch,
}) {
  const { user } = useSelector((state) => state.auth);
  const [
    addAssignmentMark,
    { isLoading, isError, error: addingError, isSuccess },
  ] = useAddAssignmentMarkMutation();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    student_id: user?._id,
    student_name: user?.name,
    assignment_id: assignment?._id,
    title: assignment?.title,
    createdAt: new Date(),
    totalMark: assignment?.totalMark,
    mark: 0,
    repo_link: "",
    status: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    addAssignmentMark(form);
  };

  //   // close modal if video added
  useEffect(() => {
    if (isSuccess) {
      toast.success("Assignment submitted successfully!!");
      // refetch();
      markRefetch();
      control();
    }
  }, [isSuccess]);
  // set error
  useEffect(() => {
    if (isError) {
      setError(addingError?.error);
    }
  }, [isError, addingError]);
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-screen inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {assignment?.title}
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
                  placeholder="Repository link"
                  value={form?.repo_link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      repo_link: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Submit Assignment
              </button>
            </div>
            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </>
    )
  );
}
