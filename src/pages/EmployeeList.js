import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css";

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/v1/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeList(response.data.employees);
      } catch (err) {
        console.error("Error loading employee data:", err);
      }
    };
    loadEmployees();
  }, []);

  const handleSearchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      let query = "";
  
      if (departmentFilter) query += `department=${departmentFilter}`;
      if (positionFilter) query += query ? `&position=${positionFilter}` : `position=${positionFilter}`;
  
      const url = query
        ? `http://localhost:5000/api/v1/emp/search?${query}`
        : "http://localhost:5000/api/v1/emp/employees";
  
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setEmployeeList(response.data.employees);
    } catch (err) {
      alert("Search failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleResetFilters = () => {
    setDepartmentFilter("");
    setPositionFilter("");
    const loadEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/v1/emp/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeList(response.data.employees);
      } catch (err) {
        console.error("Error resetting search filters:", err);
      }
    };
    loadEmployees();
  };

  const handleAddNewEmployee = () => {
    navigate("/add-employee");
  };

  const handleViewEmployeeDetails = (id) => {
    navigate(`/view-employee/${id}`);
  };

  const handleEditEmployeeDetails = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDeleteEmployeeRecord = async (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/v1/emp/employees?eid=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeList(employeeList.filter((emp) => emp.id !== id));
        alert("Employee removed successfully!");
      } catch (err) {
        alert("Error deleting employee: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-container">
        <h2>Employee Directory</h2>

        <div className="mb-3">
          <button className="btn btn-success add-employee" onClick={handleAddNewEmployee}>
            Add New Employee
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Department"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by Position"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={handleSearchEmployees}>
              Search
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length > 0 ? (
              employeeList.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleViewEmployeeDetails(emp.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditEmployeeDetails(emp.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEmployeeRecord(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
