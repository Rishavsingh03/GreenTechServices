import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us-container">
      <section className="intro-section text-center py-5">
        <h1 className="heading">About Us</h1>
        <p className="lead">
          We're on a mission to tackle the growing e-waste crisis in India through a sustainable and transparent platform that connects customers with licensed vendors.
        </p>
      </section>

      <section className="content-section py-5">
        <div className="container">
          {/* Our Story Section */}
          <h2 className="mt-5 mb-4 section-heading">Our Story</h2>
          <p>
            Our journey began with a vision to revolutionize e-waste management in India. With over 3.2 million metric tons of e-waste generated annually, the improper handling of electronic waste poses severe environmental and health risks. Our platform was created to address these issues by connecting customers with licensed vendors, ensuring that e-waste is recycled responsibly.
          </p>

          {/* Facts About E-Waste in India Section */}
          <h2 className="mt-5 mb-4 section-heading">E-Waste in India: The Growing Concern</h2>
          <div className="facts-container">
            <div className="fact-card">
              <h3>India's E-Waste Growth</h3>
              <p>
                India generates over 3.2 million metric tons of e-waste each year, making it the third-largest e-waste generator globally. This number is expected to grow with increasing electronic consumption.
              </p>
            </div>
            <div className="fact-card">
              <h3>Low Recycling Rate</h3>
              <p>
                Only 10% of India's e-waste is processed through formal recycling channels, leaving a significant portion unmanaged and contributing to pollution.
              </p>
            </div>
            <div className="fact-card">
              <h3>Health and Environmental Risks</h3>
              <p>
                Improper disposal of e-waste can lead to the release of hazardous materials, including lead, mercury, and cadmium, causing soil, air, and water pollution and leading to severe health issues for communities.
              </p>
            </div>
            <div className="fact-card">
              <h3>Informal Sector Challenges</h3>
              <p>
                Over 95% of e-waste in India is handled by informal recyclers, who often lack the necessary safety measures. This contributes to environmental degradation and puts workers at significant health risk.
              </p>
            </div>
          </div>

          {/* Recycling Electronics Waste Section */}
          <h2 className="mt-5 mb-4 section-heading">The Importance of Recycling Electronics Waste</h2>
          <p>
            Recycling e-waste is crucial for several reasons. Electronics contain valuable materials such as gold, silver, copper, and rare earth elements, which can be recovered and reused. Proper recycling ensures that these resources are not wasted and prevents toxic substances from contaminating the environment.
          </p>
          <p>
            Unfortunately, the current recycling infrastructure in India is underdeveloped, with a lack of awareness, inadequate facilities, and insufficient regulatory enforcement. Our platform addresses these challenges by providing an organized process for e-waste collection and recycling through licensed vendors. 
          </p>
          <p>
            Through proper recycling, we reduce the demand for new raw materials, conserve energy, and minimize the carbon footprint associated with the manufacturing of new electronic devices. Additionally, responsible recycling helps prevent the illegal export of e-waste to developing countries, where improper handling leads to further environmental and health disasters.
          </p>

          {/* Platform Impact Section */}
          <h2 className="mt-5 mb-4 section-heading">Impact of Our Platform</h2>
          <div className="impact-container">
            <div className="impact-card">
              <h3>Environmental Impact</h3>
              <p>
                Our platform has helped divert thousands of tons of e-waste from landfills, reducing pollution and conserving valuable resources. By ensuring that e-waste is recycled responsibly, we are contributing to a healthier planet and supporting the circular economy.
              </p>
            </div>
            <div className="impact-card">
              <h3>Empowering Vendors</h3>
              <p>
                We empower local vendors by providing them with a steady stream of e-waste for collection and recycling. This not only creates economic opportunities for these vendors but also ensures that the e-waste is handled in compliance with environmental regulations.
              </p>
            </div>
            <div className="impact-card">
              <h3>Promoting Safe Practices</h3>
              <p>
                By working with licensed vendors, our platform ensures that the recycling process adheres to strict safety standards, reducing the exposure of workers to toxic substances and promoting better health outcomes in the recycling sector.
              </p>
            </div>
            <div className="impact-card">
              <h3>Technological Innovation</h3>
              <p>
                Our platform leverages machine learning models to predict the price of waste materials, optimizing the value assessment process for both customers and vendors. This technology ensures that customers receive fair compensation for their e-waste and vendors can maximize their profits through efficient recycling practices.
              </p>
            </div>
          </div>
          
          {/* Data and ML Integration Section */}
          <h2 className="mt-5 mb-4 section-heading">How Our Platform Works</h2>
          <p>
            Our platform connects customers with licensed vendors who collect their e-waste. The waste is then sent to certified recycling facilities, where it undergoes a series of processes, including sorting, shredding, and material recovery. The recovered materials are then reintroduced into the manufacturing process, reducing the need for new raw materials.
          </p>
          <p>
            A key feature of our platform is the integration of machine learning models that predict the price of waste materials based on current market trends, material composition, and condition. This ensures that customers receive fair compensation while vendors can optimize their profits. The data-driven approach also helps in tracking and managing the flow of e-waste, ensuring transparency and accountability in the recycling process.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
