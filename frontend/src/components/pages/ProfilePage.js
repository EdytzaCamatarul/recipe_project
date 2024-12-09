import React, { useEffect, useState } from 'react'
import '../../App.css'
import Profile from '../Profile'
import Footer from '../Footer';

function ProfilePage() {

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
            <Profile />
              {windowWidth <= 960 ? <Footer/> : null}
        </>
        
    );
}

export default ProfilePage;