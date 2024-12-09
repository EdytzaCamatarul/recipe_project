import React, { useEffect, useState } from 'react'
import '../../App.css'
import ResetPasswordForm from '../ResetPasswordForm'
import Footer from '../Footer';

function ResetPassword () {

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
            <ResetPasswordForm />
            {windowWidth <= 960 ? <Footer/> : null}
        </>
    );
}

export default ResetPassword;