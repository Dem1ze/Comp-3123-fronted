import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddEmployee.css";

function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    jobTitle: "",
    department: "",
    monthlySalary: "",
    joiningDate: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/v1/emp/employees", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee has been added successfully!");
      navigate("/employees");
    } catch (err) {
      alert("An error occurred: " + (err.response?.data?.message || err.message));
    }
  };

  const handleBackToEmployees = () => {
    navigate("/employees");
  };

  return (
    <div className="add-employee-page">
      <div className="add-employee-container">
        <h2>Add New Employee</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={formData.lastName}
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
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              name="jobTitle"
              className="form-control"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              name="monthlySalary"
              type="number"
              className="form-control"
              value={formData.monthlySalary}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Joining Date</label>
            <input
              name="joiningDate"
              type="date"
              className="form-control"
              value={formData.joiningDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-add-submit">
              Add Employee
            </button>
            <button type="button" className="btn-add-back" onClick={handleBackToEmployees}>
              Return to Employees List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
