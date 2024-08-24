import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { getFirestore, doc, setDoc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // Make sure this is pointing to your Firebase configuration
import { useNavigate } from "react-router-dom";

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
  const { user } = useSelector((state) => state.auth);
  const [vendorData, setVendorData] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");

  const isNumeric = (value) => /^[0-9]+$/.test(value);
  const navigate=useNavigate();
  useEffect(() => {
    const checkVendorExists = async () => {
     if(!user){
      navigate('/login');
     }
     if(role==='Customer'){
      navigate('/');
     }

      try {
        // Check if vendor already exists in Firestore based on email
        const vendorQuery = query(collection(db, "vendors"), where("email", "==", user.email));
        const vendorSnapshot = await getDocs(vendorQuery);

        if (!vendorSnapshot.empty) {
          // Vendor exists, retrieve their data
          const vendorDoc = vendorSnapshot.docs[0];
          setVendorData(vendorDoc.data());

          // Show success toast notification with existing license number
          // toast.success(`Vendor found. License number: ${vendorDoc.data().licenseNumber}`);
        }
      } catch (error) {
        console.error("Error checking vendor: ", error);
        toast.error("Error checking vendor. Please try again.");
      }
    };

    checkVendorExists();
  }, [user]);

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
      // Generate a new license number
      const licenseNumber = generateLicenseNumber();

      // Store the vendor details and new license number in Firestore
      const vendorDocRef = doc(db, "vendors", aadharNumber);
      await setDoc(vendorDocRef, {
        vendorName,
        phoneNumber,
        email: user.email,
        locality,
        aadharNumber,
        licenseNumber,
      });

      // Show success toast notification with new license number
      toast.success(`License generated successfully! Your license number is: ${licenseNumber}`);

      // Update vendor data in the state
      setVendorData({
        vendorName,
        phoneNumber,
        email: user.email,
        locality,
        aadharNumber,
        licenseNumber,
      });

      // Reset form after submission
      setVendorName("");
      setPhoneNumber("");
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
          {vendorData ? (
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Vendor Details</Card.Title>
                <Card.Text><strong>Name:</strong> {vendorData.vendorName}</Card.Text>
                <Card.Text><strong>Email:</strong> {vendorData.email}</Card.Text>
                <Card.Text><strong>License Number:</strong> {vendorData.licenseNumber}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GetLicence;
