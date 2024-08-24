import React, { useState } from 'react';
import './PriceList.css'; // Import the CSS file
import { useSelector } from 'react-redux';

const PriceList = () => {
  // Updated data of e-waste products with hidden vendor profit (8% increase)
  const eWasteItems = [
    { name: 'Mobile Phone', price: 500 },
    { name: 'Laptop', price: 2000 },
    { name: 'Television', price: 1500 },
    { name: 'Refrigerator', price: 3000 },
    { name: 'Washing Machine', price: 2500 },
    { name: 'Air Conditioner', price: 4000 },
    { name: 'Desktop Computer', price: 2200 },
    { name: 'Keyboard', price: 150 },
    { name: 'Mouse', price: 100 },
    { name: 'Monitor', price: 1200 },
    { name: 'Printer', price: 800 },
    { name: 'Speakers', price: 600 },
    { name: 'CPU', price: 1800 },
    { name: 'Motherboard', price: 1000 },
    { name: 'Graphics Card', price: 1200 },
    { name: 'Hard Drive', price: 500 },
    { name: 'Power Supply Unit', price: 400 },
    { name: 'Router', price: 300 },
    { name: 'UPS', price: 700 },
    { name: 'Microwave', price: 2500 },
  ];

  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    customerName: '',
    contact: '',
    address: '',
  });

  const {user,role}=useSelector((state)=>state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  // Helper function to calculate the price with an 8% increase
  const calculateIncreasedPrice = (price) => {
    return (price * 1.08).toFixed(2); // Fixed to two decimal places
  };

  return (
    <div className="price-list-page">
      <h2 className="page-heading">E-Waste Price List</h2>
      <table className="price-list-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Original Price (₹)</th>
            {
              role && role==='Vendor'?<th>Price with 8% Increase (₹)</th>:<></>
            }
          </tr>
        </thead>
        <tbody>
          {eWasteItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              {
                role && role==="Vendor"?<td>{calculateIncreasedPrice(item.price)}</td>:<></>
              }
            </tr>
          ))}
        </tbody>
      </table>

     
       </div> 
     
  );
};

export default PriceList;
