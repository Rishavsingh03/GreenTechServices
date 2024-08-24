import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '/src/firebase'; // Ensure correct path to Firebase config
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Pickups = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [vendorLicence, setVendorLicence] = useState('');

  useEffect(() => {
    const fetchVendorEmailAndBookings = async () => {
      if (!user || loading) return; // Wait until user data is available

      try {
        // Fetch vendor license number using vendor's email
        const vendorQuery = query(collection(db, 'vendors'), where('email', '==', user.email));
        const vendorSnapshot = await getDocs(vendorQuery);

        if (vendorSnapshot.empty) {
          toast.error('No vendor found with this email.');
          return;
        }

        const vendorData = vendorSnapshot.docs[0].data();
        setVendorLicence(vendorData.licenseNumber);

        // Fetch bookings where the vendor license number matches
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
  }, [user, loading]); // Depend on user and loading state

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

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Pickups</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Booking for {booking.address} on {booking.bookingDate}</h5>
              <p className="card-text"><strong>Customer Name:</strong> {booking.user.name}</p>
              <p className="card-text"><strong>Customer Phone:</strong> {booking.user.contact}</p>
              <p className="card-text"><strong>Status:</strong> {booking.pending ? 'Pending' : 'Done'}</p>
              {booking.pending && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(booking.id)}
                >
                  Mark as Done
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No pending bookings found.</p>
      )}
    </div>
  );
};

export default Pickups;
