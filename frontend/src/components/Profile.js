import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.css'
import logo from '../assets/images/chef.png'
import { Button } from "./Button";
function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios
                .get("http://localhost:8081/users", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setProfile(res.data))
                .catch((err) => {
                    console.error(err);
                    alert("Failed to load profile data");
                });
        }
    }, []);


    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-box">
            <div className = 'box-left'><img src = {logo}></img>
            <p>{profile.name}</p>
            </div>
                <div className="box-right">
                <p>Email: {profile.email}</p>
                <p>Phone: {profile.phone}</p>
                <p>College group: {profile.phone}</p>
                </div>
            </div>
            <p> ‎ </p>
            <p> ‎ </p>
            <Button buttonStyle='btn--green' > Add Recipe </Button>
        </div>

        
    );
}

export default Profile;
