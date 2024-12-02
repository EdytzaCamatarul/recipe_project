import React from 'react'
import '../../App.css'
import Hero from '../Hero'
import Cards from '../Cards';
import ContactForm from '../ContactForm';
import Footer from '../Footer';
import logo from '../../assets/images/logo.png'

function Home () {
    return(
        <>
            <Hero src = {logo}/>
            <Cards />
            <ContactForm />
            <Footer />
        </>
    );
}

export default Home;