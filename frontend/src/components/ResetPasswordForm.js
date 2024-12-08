import React, { useState } from "react";
import '../App.css';
import './RegistrationForm.css';
import { Button } from './Button';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { token } = useParams(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/reset-password", {
                resetToken: token,
                newPassword,
            });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 3000); 
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                {message && <p className="login-message">{message}</p>}
                <div className="input-group password">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <Button buttonStyle="btn--green" align="center" buttonSize="btn--large">
                    Reset Password
                </Button>
            </form>
        </div>
    );
}

export default ResetPasswordForm;
