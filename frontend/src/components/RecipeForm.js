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


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };


    const handleUpload = () => {
    
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
       

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const authorName = decodedToken.name; 
                console.log(authorName);
                formData.append('author', authorName);
            } catch (error) {
                console.log("Error decoding token:", error);
                return;
            }

            axios.post('http://localhost:8081/recipes', formData,{
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => {
                if(res.data.Status === "Succes"){
                    console.log("Succes");
                }
                else{
                    console.log("Failed");
                }
            })
            .catch(err => console.log(err)); 
        }
        else {
            console.log("No token found. Please log in.");
        }
    }
    


    return (
        <div className='register-container'>
            <form >
                <h1>Add recipe</h1>
                
                <div className="input-group">
                    <input type="text" placeholder="Recipe name" 
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Description" 
                        onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="input-group">
                    <input type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </div>
                <Button buttonStyle='btn--green' align='center' buttonSize='btn--large' onClick={handleUpload} type='button'> Add Recipe </Button>
            
            </form>
            
        </div>
    );
}

export default RecipeForm;
