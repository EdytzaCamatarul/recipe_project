import React, { useEffect, useState } from 'react'
import '../../App.css'
import LoginForm from '../LoginForm'
import Footer from '../Footer';

function Login () {


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
            <LoginForm />
            {windowWidth <= 960 ? <Footer/> : null}
        </>
    );
}

export default Login;