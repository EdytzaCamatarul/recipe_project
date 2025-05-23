import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaYoutube, FaTwitch } from 'react-icons/fa';





const Footer = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 
  

  return (
    <footer className="footer-container">
      {window.outerWidth}

      {window.innerWidth > 960 ?
        <svg
          className="wave-svg"
          viewBox="0 0 1920 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2068.33 210L2017.73 195.809C1967.14 181.617 1865.95 153.234 1764.76 139.043C1663.57 124.851 1562.38 124.851 1461.19 101.199C1360 77.5466 1258.81 30.2418 1157.62 11.3198C1056.43 -7.60209 955.237 1.85887 904.642 6.58935L854.047 11.3198V210H904.642C955.237 210 1056.43 210 1157.62 210C1258.81 210 1360 210 1461.19 210C1562.38 210 1663.57 210 1764.76 210C1865.95 210 1967.14 210 2017.73 210H2068.33Z"
            fill="#00236D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-149 210L-94.5576 195.809C-40.1152 181.617 68.7696 153.234 177.654 139.043C286.539 124.851 395.424 124.851 504.309 101.199C613.194 77.5466 722.078 30.2418 830.963 11.3198C939.848 -7.60209 1048.73 1.85887 1103.18 6.58935L1157.62 11.3198V210H1103.18C1048.73 210 939.848 210 830.963 210C722.078 210 613.194 210 504.309 210C395.424 210 286.539 210 177.654 210C68.7696 210 -40.1152 210 -94.5576 210H-149Z"
            fill="#00236D"
          />
        </svg> :
        <svg
          className='wave-svg'
          viewBox="0 0 385 91"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 6.72242L16.0417 3.91316C32.0833 1.10391 64.1667 -4.51459 96.25 6.72242C128.333 17.9594 160.417 46.052 192.5 51.6705C224.583 57.289 256.667 40.4334 288.75 32.0057C320.833 23.5779 352.917 23.5779 368.958 23.5779H385V91H368.958C352.917 91 320.833 91 288.75 91C256.667 91 224.583 91 192.5 91C160.417 91 128.333 91 96.25 91C64.1667 91 32.0833 91 16.0417 91H0V6.72242Z" fill="#00236D" />
        </svg>
      }

      <div className="footer-icons">
        <a href="#" className="footer-icon">
          <FaInstagram />
        </a>
        <a href="#" className="footer-icon">
          <FaFacebook />
        </a>
        <a href="#" className="footer-icon">
          <FaYoutube />
        </a>
        <a href="#" className="footer-icon">
          <FaTwitch />
        </a>
      </div>

    </footer>
  );
};

export default Footer;
