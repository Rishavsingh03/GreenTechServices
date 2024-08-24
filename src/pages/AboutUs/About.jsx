// src/components/AboutUs.js
import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us-container">
      <section className="intro-section text-center py-5">
        <h1>About Us</h1>
        <p className="lead">
          Learn more about our mission, team, and the impact we aim to create.
        </p>
      </section>

      <section className="content-section py-5">
        <div className="container">
          <h2 className="mt-5 mb-4">Our Story</h2>
          <p>
            Our journey began with a simple idea: to make a positive impact on
            the world. Through hard work and a shared vision, we've grown into a
            leader in our industry.
          </p>

          <h2 className="mt-5 mb-4">Our Leadership Team</h2>
          <p>
            Our leadership team comprises experienced professionals who are
            passionate about making a difference and leading our company to new
            heights.
          </p>

          <h2 className="mt-5 mb-4">Diversity & Inclusion</h2>
          <p>
            We believe that a diverse and inclusive workplace is the key to
            success. We strive to create an environment where everyone feels
            valued and respected.
          </p>

          <h2 className="mt-5 mb-4">Careers</h2>
          <p>
            Looking for an exciting career opportunity? Join our team and help
            us shape the future!
          </p>

          <h2 className="mt-5 mb-4">The Environmental Impact of E-Waste</h2>
          <p>
            E-waste has significant environmental consequences. It's crucial to
            address these issues to protect our planet.
          </p>

          <div className="e-waste-impact mt-5">
            <h3 className="text-primary mb-4">
              Addressing the Consequences of Improper E-Waste Disposal
            </h3>
            <p>
              <strong>Toxic Pollution Hazard:</strong> Improper e-waste disposal
              releases hazardous materials like lead and mercury, polluting soil
              and water sources.
            </p>
            <p>
              <strong>Greenhouse Gas Emissions:</strong> E-waste contributes to
              greenhouse gas emissions, exacerbating climate change and global
              warming.
            </p>
            <p>
              <strong>Resource Waste Concerns:</strong> Valuable recoverable
              materials in e-waste, worth $57 billion in 2019, are largely
              un-recycled, leading to resource depletion.
            </p>
          </div>

          <div className="e-waste-challenges mt-5">
            <h3 className="text-primary mb-4">
              Challenges in E-Waste Management
            </h3>
            <p>
              <strong>Low Recycling Rates:</strong> Merely 1% of e-waste is
              recycled in India, highlighting the urgent need for improved
              recycling infrastructure and awareness.
            </p>
            <p>
              <strong>Inadequate Policies and Enforcement:</strong> The absence
              of robust policies and enforcement mechanisms hinders proper
              e-waste management, necessitating stricter regulations and
              compliance monitoring.
            </p>
            <p>
              <strong>Infrastructure Gaps and Undocumented Disposal:</strong>{" "}
              Lack of proper infrastructure results in unrecorded disposal
              practices, emphasizing the importance of building efficient
              collection and recycling facilities.
            </p>
            <p>
              <strong>Health Risks for Informal Recycling Workers:</strong>{" "}
              Workers in informal e-waste recycling sectors face severe health
              hazards due to improper handling, emphasizing the need for
              occupational safety measures and formalized recycling processes.
            </p>
          </div>

          <div className="e-waste-success mt-5">
            <h3 className="text-primary mb-4">
              Success Stories in E-Waste Management
            </h3>
            <p>
              <strong>Taiwan's Remarkable Recycling Rate:</strong> Taiwan leads
              with a recycling rate of nearly 90% for e-waste, showcasing a
              highly effective system.
            </p>
            <p>
              <strong>Apple's Daisy Robotic Technology:</strong> Apple's Daisy
              robot technology revolutionizes e-waste recycling, demonstrating
              innovation and sustainability.
            </p>
            <p>
              <strong>Basel Convention Collaborations:</strong> International
              collaborations under the Basel Convention are enhancing global
              e-waste management practices through shared expertise and
              resources.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
