import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

export default function About() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Youssef Adel",
      role: "Frontend Developer",
      icon: "fa-laptop-code"
    },
    {
      name: "Mohamed Hofny",
      role: "Frontend Developer", 
      icon: "fa-code"
    },
    {
      name: "Amr Sayed",
      role: "Frontend Developer",
      icon: "fa-server"
    },
    {
      name: "Tarek Azmy",
      role: "Frontend Developer",
      icon: "fa-palette"
    },
    {
      name: "Ahmed Mohamed",
      role: "Frontend Developer",
      icon: "fa-tasks"
    },
    {
      name: "Amr Tamer",
      role: "Frontend Developer",
      icon: "fa-cloud"
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero-section vh-100">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              Our Story, <span className="highlight">Your Style</span>
            </h1>
            <p className="about-hero-subtitle">
              At E-commerce Storefront, we believe shopping should be an
              experience. Discover our journey from a passion project to a curated
              collection of premium products crafted with care and designed for
              you.
            </p>
            <div className="about-hero-buttons">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/shop')}
              >
                <i className="fas fa-shopping-bag me-2"></i>
                Start Shopping
              </button>
              
            </div>
          </div>
        </div>
      </section>
      <section className="mission-vision-section py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 className="mission-title">Our Mission</h3>
                <p className="mission-text">
                  Our mission is to empower individuals to express their unique style
                  through thoughtfully curated products. We are committed to sourcing
                  high-quality, sustainable goods that bring joy and value to everyday
                  life, fostering a community built on shared appreciation for
                  craftsmanship and design.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="vision-card">
                <div className="vision-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3 className="vision-title">Our Vision</h3>
                <p className="vision-text">
                  To become the most trusted online destination for quality products 
                  that inspire and enhance everyday life. We envision a world where 
                  everyone can easily discover products that reflect their personality 
                  and values, delivered with exceptional customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="values-section py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="value-card text-center">
                <div className="value-icon">
                  <i className="fas fa-gem"></i>
                </div>
                <h5>Quality First</h5>
                <p>We never compromise on quality. Every product is carefully selected and tested.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card text-center">
                <div className="value-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h5>Customer Focus</h5>
                <p>Your satisfaction is our priority. We listen, adapt, and exceed expectations.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card text-center">
                <div className="value-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <h5>Sustainability</h5>
                <p>We're committed to eco-friendly practices and sustainable product sourcing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The talented people behind your shopping experience</p>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-2">
                <div className="team-member-card">
                  <div className="member-avatar">
                    <i className={`fas ${member.icon}`}></i>
                  </div>
                  <div className="member-info">
                    <h6 className="member-name">{member.name}</h6>
                    <p className="member-role">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="location-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Visit Our Location</h2>
            <p className="section-subtitle">Come see us in person</p>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="map-container">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55805.67127045303!2d31.143184215817445!3d29.050885762058343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a25e1064f72af%3A0xbacfa92a1eed60ea!2z2KjZhtmKINiz2YjZitmB2Iwg2YLYs9mFINio2YbZiiDYs9mI2YrZgdiMINmF2LHZg9iyINio2YbZiSDYs9mI2YrZgdiMINmF2K3Yp9mB2LjYqSDYqNmG2Yog2LPZiNmK2YE!5e0!3m2!1sar!2seg!4v1762374325229!5m2!1sar!2seg"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: "15px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}