import React, { useEffect, useState } from 'react'
import '../../App.css'
import RecipeForm from '../RecipeForm'
import Footer from '../Footer';




function AddRecipe () {

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
            <RecipeForm />
            {windowWidth <= 960 ? <Footer/> : null}
            
        </>
    );
}

export default AddRecipe;