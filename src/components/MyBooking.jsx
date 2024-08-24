import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "/src/firebase"; // Your Firebase configuration file
import "/src/components/MyBooking.css"; // Custom styles for the page
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

const MyBooking = () => {
  const { user, role } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingQuery =
          role === "Customer"
            ? query(
                collection(db, "slotBookings"),
                where("email", "==", user.email)
              )
            : query(
                collection(db, "slotBookings"),
                where("vendors", "array-contains", { locality: user.locality })
              );

        const bookingSnapshot = await getDocs(bookingQuery);

        const bookingData = bookingSnapshot.docs.map((doc) => doc.data());
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    if(role===null){
        navigate('/login');
    }

    fetchBookings();
  }, [user, role]);

  return (
    <div className="booking-page container">
      <h2 className="booking-heading">My Bookings</h2>
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  Booking for {booking.locality} on {booking.date}
                </h5>
                <p className="card-text">
                  <strong>Name:</strong> {booking.name}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {booking.email}
                </p>
                {role === "Vendor" && (
                  <div>
                    <h6>Vendors Involved:</h6>
                    <ul>
                      {booking.vendors.map((vendor, idx) => (
                        <li key={idx}>
                          {vendor.name} - {vendor.phone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
