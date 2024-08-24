import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '/src/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Pickups = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [vendorLicence, setVendorLicence] = useState('');

  useEffect(() => {
    const fetchVendorEmailAndBookings = async () => {
      if (!user || loading) return;

      try {
        const vendorQuery = query(collection(db, 'vendors'), where('email', '==', user.email));
        const vendorSnapshot = await getDocs(vendorQuery);

        if (vendorSnapshot.empty) {
          toast.error('No vendor found with this email.');
          return;
        }

        const vendorData = vendorSnapshot.docs[0].data();
        setVendorLicence(vendorData.licenseNumber);

        const bookingsQuery = query(collection(db, 'slotBookings'), where('vendor.licenseNumber', '==', vendorData.licenseNumber));
        const bookingsSnapshot = await getDocs(bookingsQuery);

        const bookingsData = bookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings.');
      }
    };

    fetchVendorEmailAndBookings();
  }, [user, loading]);

  const handleStatusChange = async (bookingId) => {
    try {
      const bookingDoc = doc(db, 'slotBookings', bookingId);
      await updateDoc(bookingDoc, { pending: false });
      toast.success('Booking status updated successfully!');
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, pending: false } : booking
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status.');
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)',
    color: 'white',
    padding: '50px 20px',
  };

  if (loading) {
    return (
      <div style={pageStyle} className="d-flex justify-content-center align-items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

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
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          My Pickups
        </motion.h2>
        <Row>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <Col md={6} key={booking.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="mb-4 shadow" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                    <Card.Body>
                      <Card.Title className="text-center font-weight-bold">
                        Booking for {booking.address} on {booking.bookingDate}
                      </Card.Title>
                      <Card.Text>
                        <strong>Customer Name:</strong> {booking.user.name}
                      </Card.Text>
                      <Card.Text>
                        <strong>Customer Phone:</strong> {booking.user.contact}
                      </Card.Text>
                      <Card.Text>
                        <strong>Status:</strong> {booking.pending ? 'Pending' : 'Done'}
                      </Card.Text>
                      {booking.pending && (
                        <Button
                          variant="light"
                          onClick={() => handleStatusChange(booking.id)}
                        >
                          Mark as Done
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No pending bookings found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </motion.div>
  );
};

export default Pickups;