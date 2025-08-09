import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./PredictPrices.css";

const PredictPrices = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [damage, setDamage] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const brands = [
    "Lenovo",
    "Huawei",
    "JBL",
    "Apple",
    "Sony",
    "Samsung",
    "Asus",
    "Canon",
    "Dell",
    "Microsoft",
    "LG",
    "Xiaomi",
    "Nikon",
    "Logitech",
    "Acer",
    "Bose",
    "HP",
  ];

  const types = [
    "Laptop",
    "Refrigerator",
    "TV",
    "Washing Machine",
    "Microwave",
    "Hard Drive",
    "Speaker",
    "Mouse",
    "Surface Pro",
    "Keyboard",
    "Pendrive",
    "PlayStation",
    "Motherboard",
    "Camera",
    "Mobile Phone",
    "Monitor",
    "SSD",
    "Tablet",
  ];

  const damages = ["physical damage", "working", "not working"];

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
      if (type.toLowerCase() === "mouse") {
        temp = temp / 80;
      }
      if (type.toLowerCase() === "motherboard") {
        temp = temp / 130;
      }
      if (type.toLowerCase() === "lights") {
        temp = temp / 110;
      }
      if (type.toLowerCase() === "pendrive") {
        temp = temp / 130;
      }
      if (damage === "not working") {
        if (temp > 1000) {
          temp = temp / 2;
        } else {
          temp = temp - 40;
        }
      }
      if (damage === "physical damage") {
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

  return (
    <div className="predict-prices-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="predict-card">
              <h2 className="predict-title">
                Predict E-Waste Price
              </h2>
              <Form onSubmit={handlePredict}>
                <div className="form-section">
                  <Form.Group className="mb-3" controlId="formBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      as="select"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.map((b, index) => (
                        <option key={index} value={b}>
                          {b}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>

                <div className="form-section">
                  <Form.Group className="mb-3" controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option value="">Select Type</option>
                      {types.map((t, index) => (
                        <option key={index} value={t}>
                          {t}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>

                <div className="form-section">
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
                </div>

                <div className="form-section">
                  <Form.Group className="mb-3" controlId="formDamage">
                    <Form.Label>Damage</Form.Label>
                    <Form.Control
                      as="select"
                      value={damage}
                      onChange={(e) => setDamage(e.target.value)}
                      required
                    >
                      <option value="">Select Damage</option>
                      {damages.map((d, index) => (
                        <option key={index} value={d}>
                          {d}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>

                <div className="form-section">
                  <Button variant="light" type="submit" className="predict-button">
                    Predict Price
                  </Button>
                </div>
              </Form>
              {predictedPrice && (
                <div className="result-section">
                  <h3 className="result-title">Predicted Price: {predictedPrice.toFixed(2)} INR</h3>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PredictPrices;
