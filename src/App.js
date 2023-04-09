import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import router from "./routes/router";
import "./style/output.css";
import Loader from "./utils/Loader";

function App() {
  const authCheck = useAuthCheck();
  return !authCheck ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
