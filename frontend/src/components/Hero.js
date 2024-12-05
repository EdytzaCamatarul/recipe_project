import React from 'react';
import '../App.css'
import './Hero.css'

function Hero(props) {
  return (
    <div className='hero-container'>
      <h1> <img src={props.src} alt="Logo" /> </h1>
    </div>
  )
}

export default Hero;
