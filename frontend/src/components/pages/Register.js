import React, { useEffect, useState } from 'react'
import '../../App.css'
import RegistrationForm from '../RegistrationForm'
import Footer from '../Footer';


function Register () {

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
            <RegistrationForm />
            {windowWidth <= 960 ? <Footer/> : null}
        </>
    );
}

export default Register;