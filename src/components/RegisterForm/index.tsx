import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie"

interface RegisterValue {
  username: string;
  email: string;
  role: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  role: Yup.string(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterValue) => {
    const apiUrl = "http://127.0.0.1:8078/auth/register";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        Cookies.set("registerData", JSON.stringify(data));
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <main>
      <div className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div className="col-lg-4 col-12 px-5">
          <Formik
            initialValues={{
              username: "",
              email: "",
              role: "1",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
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
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <Field
                  name="email"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label htmlFor="exampleInputRole" className="form-label">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Field>
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
                  Register
                </button>
                <Link to="/login" className="btn active">
                  Or Login Here
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
