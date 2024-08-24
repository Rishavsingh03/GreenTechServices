import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRecycle, FaHome, FaBuilding, FaLeaf } from 'react-icons/fa';

function Home() {
  const gradientBg = 'linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)';
  
  return (
    <div style={{ background: gradientBg, minHeight: '100vh', color: '#ffffff' }}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero d-flex align-items-center justify-content-center text-center"
        style={{ height: '100vh', padding: '2rem' }}
      >
        <div>
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="display-2 fw-bold mb-4"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Revolutionizing E-Waste Management
          </motion.h1>
          <motion.p
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
            className="lead mb-4"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            Join us in creating a sustainable future through innovative e-waste solutions.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/about" className="btn btn-light btn-lg me-3">Learn More</Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">Contact Us</Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="services py-5" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div className="container">
          <h2 className="text-center mb-5 display-4 fw-bold">Our Services</h2>
          <div className="row g-4">
            {[
              { icon: FaHome, title: 'Residential Collection', description: 'Eco-friendly recycling for households' },
              { icon: FaBuilding, title: 'Commercial Collection', description: 'Tailored solutions for businesses' },
              { icon: FaRecycle, title: 'Recycling Process', description: 'State-of-the-art e-waste processing' },
              { icon: FaLeaf, title: 'Environmental Impact', description: 'Reducing carbon footprint' }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="col-md-6 col-lg-3"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                  <div className="card-body text-center">
                    <service.icon size={50} className="mb-3" />
                    <h3 className="card-title h4 mb-3">{service.title}</h3>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta text-center py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="display-4 mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">Schedule your e-waste collection today and contribute to a cleaner tomorrow.</p>
          <Link to="/slotbooking" className="btn btn-light btn-lg">Schedule Collection</Link>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        className="contact py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 shadow" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <div className="card-body p-5">
                  <h3 className="card-title text-center mb-4">Get in Touch</h3>
                  <form>
                    {['Name', 'Email', 'Message'].map((field) => (
                      <div key={field} className="mb-3">
                        <label htmlFor={field.toLowerCase()} className="form-label">{field}</label>
                        {field !== 'Message' ? (
                          <input type={field === 'Email' ? 'email' : 'text'} className="form-control" id={field.toLowerCase()} placeholder={`Enter your ${field.toLowerCase()}`} />
                        ) : (
                          <textarea className="form-control" id="message" rows="4" placeholder="Your message"></textarea>
                        )}
                      </div>
                    ))}
                    <button type="submit" className="btn btn-light w-100">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;