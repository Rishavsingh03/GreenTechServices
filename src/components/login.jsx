import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authActions";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)',
    color: 'white',
    padding: '50px 20px',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageStyle}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={cardStyle}
            >
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <div className="alert alert-danger">{error}</div>}
                <Button
                  variant="light"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Submit"}
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Login;