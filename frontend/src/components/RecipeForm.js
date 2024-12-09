import React, { useState } from "react";
import '../App.css';
import './RegistrationForm.css';
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RecipeForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [emptyForm, setEmptyForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [succes, setSucces] = useState(false);

    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleUpload = () => {
        if (isSubmitting) return; // Prevent duplicate submissions

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        if (name === '' || description === '' || image === null) {
            setEmptyForm(true);
            return;
        }

        setEmptyForm(false);
        setIsSubmitting(true);

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const authorName = decodedToken.name;
                console.log(authorName);
                formData.append('author', authorName);
            } catch (error) {
                console.log("Error decoding token:", error);
                setIsSubmitting(false);
                return;
            }

            axios.post('http://localhost:8081/recipes', formData, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (res.data.Status === "Succes") {
                        console.log("Success");
                        setSucces(true);

                    } else {
                        console.log("Failed");
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsSubmitting(false);
                });

            axios.put('http://localhost:8081/users/increment', {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (res.data.Status === "Succes") {
                        console.log("Success");

                    } else {
                        console.log("Failed");
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsSubmitting(false);
                });

            setTimeout(() => {
                navigate("/recipes");
                window.location.reload();
            }, 1000);
        } else {
            console.log("No token found. Please log in.");
            setIsSubmitting(false);
        }
    };

    const descriptionLimit = 3000;
    const nameLimit = 40;

    const handleDescriptionChange = (e) => {
        const value = e.target.value;

        if (value.length <= descriptionLimit) {
            setDescription(value);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;

        if (value.length <= nameLimit) {
            setName(value);
        }
    };

    return (
        <div className='register-container'>
            <form>
                <h1>Add recipe</h1>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Recipe name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                {name.length}/{nameLimit}
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <div className="char-counter">
                        {description.length}/{descriptionLimit}
                    </div>
                </div>

                <div className="input-group">
                    <input type="file" id="file-input" 
                    className="file-input" accept="image/*"
                    onChange={handleImageChange}/>
                    <label htmlFor="file-input" className="upload-label" >
                        Upload
                    </label>
                </div>
                {emptyForm && <p>Numele, descrierea și imaginea nu pot fi goale</p>}
                {succes && <p style={{ color: 'green' }}>Adăugat cu succes </p>}
                <Button
                    buttonStyle='btn--green'
                    align='center'
                    buttonSize='btn--large'
                    onClick={handleUpload}
                    type='button'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding...' : 'Add Recipe'}
                </Button>

            </form>
        </div>
    );
}

export default RecipeForm;
