import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeModal.css';

const RecipeModal = ({ recipeId, closeModal }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (recipeId) {
            axios.get(`http://localhost:8081/recipes/${recipeId}`)
                .then(res => {
                    setRecipe(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [recipeId]);

    if (!recipe) return null;

    return (
        <div className="recipe-modal">
            <div className="recipe-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} />
                <p>{recipe.description}</p>
                <p><strong>Author:</strong> {recipe.author}</p>
            </div>
        </div>
    );
};

export default RecipeModal;
