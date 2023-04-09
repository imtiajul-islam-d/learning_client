import React, { useState } from "react";
import { useGetAssignmentsQuery } from "../../../../features/assignment/assignmentApi";
import AddAssignmentModal from "../../../../utils/AddAssignmentModal";
import Error from "../../../../utils/Error";
import Loader from "../../../../utils/Loader";
import AdminNav from "../Nav/AdminNav";
import SingleAssignment from "./SingleAssignment";

const AdminAssignment = () => {
  // modal elements start
  const [opened, setOpened] = useState(false);
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  // modal elements end

  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();
  let content = null;
  if (isLoading) content = <Loader />;
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && assignments?.length === 0)
    content = <Error message={"No assignment found!"} />;
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments?.map((assignment) => (
      <SingleAssignment key={assignment?._id} assignment={assignment} />
    ));
  }

  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={controlModal} className="btn ml-auto">Add Assignment</button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddAssignmentModal open={opened} control={controlModal} />
      </section>
    </>
  );
};

export default AdminAssignment;
