import React, { useRef, useState } from 'react';
import './ContactForm.css';
import { Button } from './Button';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const form = useRef(); 

  const sendEmail = (e) => {
    e.preventDefault();
    // add EmailJS tokens for form to work properly
    const serviceKey = '';
    const templateKey = '';
    const publicKey = '';

    const templateParams = {
      from_firstName: firstName,
      from_lastName: lastName,
      from_email: email,
      message: message,
      to_name: 'Patroane',
    };

    
    emailjs
      .sendForm(serviceKey, templateKey, form.current, publicKey)
      .then(
        () => {
          console.log('SUCCESS!');
          window.location.reload();
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <div className="contact-form-container">
      <h2>Contact us</h2>
      <form className="contact-form" onSubmit={sendEmail} ref={form}>
        <div className="form-left">
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"  
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"   
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"   
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-right">
          <textarea
            placeholder="Message"
            name="message"  
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <p> ‎ </p>
          <Button buttonStyle="btn--green" align="right">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
