import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie"

interface LoginValue {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is Required"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValue) => {
    const apiUrl = 'http://127.0.0.1:8078/auth/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      
      
      if (response.ok) {
        const token = data.cookies.token;
        Cookies.set("access_token", token);
        navigate("/home");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-lg-4 col-12 px-5">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            <Form>
            <div className="mb-3">
                <label htmlFor="exampleInputUserame" className="form-label">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                  id="exampleInputUsername"
                />
                <ErrorMessage name="username" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <ErrorMessage name="password" />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
                <button className="btn active">
                  <Link
                    className="nav-link"
                    to="/"
                    role="button"
                    aria-pressed="true"
                  >
                    Or Register Here
                  </Link>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
