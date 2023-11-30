import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

interface DescriptionValue {
  description: string;
}

const DescriptionSchema = Yup.object().shape({
  description: Yup.string().required("Input Category Name"),
});

const NewTodo: React.FC = () => {
  const handleAddDescription = async (values: DescriptionValue) => {
    const apiUrl = "http://127.0.0.1:8078/todolist";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ minHeight: "10vh", maxWidth: "25vh" }}
    >
      <Formik
        initialValues={{
          description: "", 
        }}
        validationSchema={DescriptionSchema}
        onSubmit={handleAddDescription}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              To Do
            </label>
            <Field
              name="description" 
              type="text"
              className="form-control"
              id="exampleInputName"
            />
            <ErrorMessage name="description" />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default NewTodo;
