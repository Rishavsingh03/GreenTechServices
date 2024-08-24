import React from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

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

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 20px',
    color: 'white'
  };

  const tableStyle = {
    width: '100%',
    maxWidth: '800px',
    borderCollapse: 'separate',
    borderSpacing: '0 15px',
    marginTop: '30px'
  };

  const cellStyle = {
    padding: '15px',
    textAlign: 'left',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px'
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    background: 'rgba(255,255,255,0.2)'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageStyle}
    >
      <h2 style={{ marginBottom: '30px', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>E-Waste Price List</h2>
      <motion.table 
        style={tableStyle}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <thead>
          <tr>
            <th style={headerCellStyle}>Product</th>
            {role === "Vendor" && user && (
              <th style={headerCellStyle}>Commission Rate (%)</th>
            )}
          </tr>
        </thead>
        <tbody>
          {eWasteItems.map((item, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td style={cellStyle}>{item.name}</td>
              {role === "Vendor" && user && (
                <td style={cellStyle}>{item.commissionRate}%</td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default PriceList;