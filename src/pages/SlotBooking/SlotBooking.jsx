import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "/src/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const SlotBooking = () => {
  const { user, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    contact: "",
    address: "",
    date: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("You need to login");
      navigate("/login");
    }
    if (role === "Vendor") {
      toast.error("Not a customer");
      navigate("/login");
    }
  }, [user, navigate, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { address, name, email, contact, date } = formData;

    try {
      // Query Firestore to find a vendor by address
      const vendorQuery = query(
        collection(db, "vendors"),
        where("locality", "==", address)
      );
      const vendorSnapshot = await getDocs(vendorQuery);

      if (vendorSnapshot.empty) {
        toast.error("No vendor available for this address");
        return;
      }

      // If a vendor is found, take the first one (or handle as needed)
      const vendorData = vendorSnapshot.docs[0].data();
      setVendor(vendorData);

      // Display the vendor details to the user
      toast.success(
        `Vendor found: ${vendorData.vendorName}, License Number: ${vendorData.licenseNumber}`
      );

      setTimeout(() => {
        document
          .getElementById("vendor-info")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);

      // Create a booking entry in Firestore
      await addDoc(collection(db, "slotBookings"), {
        user: {
          name,
          email,
          contact,
        },
        vendor: {
          name: vendorData.vendorName,
          licenseNumber: vendorData.licenseNumber,
        },
        bookingDate: date,
        address,
        bookingPending: true,
      });

      toast.success("Slot booked successfully!");
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book slot. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        color: "white",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          fontSize: "2.5rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Slot Booking
      </h2>
      <motion.form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              style={{ display: "block", marginBottom: "5px" }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <input
              type={key === "date" ? "date" : "text"}
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              required={!["name", "email"].includes(key)}
              disabled={["name", "email"].includes(key)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "none",
                background: "rgba(255,255,255,0.2)",
                color: "white",
              }}
              placeholder={`Enter your ${key}`}
            />
          </div>
        ))}
        <motion.button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.form>

      {vendor && (
        <motion.div
          id="vendor-info"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Vendor Information</h3>
          <p>
            <strong>Name:</strong> {vendor.vendorName}
          </p>
          <p>
            <strong>License Number:</strong> {vendor.licenseNumber}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SlotBooking;
