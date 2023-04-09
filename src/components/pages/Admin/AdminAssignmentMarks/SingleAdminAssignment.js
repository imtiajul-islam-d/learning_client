import React, { useState } from "react";
import moment from "moment/moment";
import { useEditAssignmentMarkMutation } from "../../../../features/assignmentMarks/assignmentMarksApi";
import { toast } from "react-hot-toast";

const SingleAdminAssignmentMarks = ({ assignment }) => {
  const [marks, setMarks] = useState(0);
  const {
    _id,
    title,
    student_name,
    repo_link,
    status,
    mark,
    totalMark,
    createdAt,
  } = assignment || {};
  const [editAssignmentMark, { isSuccess }] = useEditAssignmentMarkMutation();
  return (
    <>
      <tr>
        <td className="table-td">{title}</td>
        <td className="table-td">{moment().format(createdAt)}</td>
        <td className="table-td">{student_name}</td>
        <td className="table-td">{repo_link}</td>
        <td className="table-td input-mark">
          {status !== "published" && (
            <>
              <input
                type="number"
                min="0"
                max={totalMark}
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
              <svg
                onClick={() => {
                  if (marks < 0 || marks > totalMark) {
                    return toast.error("Please enter a valid mark!!");
                  }
                  editAssignmentMark({
                    id: _id,
                    data: {
                      title,
                      student_name,
                      repo_link,
                      totalMark,
                      createdAt,
                      mark: Number(marks),
                      status: "published",
                    },
                  });
                }}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </>
          )}
          {status === "published" && mark}
        </td>
      </tr>
    </>
  );
};

export default SingleAdminAssignmentMarks;
