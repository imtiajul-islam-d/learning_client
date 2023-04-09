import { createBrowserRouter } from "react-router-dom";
import Admin from "../components/pages/Admin/Admin";
import AdminAssignment from "../components/pages/Admin/AdminAssignment/AdminAssignment";
import AdminAssignmentMarks from "../components/pages/Admin/AdminAssignmentMarks/AdminAssignmentMarks";
import AdminDashboard from "../components/pages/Admin/AdminDashboard/AdminDashboard";
import AdminLogin from "../components/pages/Admin/AdminLogin/AdminLogin";
import AdminQuizzes from "../components/pages/Admin/AdminQuizzes/AdminQuizzes";
import AdminVideos from "../components/pages/Admin/AdminVideos/AdminVideos";
import Registration from "../components/pages/Student/Registration/Registration";
import Student from "../components/pages/Student/Student";
import StudentLeaderBoard from "../components/pages/Student/StudentLeaderBoard/StudentLeaderBoard";
import StudentLogin from "../components/pages/Student/StudentLogin/StudentLogin";
import AdminPublicRoute from "./AdminPublicRoute";
import AdminRoute from "./adminRoute";
import StudentPublicRoute from "./StudentPublicRoute";
import StudentRoute from "./studentRoute";
import StudentVideoContainer from "../components/pages/Student/StudentCoursePlayer/StudentVideoContainer/StudentVideoContainer";
import SingleStudentVideoContainer from "../components/pages/Student/StudentCoursePlayer/SingleStudentVideoContainer/SingleStudentVideoContainer";
import StudentQuizzes from "../components/pages/Student/StudentQuizzes/StudentQuizzes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Student />,
    children: [
      {
        path: "/",
        element: (
          <StudentPublicRoute>
            <StudentLogin />
          </StudentPublicRoute>
        ),
      },
      {
        path: "/registration",
        element: (
          <StudentPublicRoute>
            <Registration />
          </StudentPublicRoute>
        ),
      },
      {
        path: "/leaderBoard",
        element: (
          <StudentRoute>
            <StudentLeaderBoard />
          </StudentRoute>
        ),
      },
      {
        path: "/coursePlayer",
        element: (
          <StudentRoute>
            <StudentVideoContainer />
          </StudentRoute>
        ),
      },
      {
        path: "/coursePlayer/:id",
        element: (
          <StudentRoute>
            <SingleStudentVideoContainer />
          </StudentRoute>
        ),
      },
      {
        path: "/quiz/:id",
        element: (
          <StudentRoute>
            <StudentQuizzes />
          </StudentRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: (
          <AdminPublicRoute>
            <AdminLogin />
          </AdminPublicRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/videos",
        element: (
          <AdminRoute>
            <AdminVideos />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/assignment",
        element: (
          <AdminRoute>
            <AdminAssignment />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/quizzes",
        element: (
          <AdminRoute>
            <AdminQuizzes />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/assignmentMarks",
        element: (
          <AdminRoute>
            <AdminAssignmentMarks />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
