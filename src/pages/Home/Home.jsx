import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaRecycle, FaShieldAlt, FaClock, FaHome, FaCalculator, FaBuilding } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Responsible Electronic Waste Management</h1>
          <p className="hero-description">
            Transform your old electronics into environmental solutions. We provide secure, eco-friendly disposal and recycling services for all your electronic devices.
          </p>
          <div className="hero-buttons">
            <Link to="/slotbooking" className="btn btn-primary">Schedule Pickup</Link>
            <Link to="/predict-prices" className="btn btn-secondary">Get Price Quote</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose GreenTech Services?</h2>
          <p className="section-subtitle">
            We're committed to providing the most responsible and efficient electronic waste management solutions.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaLeaf />
              </div>
              <h3>Eco-Friendly</h3>
              <p>100% responsible recycling with zero landfill waste</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Secure Disposal</h3>
              <p>Complete data destruction and secure handling of sensitive devices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>Quick Service</h3>
              <p>Same-day pickup available with flexible scheduling</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaRecycle />
              </div>
              <h3>Certified</h3>
              <p>Licensed and certified for proper electronic waste handling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaHome />
              </div>
              <h3>Residential Pickup</h3>
              <p>Convenient home pickup service for all your electronic devices. From smartphones to large appliances, we handle it all.</p>
              <Link to="/slotbooking" className="btn btn-primary service-btn">Schedule Now</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FaCalculator />
              </div>
              <h3>Price Calculator</h3>
              <p>Get instant quotes for your electronic items based on model, year, and condition. Transparent pricing guaranteed.</p>
              <Link to="/predict-prices" className="btn btn-primary service-btn">Get Quote</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FaBuilding />
              </div>
              <h3>Corporate Solutions</h3>
              <p>Bulk disposal services for businesses. Secure data destruction and compliance documentation included.</p>
              <Link to="/about" className="btn btn-primary service-btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Recycle Responsibly?</h2>
          <p className="section-subtitle">
            Join thousands of customers who trust GreenTech Services for their electronic waste management needs.
          </p>
          <div className="cta-button">
            <Link to="/slotbooking" className="btn btn-primary btn-large">Get Started Today</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;