import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "/src/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import "./SlotBooking.css";

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
    <div className="slot-booking-container">
      <h2 className="slot-booking-title">
        Slot Booking
      </h2>
      <form
        onSubmit={handleSubmit}
        className="booking-form"
      >
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label
              htmlFor={key}
              className="form-label"
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
              className="form-input"
              placeholder={`Enter your ${key}`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>

      {vendor && (
        <div
          id="vendor-info"
          className="vendor-info"
        >
          <h3 className="vendor-title">Vendor Information</h3>
          <p className="vendor-detail">
            <strong>Name:</strong> {vendor.vendorName}
          </p>
          <p className="vendor-detail">
            <strong>License Number:</strong> {vendor.licenseNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;
