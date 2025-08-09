import React from "react";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            We're on a mission to tackle the growing e-waste crisis in India through a sustainable and transparent platform that connects customers with licensed vendors.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="content-card">
            <p>
              Our journey began with a vision to revolutionize e-waste management in India. With over 3.2 million metric tons of e-waste generated annually, the improper handling of electronic waste poses severe environmental and health risks. Our platform was created to address these issues by connecting customers with licensed vendors, ensuring that e-waste is recycled responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* E-Waste Facts Section */}
      <section className="about-section facts-section">
        <div className="container">
          <h2 className="section-title">E-Waste in India: The Growing Concern</h2>
          <div className="facts-grid">
            {[
              { title: "India's E-Waste Growth", content: "India generates over 1.6 million metric tons of e-waste each year, making it the fifth-largest e-waste generator globally." },
              { title: "Low Recycling Rate", content: "Only 35% of India's e-waste is processed through formal recycling channels, leaving a significant portion unmanaged." },
              { title: "Health and Environmental Risks", content: "Improper disposal of e-waste can lead to the release of hazardous materials, causing severe health issues for communities." },
              { title: "Informal Sector Challenges", content: "Over 95% of e-waste in India is handled by informal recyclers, who often lack the necessary safety measures." }
            ].map((fact, index) => (
              <div key={index} className="fact-card">
                <h3>{fact.title}</h3>
                <p>{fact.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recycling Importance Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">The Importance of Recycling Electronics Waste</h2>
          <div className="content-card">
            <p>
              Recycling e-waste is crucial for several reasons. Electronics contain valuable materials such as gold, silver, copper, and rare earth elements, which can be recovered and reused. Proper recycling ensures that these resources are not wasted and prevents toxic substances from contaminating the environment.
            </p>
            <p>
              Through proper recycling, we reduce the demand for new raw materials, conserve energy, and minimize the carbon footprint associated with the manufacturing of new electronic devices.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="about-section impact-section">
        <div className="container">
          <h2 className="section-title">Impact of Our Platform</h2>
          <div className="impact-grid">
            {[
              { title: "Environmental Impact", content: "Our platform has helped divert thousands of tons of e-waste from landfills, reducing pollution and conserving valuable resources." },
              { title: "Empowering Vendors", content: "We empower local vendors by providing them with a steady stream of e-waste for collection and recycling." },
              { title: "Promoting Safe Practices", content: "By working with licensed vendors, our platform ensures that the recycling process adheres to strict safety standards." },
              { title: "Technological Innovation", content: "Our platform leverages machine learning models to predict the price of waste materials, optimizing the value assessment process." }
            ].map((impact, index) => (
              <div key={index} className="impact-card">
                <h3>{impact.title}</h3>
                <p>{impact.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">How Our Platform Works</h2>
          <div className="content-card">
            <p>
              Our platform connects customers with licensed vendors who collect their e-waste. The waste is then sent to certified recycling facilities, where it undergoes a series of processes, including sorting, shredding, and material recovery.
            </p>
            <p>
              A key feature of our platform is the integration of machine learning models that predict the price of waste materials based on current market trends, material composition, and condition. This ensures that customers receive fair compensation while vendors can optimize their profits.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="about-cta">
        <div className="container">
          <h2 className="section-title">Ready to Make a Difference?</h2>
          <p className="cta-subtitle">
            Join us in our mission to create a sustainable future through responsible e-waste management.
          </p>
          <div className="cta-buttons">
            <a href="/slotbooking" className="btn btn-primary">Schedule Pickup</a>
            <a href="/predict-prices" className="btn btn-secondary">Get Price Quote</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;