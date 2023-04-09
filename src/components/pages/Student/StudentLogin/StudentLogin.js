import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../../features/auth/authApi";
import { clearAdminError } from "../../../../features/auth/authSlice";
import Error from "../../../../utils/Error";

const StudentLogin = () => {
  const { adminError } = useSelector((state) => state.auth);
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAdminError());
    setForm({
      ...form,
      error: "",
    });
    login({
      email: form?.email,
      password: form?.password,
    });
  };
  useEffect(() => {
    if (isError && error.data) {
      setForm({
        ...form,
        error: error.data,
      });
    } else if (isError && !error.data) {
      setForm({
        ...form,
        error: error.error,
      });
    }
    // set Admin error
    if (adminError) {
      setForm({
        ...form,
        error: "Please try this user name in '/admin' route!! ",
      });
    }
  }, [error, isError, adminError]);
  useEffect(() => {
    if (isSuccess && !adminError) {
      setForm({
        email: "",
        password: "",
        error: "",
      });
      navigate("/");
    }
  }, [isSuccess, adminError]);

  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              className="h-12 mx-auto"
              src="../assets/image/learningportal.svg"
              alt=""
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Email address"
                  value={form?.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input rounded-b-md"
                  placeholder="Password"
                  value={form?.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/registration"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={isLoading}
              >
                Sign in
              </button>
            </div>
            {form.error && <Error message={form?.error} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default StudentLogin;
