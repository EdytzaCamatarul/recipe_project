import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
        {/*Nu arata cum trebuie. Foloseste SVG Bezier (maybe)*/}
      <div className="footer-icons">
        <a href="#" className="footer-icon">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="footer-icon">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="footer-icon">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="#" className="footer-icon">
          <i className="fab fa-twitch"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
