import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";
import './EditTodo.css'

interface DescriptionValue {
  description: string;
  status: string;
}

const DescriptionSchema = Yup.object().shape({
  description: Yup.string().required("Input Description"),
  status: Yup.string().required("Select Status"),
});

const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<DescriptionValue>({
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `http://127.0.0.1:8078/todolist`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Set initial values based on the response data
          setInitialValues({
            description: data.description,
            status: data.status,
          });
        } else {
          console.log("Failed to fetch data for editing");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditDescription = async (values: DescriptionValue) => {
    const apiUrl = `http://127.0.0.1:8078/todolist/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        console.log("Failed to update description");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="marginn"
      style={{ minHeight: "50vh" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={DescriptionSchema}
        onSubmit={handleEditDescription}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Description
            </label>
            <Field
              name="description"
              type="text"
              className="form-control"
              id="exampleInputName"
            />
            <ErrorMessage name="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputStatus" className="form-label">
              Status
            </label>
            <Field
              as="select"
              name="status"
              className="form-select"
              id="exampleInputStatus"
            >
              <option value="">Select Status</option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </Field>
            <ErrorMessage name="status" />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCategory;
