import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ViewEmployee.css'; // Ensure the path is correct for your project structure

const ViewEmployee = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const { id } = useParams(); // Extract employee ID from URL
  const navigate = useNavigate();

  // Fetch employee data when the component loads
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/v1/emp/employees/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployeeDetails(response.data.employee);
      } catch (err) {
        console.error('Error loading employee data:', err);
      }
    };
    loadEmployeeData();
  }, [id]);

  const navigateToEmployeeList = () => {
    navigate('/employees'); // Redirect to employee list
  };

  const navigateToEditEmployee = () => {
    navigate(`/edit-employee/${id}`); // Redirect to edit employee page
  };

  return (
    <div className="employee-view-container">
      <div className="employee-view-details">
        <h2>Employee Profile</h2>
        <div className="employee-info">
          <p><strong>First Name:</strong> {employeeDetails.firstname}</p>
          <p><strong>Last Name:</strong> {employeeDetails.lastname}</p>
          <p><strong>Email:</strong> {employeeDetails.email}</p>
          <p><strong>Position:</strong> {employeeDetails.position}</p>
          <p><strong>Department:</strong> {employeeDetails.department}</p>
          <p><strong>Salary:</strong> {employeeDetails.salary}</p>
          <p><strong>Joined On:</strong> {employeeDetails.date_of_joining}</p>
        </div>
        <div className="button-group">
          <button
            className="btn-edit"
            onClick={navigateToEditEmployee}
          >
            Edit Profile
          </button>
          <button
            className="btn-back-to-list"
            onClick={navigateToEmployeeList}
          >
            Back to Employee List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
