import React from 'react';
import { Link } from 'react-router-dom';
import homeimg from './homeimg.jpg';
import circular from './circular-economy.png'
function Home() {
  return (
    <div
      className="text-white"
      style={{ height: '100%', width: '100%', backgroundColor: '#001f3f' }}
    >
      {/* Landing Section */}
      <div
        className="d-flex flex-row justify-content-center align-items-center text-center"
        style={{ height: '100vh', backgroundColor: '#001f3f' }}
      >
        <div className="w-50">
          <h1 className="display-4 mx-3">
            Optimizing E-waste Management Strategies for Environmental and
            Economic Benefits
          </h1>
        </div>
        <div className="w-50">
          <img className="w-100" src={homeimg} alt="E-waste Management" />
        </div>
      </div>

      {/* Dustbin Section */}
      <div className="container d-flex my-5 justify-content-center align-items-center">
        <div className="row">
          {/* Residential Collection */}
          <div className="col-md-6 mb-4">
            <div
              className="card text-center shadow"
              style={{height:'328px',width:'400px',color:"#f1f0f3" ,backgroundColor: 'transparent'}}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold display-6">
                  Residential Collection
                </h5>
                <p>
                  For households looking to dispose of small quantities of
                  e-waste, our residential collection ensures safe and
                  eco-friendly recycling.
                </p>
                <Link
                  to="/slotbooking"
                  className="btn btn-primary"
                  style={{ transition: 'background-color 0.3s, color 0.3s' }}
                >
                  Book Slot
                </Link>
              </div>
            </div>
          </div>
          {/* Commercial Collection */}
          <div className="col-md-6 mb-4">
            <div
              className="card text-center shadow"
              style={{height:'328px',width:'400px',color:"#f1f0f3" ,backgroundColor: 'transparent'}}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold display-6">
                  Commercial Collection
                </h5>
                <p>
                  Ideal for businesses with large quantities of e-waste,
                  providing tailored solutions for efficient waste management.
                </p>
                <Link
                  to="/slotbooking"
                  className="btn btn-primary"
                  style={{ transition: 'background-color 0.3s, color 0.3s' }}
                >
                  Book Slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Recycling Importance Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={circular}
              alt="Recycling Importance"
              className="img-fluid mb-3 rounded shadow"
              style={{ height: '500px', width: '100%' }}
            />
          </div>
          <div className="col-md-6 text-center">
            <h3 className="mb-3" style={{ fontSize: '2rem' }}>
              Importance of Recycling
            </h3>
            <p style={{ fontSize: '1.2rem' }}>
              E-waste management is crucial for protecting our environment and
              ensuring public health. Proper disposal and recycling of electronic
              waste prevent harmful substances, such as lead and mercury, from
              polluting our soil and water. By reclaiming valuable materials like
              gold, silver, and copper, we can reduce the need for mining, which
              decreases energy consumption and conserves natural resources. Effective
              e-waste management also supports economic growth by creating jobs in
              the recycling and refurbishing industries. Additionally, it encourages
              the development of more sustainable and eco-friendly technologies.
            </p>
            <Link
              to="/about"
              className="btn btn-primary"
              style={{ transition: 'background-color 0.3s, color 0.3s' }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
   {/* Contact Us Form */}
<div className="container my-5">
  <div className="row ">
    <div className="col-md-8 mx-auto">
      <h3 className="text-center mb-4">Contact Us</h3>
      <form className="p-4 rounded shadow text-white mb-5">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control text-white"
            id="name"
            placeholder="Enter your name"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#00509e',
              color: 'white',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00509e';
              e.target.style.borderColor = '#003d66';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#00509e';
            }}
          />
          <style>
            {`
              #name::placeholder {
                color: white;
              }
            `}
          </style>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control text-white"
            id="email"
            placeholder="Enter your email"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#00509e',
              color: 'white',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00509e';
              e.target.style.borderColor = '#003d66';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#00509e';
            }}
          />
          <style>
            {`
              #email::placeholder {
                color: white;
              }
            `}
          </style>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control text-white"
            id="message"
            rows="3"
            placeholder="Your message"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#00509e',
              color: 'white',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00509e';
              e.target.style.borderColor = '#003d66';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#00509e';
            }}
          ></textarea>
          <style>
            {`
              #message::placeholder {
                color: white;
              }
            `}
          </style>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-3"
          style={{ width: '100%' }}
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</div>

</div>
  );
}

export default Home;
