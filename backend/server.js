const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "cheie"; 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

app.post('/users', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Login failed" });
        }
        if (data.length > 0) {
            // Generate JWT
            const token = jwt.sign({ email: req.body.email }, SECRET_KEY, { expiresIn: '7d' });
            return res.json({ message: "Login successful", token });
        }
        return res.status(401).json({ message: "Invalid email or password" });
    });
});

app.put('/users', (req, res) => {
    const sql = "INSERT INTO users (name, phone, email, password, recipes) VALUES (?, ?, ?, ?, '')";
    db.query(sql, [req.body.name, req.body.phone, req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to create user" });
        }
        return res.json({ message: "User created successfully" });
    });
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};

app.get("/users", authenticateToken, (req, res) => {
    const sql = "SELECT name, phone, email FROM users WHERE email = ?";
    db.query(sql, [req.user.email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch profile data" });
        }
        if (data.length > 0) {
            return res.json({ email: data[0].email, name: data[0].name, phone: data[0].phone });
        }
        return res.status(404).json({ message: "User not found" });
    });
});


const crypto = require('crypto');

const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itchefteam@gmail.com',
        pass: 'pipz eqld btbg goth'
    }
});

app.post('/forgot-password', (req, res) => {
    try{
    const email = req.body.email;
    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate a token
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    const sql = "UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?";
    db.query(sql, [resetToken, tokenExpiry, email], (err, result) => {
    if (err || result.affectedRows === 0) {
        return res.status(400).json({ error: "Email not found" });
    }

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: 'itchefteam@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).json({ error: "Failed to send email", details: err.message });
            }
            res.json({ message: "Password reset email sent successfully", info });
        });
    });
} catch (error) {
    console.error("Error in /forgot-password:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
});


app.post('/reset-password', (req, res) => {
    
    const { resetToken, newPassword } = req.body;
    const sql = "SELECT email FROM users WHERE reset_token = ? AND token_expiry > ?";
db.query(sql, [resetToken, Date.now()], (err, result) => {
    if (err || result.length === 0) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

        const email = result[0].email;
        const updateSql = "UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE email = ?";
        db.query(updateSql, [newPassword, email], (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to update password" });
            }
            return res.json({ message: "Password updated successfully" });
        });
    });
});



app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
