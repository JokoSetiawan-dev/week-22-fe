import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { NewDataForm } from "../../components";
import './homepage.css'
import Navbar from "../../components/Navbar";

interface IDataItem {
  id: string;
  description: string;
  status: string;
}

interface DataTableProps {
  data: IDataItem[];
}

const HomePage: React.FC<DataTableProps> = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IDataItem[]>([]);

  const fetchData = async () => {
    try {
      const apiUrl = `http://127.0.0.1:8078/todolist`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json"
        }
      });
      console.log("response:", response);
      
      const data = await response.json();
      console.log("this is data fe", data);
      
      setData(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate]);
 
  // For debugging purposes
  useEffect(() => {
     console.log('Data:', data);
  }, [data]);

  const handleDeleteCategory = async (id: string) => {
    const apiUrl = `http://127.0.0.1:8078/todolist/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      if (response.ok) {
        // Refresh the data after deleting if needed.
        fetchData();
      } else {
        console.log("Failed to delete category.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`container pt-4`}>
      <div>
        <Navbar/>
      </div>
      <div className="h-auto p-3">
        <NewDataForm/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col" className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((dataItem) => (
            <tr key={dataItem.id}>
              <td>{dataItem.description}</td>
              <td>{dataItem.status}</td>
              <td className="editCategory">
                <button
                  className="btn btn-secondary padding"
                  onClick={() => navigate(`/update/${dataItem.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteCategory(dataItem.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default HomePage;
