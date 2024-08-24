import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Redux/authActions";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer"); // Default role to Customer

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await dispatch(signupUser(name, email, password, role)); // Pass role to action
    navigate("/");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-box p-5 rounded">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary btn-block w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
