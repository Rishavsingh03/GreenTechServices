import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "/src/firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
      navigate('/login');
    }

    fetchBookings();
  }, [user, role, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Bookings</h2>
      <div className="row">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="col-md-6">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
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
                  <h6 className="mt-3">Vendor Details:</h6>
                  <p className="card-text">
                    <strong>Name:</strong> {booking.vendor.name}
                  </p>
                  <p className="card-text">
                    <strong>License Number:</strong> {booking.vendor.licenseNumber}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
