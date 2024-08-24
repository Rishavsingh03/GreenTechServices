import React, { useState,useEffect } from 'react';
import './UserForm.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SlotBooking = () => {
  const { user, role, loading, error } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("You need to login");
      navigate("/login");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="form-page">
      <h2 className="form-heading">Slot Booking</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text1" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder=" write your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder=' write your email'
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="form-input"
            placeholder=' contact details'
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-textarea"
            placeholder=" Write Address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date of Pickup:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Date of Pickup"
          />
        </div>

        <button type="submit" className="form-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default SlotBooking;
