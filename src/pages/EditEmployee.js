import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditEmployee.css";

function EditEmployee() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    jobTitle: "",
    department: "",
    monthlySalary: "",
    joiningDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(response.data.employee);
      } catch (err) {
        console.error("Error loading employee details:", err);
      }
    };

    getEmployeeDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/v1/emp/employees/${id}`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee information updated!");
      navigate("/employees");
    } catch (err) {
      alert("Error updating employee: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBackToEmployeeList = () => {
    navigate("/employees");
  };

  return (
    <div className="edit-employee-page">
      <div className="edit-employee-container">
        <h2>Update Employee Information</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              className="form-control"
              value={employeeData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={employeeData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              name="emailAddress"
              type="email"
              className="form-control"
              value={employeeData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              name="jobTitle"
              className="form-control"
              value={employeeData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              className="form-control"
              value={employeeData.department}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Monthly Salary</label>
            <input
              name="monthlySalary"
              type="number"
              className="form-control"
              value={employeeData.monthlySalary}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Joining</label>
            <input
              name="joiningDate"
              type="date"
              className="form-control"
              value={employeeData.joiningDate.split("T")[0]}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
        <div className="button-group">
          <button className="btn-edit-update" onClick={handleUpdate}>
            Update Employee
          </button>
          <button className="btn-edit-back" onClick={handleBackToEmployeeList}>
            Return to Employees List
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
