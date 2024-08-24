import React, { useState } from "react";
import "./PriceList.css"; // Import the CSS file
import { useSelector } from "react-redux";

// Updated e-waste items with predefined commission rates (no price data)
const eWasteItems = [
  { name: "Mobile Phone", commissionRate: 5 },
  { name: "Laptop", commissionRate: 13 },
  { name: "Television", commissionRate: 10 },
  { name: "Refrigerator", commissionRate: 7 },
  { name: "Washing Machine", commissionRate: 8 },
  { name: "Air Conditioner", commissionRate: 9 },
  { name: "Desktop Computer", commissionRate: 6 },
  { name: "Keyboard", commissionRate: 5 },
  { name: "Mouse", commissionRate: 6 },
  { name: "Monitor", commissionRate: 7 },
  { name: "Printer", commissionRate: 8 },
  { name: "Speakers", commissionRate: 9 },
  { name: "CPU", commissionRate: 10 },
  { name: "Motherboard", commissionRate: 11 },
  { name: "Graphics Card", commissionRate: 12 },
  { name: "Hard Drive", commissionRate: 7 },
  { name: "Power Supply Unit", commissionRate: 8 },
  { name: "Router", commissionRate: 6 },
  { name: "UPS", commissionRate: 9 },
  { name: "Microwave", commissionRate: 5 },
];

const PriceList = () => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    customerName: "",
    contact: "",
    address: "",
  });

  const { user, role } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Dummy prices for the purpose of commission calculation
  const dummyPrices = {
    "Mobile Phone": 500,
    Laptop: 2000,
    Television: 1500,
    Refrigerator: 3000,
    "Washing Machine": 2500,
    "Air Conditioner": 4000,
    "Desktop Computer": 2200,
    Keyboard: 150,
    Mouse: 100,
    Monitor: 1200,
    Printer: 800,
    Speakers: 600,
    CPU: 1800,
    Motherboard: 1000,
    "Graphics Card": 1200,
    "Hard Drive": 500,
    "Power Supply Unit": 400,
    Router: 300,
    UPS: 700,
    Microwave: 2500,
  };

  // Helper function to calculate commission amount based on predefined commission rate
  const calculateCommissionAmount = (productName, commissionRate) => {
    const price = dummyPrices[productName];
    return ((price * commissionRate) / 100).toFixed(2); // Fixed to two decimal places
  };

  return (
    <div className="price-list-page">
      <h2 className="page-heading">E-Waste Price List</h2>
      <table className="price-list-table">
        <thead>
          <tr>
            <th>Product</th>
            {role && role === "Vendor" && user ? (
              <th>Commission Rate (%)</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {eWasteItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              {role && role === "Vendor" && user && (
                <td>{item.commissionRate}%</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
