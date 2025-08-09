import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authActions";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password));
    navigate("/");
  };

  const handleDemoLogin = (demoType) => {
    if (demoType === "customer") {
      setEmail("test10@gmail.com");
      setPassword("Divyam@12345");
    } else if (demoType === "vendor") {
      setEmail("test11@gmail.com");
      setPassword("Divyam@12345");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="login-card">
              <h2 className="login-title">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>
                {error && <div className="alert alert-danger">{error}</div>}
                <Button
                  variant="light"
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Submit"}
                </Button>
              </Form>

              {/* Demo Login Section */}
              <div className="demo-login-section">
                <h4 className="demo-title">Demo Login Credentials</h4>
                <div className="demo-buttons">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="demo-btn"
                    onClick={() => handleDemoLogin("customer")}
                  >
                    Customer Demo
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="demo-btn"
                    onClick={() => handleDemoLogin("vendor")}
                  >
                    Vendor Demo
                  </Button>
                </div>
                <div className="demo-credentials">
                  <div className="demo-credential">
                    <strong>Customer:</strong> test10@gmail.com /
                    Divyam@12345
                  </div>
                  <div className="demo-credential">
                    <strong>Vendor:</strong> test11@gmail.com / Divyam@12345
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;