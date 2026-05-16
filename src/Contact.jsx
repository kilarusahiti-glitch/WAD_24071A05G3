import React, { useState } from "react";
import "./styles.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-left">
        <h2>Contact Us</h2>
        <p className="contact-sub">
          Have a question or need help? Fill out the form and we'll get back to you.
        </p>

        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📧</span>
            <span>support@tutly.com</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>Hyderabad, India</span>
          </div>
        </div>

        <div className="office-hours">
          <h4>Office Hours</h4>
          <p>Monday – Friday: 9 AM – 6 PM</p>
          <p>Saturday: 10 AM – 2 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      <div className="contact-right">
        {sent ? (
          <div className="success-msg">
            <p>✅ Your message has been sent!</p>
            <p>We'll reply within 24 hours.</p>
            <button onClick={() => setSent(false)} className="back-btn">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <h3>Send a Message</h3>

            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
