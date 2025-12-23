import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/UsersList.css';

const API_BASE_URL = 'http://localhost:8000/api';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all users
      const usersResponse = await axios.get(`${API_BASE_URL}/users/`);
      setUsers(usersResponse.data.users || []);
      
      // Fetch total count
      const countResponse = await axios.get(`${API_BASE_URL}/users/count/`);
      setTotalRegistrations(countResponse.data.total_registrations || 0);
      
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRegistration = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2 className="users-heading">All Registrations</h2>
        <div className="total-box">
          Total Registrations: <span className="total-count">{totalRegistrations}</span>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={handleBackToRegistration}
        className="back-button"
      >
        ← Back to Registration
      </button>
      
      {users.length === 0 ? (
        <div className="no-data">No registrations found</div>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr className="table-header">
                <th className="table-th">Name</th>
                <th className="table-th">Email</th>
                <th className="table-th">Phone</th>
                <th className="table-th">Age</th>
                <th className="table-th">City</th>
                <th className="table-th">Country</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={index} 
                  className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}
                >
                  <td className="table-td">{user.name}</td>
                  <td className="table-td">{user.email}</td>
                  <td className="table-td">{user.phone}</td>
                  <td className="table-td">{user.age}</td>
                  <td className="table-td">{user.city || '-'}</td>
                  <td className="table-td">{user.country || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;