import React, { useEffect, useState } from 'react'
import '../../App.css'
import ForgotPasswordForm from '../ForgotPasswordForm'
import Footer from '../Footer';

function ForgotPassword () {

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

        return(
        <>
            <ForgotPasswordForm />
            {windowWidth <= 960 ? <Footer/> : null}
        </>
    );
}

export default ForgotPassword;