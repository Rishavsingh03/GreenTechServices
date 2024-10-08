import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "/src/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Pickups = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [vendorLicence, setVendorLicence] = useState("");

  useEffect(() => {
    const fetchVendorEmailAndBookings = async () => {
      if (!user || loading) return;

      try {
        // Query to get the vendor's license number based on the logged-in user's email
        const vendorQuery = query(
          collection(db, "vendors"),
          where("email", "==", user.email)
        );
        const vendorSnapshot = await getDocs(vendorQuery);

        if (vendorSnapshot.empty) {
          toast.error("No vendor found with this email.");
          return;
        }

        // Extract vendor's license number
        const vendorData = vendorSnapshot.docs[0].data();
        setVendorLicence(vendorData.licenseNumber);

        // Query to get bookings based on the vendor's license number
        const bookingsQuery = query(
          collection(db, "slotBookings"),
          where("vendor.licenseNumber", "==", vendorData.licenseNumber)
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);

        // Extract and set the bookings data
        const fetchedBookings = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(fetchedBookings);
      } catch (error) {
        console.error("Error fetching vendor bookings:", error);
        toast.error("Failed to fetch bookings.");
      }
    };

    fetchVendorEmailAndBookings();
  }, [user, loading]);

  const handleStatusChange = async (bookingId) => {
    try {
      // Update the booking status in Firestore
      const bookingRef = doc(db, "slotBookings", bookingId);
      await updateDoc(bookingRef, {
        bookingPending: false,
      });
      toast.success("Status updated successfully!");

      // Update the bookings state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, bookingPending: false }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update status.");
    }
  };

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
      <Container>
        <motion.h2
          className="text-center mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: "white" }}
        >
          Pickups
        </motion.h2>
        <Row>
          {bookings.map((booking) => (
            <Col
              key={booking.id}
              xs={12}
              md={6}
              lg={4}
              style={{ marginBottom: "20px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card style={cardStyle}>
                  <Card.Body>
                    <Card.Title className="text-center" style={{ color: "white", fontWeight: "700" }}>
                      {booking.user.name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {booking.bookingDate}
                      <br />
                      <strong>Contact:</strong> {booking.user.contact}
                      <br />
                      <strong>Address:</strong> {booking.address}
                      <br />
                      <strong>Booking Pending:</strong>{" "}
                      {booking.bookingPending ? "Yes" : "No"}
                    </Card.Text>
                    {booking.bookingPending && (
                      <Button
                        variant="success"
                        onClick={() => handleStatusChange(booking.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
};

export default Pickups;
