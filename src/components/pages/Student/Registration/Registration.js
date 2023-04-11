import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../../features/auth/authApi";
import Error from "../../../../utils/Error";
import { toast } from "react-hot-toast";

const Registration = () => {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      error: "",
    });
    if (form?.password === form?.confirm) {
      register({
        name: form?.name,
        email: form?.email,
        password: form?.password,
        role: "student",
      });
    } else {
      toast.error("Password does not matched!");
    }
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
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      setForm({
        name: "",
        email: "",
        password: "",
        error: "",
      });
      navigate("/");
    }
  }, [isSuccess]);
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
              Create Your New Account
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
                <label for="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autocomplete="name"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Student Name"
                  value={form?.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="login-input "
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
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="login-input"
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
              <div>
                <label for="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="confirm-password"
                  required
                  className="login-input rounded-b-md"
                  placeholder="Confirm Password"
                  value={form?.confirm}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirm: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>
            </div>
            {form?.error !== "" && <Error message={form?.error} />}
          </form>
        </div>
      </section>
    </>
  );
};

export default Registration;
