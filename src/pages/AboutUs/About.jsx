import React from "react";
import { motion } from 'framer-motion';

const About = () => {
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)',
    color: 'white',
    padding: '50px 20px',
  };

  const sectionStyle = {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '30px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  };

  const subHeadingStyle = {
    fontSize: '2rem',
    marginBottom: '15px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageStyle}
    >
      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={sectionStyle}
      >
        <h1 style={headingStyle}>About Us</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
          We're on a mission to tackle the growing e-waste crisis in India through a sustainable and transparent platform that connects customers with licensed vendors.
        </p>
      </motion.section>

      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
        style={sectionStyle}
      >
        <h2 style={subHeadingStyle}>Our Story</h2>
        <p>
          Our journey began with a vision to revolutionize e-waste management in India. With over 3.2 million metric tons of e-waste generated annually, the improper handling of electronic waste poses severe environmental and health risks. Our platform was created to address these issues by connecting customers with licensed vendors, ensuring that e-waste is recycled responsibly.
        </p>
      </motion.section>

      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        style={sectionStyle}
      >
        <h2 style={subHeadingStyle}>E-Waste in India: The Growing Concern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { title: "India's E-Waste Growth", content: "India generates over 1.6 million metric tons of e-waste each year, making it the fifth-largest e-waste generator globally." },
            { title: "Low Recycling Rate", content: "Only 35% of India's e-waste is processed through formal recycling channels, leaving a significant portion unmanaged." },
            { title: "Health and Environmental Risks", content: "Improper disposal of e-waste can lead to the release of hazardous materials, causing severe health issues for communities." },
            { title: "Informal Sector Challenges", content: "Over 95% of e-waste in India is handled by informal recyclers, who often lack the necessary safety measures." }
          ].map((fact, index) => (
            <motion.div 
              key={index}
              style={cardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ marginBottom: '10px' }}>{fact.title}</h3>
              <p>{fact.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        style={sectionStyle}
      >
        <h2 style={subHeadingStyle}>The Importance of Recycling Electronics Waste</h2>
        <p>
          Recycling e-waste is crucial for several reasons. Electronics contain valuable materials such as gold, silver, copper, and rare earth elements, which can be recovered and reused. Proper recycling ensures that these resources are not wasted and prevents toxic substances from contaminating the environment.
        </p>
        <p>
          Through proper recycling, we reduce the demand for new raw materials, conserve energy, and minimize the carbon footprint associated with the manufacturing of new electronic devices.
        </p>
      </motion.section>

      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
        style={sectionStyle}
      >
        <h2 style={subHeadingStyle}>Impact of Our Platform</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { title: "Environmental Impact", content: "Our platform has helped divert thousands of tons of e-waste from landfills, reducing pollution and conserving valuable resources." },
            { title: "Empowering Vendors", content: "We empower local vendors by providing them with a steady stream of e-waste for collection and recycling." },
            { title: "Promoting Safe Practices", content: "By working with licensed vendors, our platform ensures that the recycling process adheres to strict safety standards." },
            { title: "Technological Innovation", content: "Our platform leverages machine learning models to predict the price of waste materials, optimizing the value assessment process." }
          ].map((impact, index) => (
            <motion.div 
              key={index}
              style={cardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ marginBottom: '10px' }}>{impact.title}</h3>
              <p>{impact.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
        style={sectionStyle}
      >
        <h2 style={subHeadingStyle}>How Our Platform Works</h2>
        <p>
          Our platform connects customers with licensed vendors who collect their e-waste. The waste is then sent to certified recycling facilities, where it undergoes a series of processes, including sorting, shredding, and material recovery.
        </p>
        <p>
          A key feature of our platform is the integration of machine learning models that predict the price of waste materials based on current market trends, material composition, and condition. This ensures that customers receive fair compensation while vendors can optimize their profits.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default About;