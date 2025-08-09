import React, { useEffect } from "react";
import "./Navbar.css"; // Import the CSS file for custom styles
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from '../firebase'; // Make sure to import db if you're using it for Firestore
import { setUser, setLoading, setError } from "../Redux/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, role, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async (user) => {
    try {
      if (user) {
        // Fetch the user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;

          // Create the serializable user object
          const serializableUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role,
          };

          // Update Redux state
          dispatch(setUser(serializableUser));
        } else {
          console.log("No such user document!");
        }
      } else {
        // Handle the case where the user is not logged in
        dispatch(setUser(null));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchUserDetails(user);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null)); // This will ensure the user state is cleared immediately
      toast.success("Logged out successfully"); // Display success toast
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a brief delay
      }, 1000);
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Function to check if a link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="" className="navbar-brand">
              <div className="logo">
                <FaLeaf className="logo-icon" />
                <span className="logo-text">GreenTech Services</span>
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                    Home
                  </Link>
                </li>
                {role && role === "Customer" ? (
                  <li className="nav-item">
                    <Link to="/slotbooking" className={`nav-link ${isActive("/slotbooking") ? "active" : ""}`}>
                      Book Appointment
                    </Link>
                  </li>
                ) : null}
                {role && role === "Customer" ? (
                  <li className="nav-item">
                    <Link to="/predict-prices" className={`nav-link ${isActive("/predict-prices") ? "active" : ""}`}>
                      Get Price
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
                    About Us
                  </Link>
                </li>
                {role && role === "Vendor" ? (
                  <li className="nav-item">
                    <Link to="/getLicence" className={`nav-link ${isActive("/getLicence") ? "active" : ""}`}>
                      GetLicence
                    </Link>
                  </li>
                ) : null}
                {role && role === "Vendor" ? (
                  <li className="nav-item">
                    <Link to="/priceList" className={`nav-link ${isActive("/priceList") ? "active" : ""}`}>
                      Price List
                    </Link>
                  </li>
                ) : null}
                {role && role === "Customer" ? (
                  <li className="nav-item">
                    <Link to="/mybooking" className={`nav-link ${isActive("/mybooking") ? "active" : ""}`}>
                      My Bookings
                    </Link>
                  </li>
                ) : null}
                {role && role === "Vendor" ? (
                  <li className="nav-item">
                    <Link to="/pickups" className={`nav-link ${isActive("/pickups") ? "active" : ""}`}>
                      My Pickups
                    </Link>
                  </li>
                ) : null}
              </ul>
              <div className="navbar-actions">
                {role && role === "Customer" ? (
                  <Link to="/slotbooking" className="btn btn-primary schedule-btn">
                    Schedule Pickup
                  </Link>
                ) : null}
                {user ? (
                  <div className="d-flex align-items-center">
                    <span className="navbar-text me-2">
                      Welcome, {user.displayName}
                    </span>
                    <button className="btn custom-button" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                ) : (
                  <form className="d-flex flex-row ms-2" role="search">
                    <Link to="/login">
                      <button className="btn custom-button" type="button">
                        Log In
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="btn custom-button ms-2" type="button">
                        Sign Up
                      </button>
                    </Link>
                  </form>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
