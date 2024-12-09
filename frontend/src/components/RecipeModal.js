import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button'; 
import './RecipeModal.css';
import StarRating from './StarRating';


const RecipeModal = ({ recipeId, closeModal }) => {
    const [recipe, setRecipe] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logged, setLogged] = useState(false); {/* needs fix */}

    useEffect(() => {
        if (recipeId) {
            axios
                .get(`http://localhost:8081/recipes/${recipeId}`)
                .then((res) => {
                    setRecipe(res.data);
                })
                .catch((err) => console.error(err));
        }
    }, [recipeId]);

    if (!recipe) return null;

    const token = localStorage.getItem('token');

    const handleStarClick = (star) => {
        setUserRating(star);
    };

    const handleSubmitRating = () => {
        if(!token) {
            setLogged(true);
            return;
        }
        if (userRating < 1 || userRating > 5) {
            return;
        }
        
        setIsSubmitting(true);
       
        axios
            .post(`http://localhost:8081/recipes/${recipeId}/rate`, { rating: userRating }, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
            
                setRecipe((prevRecipe) => ({
                    ...prevRecipe,
                    rating: res.data.updatedRating,
                    nr_rating: res.data.totalRatings,
                }));
                setUserRating(0);
            })
            .catch((err) => {
                console.error('Failed to submit rating:', err);
              
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    
    };

    const handleRemoveRecipe = () => {
        if(!token) {
            setLogged(true);
            return;
        }


        setLogged(false);
        axios.delete(`http://localhost:8081/recipes/${recipeId}`, {
            
            headers: { Authorization: `Bearer ${token}` },
            data: {photo: recipe.photo}
            })
        .then(() => {
            console.log('Deleted successfully');
        })
        .catch((err) => {
            console.error('Failed to delete: ', err);
            console.log(recipeId);
        });

        window.location.reload();
    }

    return (
        <div className="recipe-modal-overlay">
            <div className="recipe-modal">
                <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    onClick={closeModal}
                    align="right"
                >
                    X
                </Button>
                <div className="recipe-header">
                    <img
                        src={`/uploads/${recipe.photo}`}
                        alt={recipe.name}
                        className="recipe-image"
                    />
                    <div className="recipe-details">
                        <h2 className="recipe-title">{recipe.name}</h2>
                        <StarRating rating={recipe.rating} centered={'-noncentered'} />
                        <div className="recipe-author">
                            Nr. ratinguri: {recipe.nr_rating ? recipe.nr_rating : 0}
                            <br />
                            Author: <h2>{recipe.author}</h2>
                            <p> ‎ </p>
                            {recipe.author_email === localStorage.getItem('email') ? <Button onClick={() => handleRemoveRecipe()} buttonStyle='btn--red' > Delete </Button> : null}
                        </div>
                    </div>
                    <div className="rate-section">
                        <h3>Rate this recipe</h3>
                        <div className="rate-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`user_star${userRating >= star ? '_selected' : ''}`}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}

                        </div>
                        <Button
                            buttonStyle="btn--green"
                            buttonSize="btn--medium"
                            onClick={handleSubmitRating}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        {logged && <p style={{color:'red'}}>Trebuei sa fii logat</p>}
                       
                    </div>
                </div>
                <div className="recipe-description">
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
