import React, { useState } from 'react';
import '../App.css'
import './RegistrationForm.css'
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm , setConfirm] = useState('');

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if(password != confirm) { setError(true); return;}
        axios.put('http://localhost:8081/users', {name, phone, email, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        setError(false);
        navigate('/login');
    }

  return (
    <div className='register-container'>
        <form onSubmit={handleSubmit}>
            <h1>Hai, fă foamea cu noi!</h1>
        <div className="input-group full-name">
            <input type="text" placeholder="Full name"
             onChange={e => setName(e.target.value)}/>
        </div>
        <div className="input-group telephone">
            <input type="tel" placeholder="Telephone"
             onChange={e => setPhone(e.target.value)}/>
        </div>
        <div className="input-group email">
            <input type="email" placeholder="E-mail"
             onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="input-group password">
            <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="input-group password">
            <input type="password" placeholder="Confirm Password"
             onChange={e => setConfirm(e.target.value)}/>
        </div>
        {error && <p> lmao ai gresit lol</p>}
            <Button buttonStyle='btn--green' align='center' buttonSize='btn--large'> Register </Button>
            <a href='/login'> Ai deja un cont? Logheaza-te</a>
        </form>
    </div>
  )
}

export default RegistrationForm;
