import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../firebase"; // Make sure this is pointing to your Firebase configuration

const db = getFirestore(app);

const generateLicenseNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Generate two random letters
  let license = "";
  for (let i = 0; i < 2; i++) {
    license += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate five random numbers
  for (let i = 0; i < 5; i++) {
    license += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return license;
};

const GetLicence = () => {
  const [vendorName, setVendorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  const isNumeric = (value) => /^[0-9]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number and Aadhar number
    if (!isNumeric(phoneNumber)) {
      toast.error("Phone number should contain only numeric characters.");
      return;
    }

    if (!isNumeric(aadharNumber)) {
      toast.error("Aadhar number should contain only numeric characters.");
      return;
    }

    try {
      // Check if vendor already exists in Firestore
      const vendorDocRef = doc(db, "vendors", aadharNumber);
      const vendorDoc = await getDoc(vendorDocRef);

      let licenseNumber;

      if (vendorDoc.exists()) {
        // Vendor exists, retrieve the existing license number
        const vendorData = vendorDoc.data();
        licenseNumber = vendorData.licenseNumber;

        // Show success toast notification with existing license number
        toast.success(
          `Vendor already exists. Your license number is: ${licenseNumber}`
        );
      } else {
        // Vendor does not exist, generate a new license number
        licenseNumber = generateLicenseNumber();

        // Store the vendor details and new license number in Firestore
        await setDoc(vendorDocRef, {
          vendorName,
          phoneNumber,
          email,
          locality,
          aadharNumber,
          licenseNumber,
        });

        // Show success toast notification with new license number
        toast.success(
          `License generated successfully! Your license number is: ${licenseNumber}`
        );
      }

      // Reset form after submission
      setVendorName("");
      setPhoneNumber("");
      setEmail("");
      setLocality("");
      setAadharNumber("");
    } catch (error) {
      console.error("Error saving vendor details: ", error);
      toast.error("Error generating license. Please try again.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center my-4">Get License</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formVendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vendor name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocality">
              <Form.Label>Locality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAadharNumber">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhar number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Generate License
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GetLicence;
