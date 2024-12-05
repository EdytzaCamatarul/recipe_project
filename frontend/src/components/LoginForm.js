import React, { useState } from "react";
import '../App.css';
import './RegistrationForm.css';
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/users', { email, password })
            .then(res => {
                console.log(res.data);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                    window.location.reload(); 
                } else {
                    setMessage(res.data.message || "Login failed");
                }
            })
            .catch(err => {
                console.error(err);
                setMessage("Login failed");
            });
    }

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit}>
                <h1>Logheaza-te, {"\n"}chiorăie mațele!</h1>
                {message && <p className="login-message">{message}</p>}
                <div className="input-group email">
                    <input type="email" placeholder="E-mail" 
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group password">
                    <input type="password" placeholder="Password" 
                        onChange={e => setPassword(e.target.value)} />
                </div>
                <Button buttonStyle='btn--green' align='center' buttonSize='btn--large'> Log in </Button>
                <a href='/register'>Nu ai cont? Hai sa facem unul</a> <br/>
                <a href='/forgot-password'> Ai uitat parola? </a>
            </form>
            
        </div>
    );
}

export default LoginForm;
