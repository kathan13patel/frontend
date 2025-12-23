import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/RegistrationForm.css';

const API_BASE_URL = 'http://localhost:8000/api';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        address: '',
        city: '',
        country: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/register/`, formData);
            setMessage(response.data.message);
            setFormData({
                name: '',
                email: '',
                phone: '',
                age: '',
                address: '',
                city: '',
                country: ''
            });

            // Redirect to users page after 2 seconds
            setTimeout(() => {
                navigate('/users');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    const handleViewRegistrations = () => {
        navigate('/users');
    };

    return (
        <div className="registration-container">
            <h2 className="registration-heading">User Registration</h2>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Please enter exactly 10 digits"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button">
                        Register
                    </button>

                    <button type="button" onClick={handleViewRegistrations} className="view-button">
                        View All Registrations
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;