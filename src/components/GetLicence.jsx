import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase"; // Ensure this points to your Firebase configuration
import { useNavigate } from "react-router-dom";
import "./GetLicence.css";

const db = getFirestore(app);

const generateLicenseNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let license = "";
  for (let i = 0; i < 2; i++) {
    license += letters.charAt(Math.floor(Math.random() * letters.length));
  }

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
  const navigate = useNavigate();

  useEffect(() => {
    const checkVendorExists = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Check if vendor already exists in Firestore based on email
        const vendorQuery = query(
          collection(db, "vendors"),
          where("email", "==", user.email)
        );
        const vendorSnapshot = await getDocs(vendorQuery);

        if (!vendorSnapshot.empty) {
          // Vendor exists, retrieve their data
          const vendorDoc = vendorSnapshot.docs[0];
          setVendorData(vendorDoc.data());
        }
      } catch (error) {
        console.error("Error checking vendor: ", error);
        toast.error("Error checking vendor. Please try again.");
      }
    };

    checkVendorExists();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNumeric(phoneNumber)) {
      toast.error("Phone number should contain only numeric characters.");
      return;
    }

    if (!isNumeric(aadharNumber)) {
      toast.error("Aadhar number should contain only numeric characters.");
      return;
    }

    try {
      const licenseNumber = generateLicenseNumber();

      const vendorDocRef = doc(db, "vendors", aadharNumber);
      await setDoc(vendorDocRef, {
        vendorName,
        phoneNumber,
        email: user.email,
        locality,
        aadharNumber,
        licenseNumber,
      });

      toast.success(
        `License generated successfully! Your license number is: ${licenseNumber}`
      );

      setVendorData({
        vendorName,
        phoneNumber,
        email: user.email,
        locality,
        aadharNumber,
        licenseNumber,
      });

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
    <div className="get-license-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="license-card">
              {vendorData ? (
                <Card className="vendor-details-card">
                  <Card.Body>
                    <h2 className="vendor-details-title">
                      Vendor Details
                    </h2>
                    <p className="vendor-detail-text">
                      <strong>Name:</strong> {vendorData.vendorName}
                    </p>
                    <p className="vendor-detail-text">
                      <strong>Email:</strong> {vendorData.email}
                    </p>
                    <p className="vendor-detail-text">
                      <strong>License Number:</strong>{" "}
                      {vendorData.licenseNumber}
                    </p>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  <h2 className="license-title">
                    Get License
                  </h2>
                  <Form onSubmit={handleSubmit}>
                    {[
                      "Vendor Name",
                      "Phone Number",
                      "Locality",
                      "Aadhar Number",
                    ].map((field, index) => (
                      <div key={field} className="form-group">
                        <Form.Group
                          className="mb-3"
                          controlId={`form${field.replace(" ", "")}`}
                        >
                          <Form.Label className="form-label">{field}</Form.Label>
                          <Form.Control
                            type={
                              field === "Phone Number" ||
                              field === "Aadhar Number"
                                ? "tel"
                                : "text"
                            }
                            placeholder={`Enter ${field.toLowerCase()}`}
                            value={eval(
                              field.replace(" ", "").charAt(0).toLowerCase() +
                                field.replace(" ", "").slice(1)
                            )}
                            onChange={(e) =>
                              eval(
                                `set${field.replace(" ", "")}(e.target.value)`
                              )
                            }
                            required
                            className="form-control"
                          />
                        </Form.Group>
                      </div>
                    ))}
                    <div className="submit-group">
                      <Button variant="light" type="submit" className="generate-button">
                        Generate License
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GetLicence;
