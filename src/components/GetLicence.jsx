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
import { motion } from "framer-motion";

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

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
    color: "white",
    padding: "50px 20px",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
              transition={{ type: "spring", stiffness: 100 }}
              style={cardStyle}
            >
              {vendorData ? (
                <Card
                  className="text-center"
                  style={{ background: "transparent", border: "none" }}
                >
                  <Card.Body>
                    <motion.h2
                      className="mb-4"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Vendor Details
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <strong>Name:</strong> {vendorData.vendorName}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <strong>Email:</strong> {vendorData.email}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <strong>License Number:</strong>{" "}
                      {vendorData.licenseNumber}
                    </motion.p>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  <motion.h2
                    className="text-center mb-4"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Get License
                  </motion.h2>
                  <Form onSubmit={handleSubmit}>
                    {[
                      "Vendor Name",
                      "Phone Number",
                      "Locality",
                      "Aadhar Number",
                    ].map((field, index) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <Form.Group
                          className="mb-3"
                          controlId={`form${field.replace(" ", "")}`}
                        >
                          <Form.Label>{field}</Form.Label>
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
                          />
                        </Form.Group>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button variant="light" type="submit" className="w-100">
                        Generate License
                      </Button>
                    </motion.div>
                  </Form>
                </>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default GetLicence;
