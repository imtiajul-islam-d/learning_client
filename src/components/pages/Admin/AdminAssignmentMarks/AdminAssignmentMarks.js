import React from "react";
import { useGetAssignmentsMarkQuery } from "../../../../features/assignmentMarks/assignmentMarksApi";
import AdminNav from "../Nav/AdminNav";
import Loader from "./../../../../utils/Loader";
import Error from "./../../../../utils/Error";
import SingleAdminAssignmentMarks from "./SingleAdminAssignment";

const AdminAssignmentMarks = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsMarkQuery();

  const totalAssignment = assignmentMarks?.length;
  const totalPendingMarks = assignmentMarks?.reduce((total, next) => {
    if (next?.status !== "published") {
      return total + 1;
    } else {
      return total;
    }
  }, 0);
  const totalPublishedMarks = assignmentMarks?.reduce((total, next) => {
    if (next?.status === "published") {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  let content = null;
  if (isLoading) content = <Loader />;
  if (!isLoading && isError) content = <Error message={error?.error} />;
  if (!isLoading && !isError && assignmentMarks?.length === 0)
    content = <Error message={"No assignment found!"} />;
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks?.map((assignment) => (
      <SingleAdminAssignmentMarks
        key={assignment?.id}
        assignment={assignment}
      />
    ));
  }
  return (
    <>
      <AdminNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{totalAssignment}</span>
              </li>
              <li>
                Pending <span>{totalPendingMarks}</span>
              </li>
              <li>
                Mark Sent <span>{totalPublishedMarks}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAssignmentMarks;
