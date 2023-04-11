import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../../../../features/auth/authApi";
import { clearAdminError } from "../../../../features/auth/authSlice";
import Error from "../../../../utils/Error";

const AdminLogin = () => {
  const { studentError } = useSelector((state) => state.auth);
  const [adminLogin, { isLoading, isSuccess, isError, error }] =
    useAdminLoginMutation();
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
    adminLogin({
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
    else if (studentError) {
      setForm({
        ...form,
        error: "Please try this user name in '/' route!! ",
      });
    }
  }, [error, isError, studentError]);
  useEffect(() => {
    if (isSuccess && !studentError) {
      setForm({
        email: "",
        password: "",
        error: "",
      });
      navigate("/admin");
    }
  }, [isSuccess, studentError]);
  return (
    <>
      <section class="py-6 bg-primary h-screen grid place-items-center">
        <div class="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              class="h-12 mx-auto"
              src="../assets/image/learningportal.svg"
            />
            <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Admin Account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            class="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="login-input rounded-t-md"
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
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="login-input rounded-b-md"
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

            <div class="flex items-center justify-end">
              <div class="text-sm">
                <Link class="font-medium text-violet-600 hover:text-violet-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
            {form?.error && <Error message={form?.error} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
