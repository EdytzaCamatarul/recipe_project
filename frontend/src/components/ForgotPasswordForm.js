import React, { useState } from "react";
import '../App.css';
import './RegistrationForm.css';
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/forgot-password", { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error.response || error); // Log full error details
            setMessage(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password</h1>
                {message && <p className="login-message">{message}</p>}
                <div className="input-group email">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <Button buttonStyle="btn--green" align="center" buttonSize="btn--large">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;

