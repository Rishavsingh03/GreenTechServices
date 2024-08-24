import React, { useState, useEffect } from 'react';
import './UserForm.css'; // Import the CSS file
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '/src/firebase'; // Import your Firebase config
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const SlotBooking = () => {
  const { user,role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("You need to login");
      navigate("/login");
    }
    if(role==='Vendor'){
      toast.error("Not a customer");
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { address, name, email, contact, date } = formData;

    try {
      // Query Firestore to find a vendor by address
      const vendorQuery = query(collection(db, 'vendors'), where('locality', '==', address));
      const vendorSnapshot = await getDocs(vendorQuery);

      if (vendorSnapshot.empty) {
        toast.error("No vendor available for this address");
        return;
      }

      console.log("Vendors details",vendorSnapshot);

      // If a vendor is found, take the first one (or handle as needed)
      const vendorData = vendorSnapshot.docs[0].data();
      setVendor(vendorData);

      console.log("Vendors",vendor);

      // Display the vendor details to the user
      toast.success(`Vendor found: ${vendorData.vendorName}, License Number: ${vendorData.licenseNumber}`);
       
      setTimeout(() => {
        document.getElementById('vendor-info').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      // Create a booking entry in Firestore
      await addDoc(collection(db, 'slotBookings'), {
        user: {
          name,
          email,
          contact
        },
        vendor: {
          name: vendorData.vendorName,
          licenseNumber: vendorData.licenseNumber,
        },
        bookingDate: date,
        address
      });

      toast.success('Slot booked successfully!');
    } catch (error) {
      console.error('Error booking slot:', error);
      toast.error('Failed to book slot. Please try again.');
    }
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
            disabled
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
            disabled
            className="form-input"
            placeholder=" write your email"
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
            placeholder=" contact details"
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

      {vendor && (
        <div id="vendor-info" className="vendor-info text-center mt-5 p-4 border rounded bg-light">
          <h3 className="mb-3">Vendor Information</h3>
          <p><strong>Name:</strong> {vendor.vendorName}</p>
          <p><strong>License Number:</strong> {vendor.licenseNumber}</p>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;
