

import React, { useState } from 'react';

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send the data to an API or email)
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-us">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have a question, suggestion, or concern, feel free to get in touch with us.
          Our team is always ready to help you with anything related to your orders, delivery, or food preferences.
        </p>
        <h3>Our Address</h3>
        <p>
          Delicious Delivery HQ<br />
          123 Food Street, Flavor Town, USA
        </p>
        <h3>Get In Touch</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
      <div className="contact-image">
        <img src="contactus.jpg" alt="Contact Us" />
      </div>
    </section>
  );
};

export default Contactus;
