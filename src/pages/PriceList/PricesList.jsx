import React from "react";
import { useSelector } from "react-redux";
import "./PriceList.css";

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
  const { user, role } = useSelector((state) => state.auth);

  return (
    <div className="price-list-container">
      <h2 className="price-list-title">E-Waste Price List</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th className="table-header">Product</th>
            {role === "Vendor" && user && (
              <th className="table-header">Commission Rate (%)</th>
            )}
          </tr>
        </thead>
        <tbody>
          {eWasteItems.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{item.name}</td>
              {role === "Vendor" && user && (
                <td className="table-cell">{item.commissionRate}%</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;