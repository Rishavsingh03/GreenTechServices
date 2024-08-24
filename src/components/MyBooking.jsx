import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "/src/firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { motion } from "framer-motion";

const db = getFirestore(app);

const MyBooking = () => {
  const { user, role } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingQuery =
          role === "Customer"
            ? query(collection(db, "slotBookings"), where("user.email", "==", user.email))
            : query(collection(db, "slotBookings"), where("vendors", "array-contains", { locality: user.locality }));

        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingData = bookingSnapshot.docs.map((doc) => doc.data());
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    if (!role) {
      navigate("/login");
    }

    fetchBookings();
  }, [user, role, navigate]);

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
    color: "white",
    padding: "50px 20px",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageStyle}
    >
      <div className="container mt-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: "white" }}
        >
          My Bookings
        </motion.h2>
        <div className="row">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <motion.div
                key={index}
                className="col-md-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="card mb-4 shadow" style={cardStyle}>
                  <div className="card-body">
                    <h5
                      className="card-title text-center font-weight-bold"
                      style={{ color: 'white', fontWeight: "700" }}
                    >
                      Booking for {booking.address} on {booking.bookingDate}
                    </h5>
                    <p className="card-text">
                      <strong>Name:</strong> {booking.user.name}
                    </p>
                    <p className="card-text">
                      <strong>Email:</strong> {booking.user.email}
                    </p>
                    <p className="card-text">
                      <strong>Contact:</strong> {booking.user.contact}
                    </p>
                    <h6 className="mt-3 text-center font-weight-bold">Vendor Details:</h6>
                    <p className="card-text">
                      <strong>Name:</strong> {booking.vendor.name}
                    </p>
                    <p className="card-text">
                      <strong>License Number:</strong> {booking.vendor.licenseNumber}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              No bookings found.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyBooking;
