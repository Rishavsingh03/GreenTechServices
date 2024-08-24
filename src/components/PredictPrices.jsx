import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const PredictPrices = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [damage, setDamage] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();

    const data = {
      Brand: brand,
      Type: type,
      "Year of Purchase": yearOfPurchase,
      "Damage/Missing Parts": damage,
    };

    try {
      const response = await axios.post(
        "https://greenbackend-3xf9.onrender.com/predict",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let temp = response.data["Predicted Price (INR)"] / 10;
      if (type.toLowerCase() === 'mouse') {
        temp = temp / 80;
      }
      if (type.toLowerCase() === 'motherboard') {
        temp = temp / 130;
      }
      if (type.toLowerCase() === 'lights') {
        temp = temp / 110;
      }
      if (type.toLowerCase() === 'pendrive') {
        temp = temp / 130;
      }
      if (damage === 'not working') {
        if (temp > 1000) {
          temp = temp / 2;
        } else {
          temp = temp - 40;
        }
      }
      if (damage === 'physical damage') {
        if (temp > 1000) {
          temp = temp / 3;
        } else {
          temp = temp - 50;
        }
      }
      setPredictedPrice(temp);
    } catch (error) {
      console.error("There was an error predicting the price!", error);
    }
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
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageStyle}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              style={cardStyle}
            >
              <motion.h2 
                className="text-center mb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Predict E-Waste Price
              </motion.h2>
              <Form onSubmit={handlePredict}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Form.Group className="mb-3" controlId="formBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                  </Form.Group>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    />
                  </Form.Group>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Form.Group className="mb-3" controlId="formYearOfPurchase">
                    <Form.Label>Year of Purchase</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter year of purchase"
                      value={yearOfPurchase}
                      onChange={(e) => setYearOfPurchase(e.target.value)}
                      required
                    />
                  </Form.Group>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Form.Group className="mb-3" controlId="formDamage">
                    <Form.Label>Damage</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter damage description"
                      value={damage}
                      onChange={(e) => setDamage(e.target.value)}
                      required
                    />
                  </Form.Group>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button variant="light" type="submit" className="w-100">
                    Predict Price
                  </Button>
                </motion.div>
              </Form>
              {predictedPrice && (
                <motion.div 
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Predicted Price: {predictedPrice.toFixed(2)} INR</h3>
                </motion.div>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default PredictPrices;