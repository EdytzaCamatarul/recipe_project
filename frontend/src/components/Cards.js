import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import './Cards.css';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

function Cards() {
    const [topRatedRecipes, setTopRatedRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/recipes') 
            .then((response) => response.json())
            .then((data) => {
                const topRecipes = data
                    .sort((a, b) => b.rating - a.rating) 
                    .slice(0, 3); 
                setTopRatedRecipes(topRecipes);
            })
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    const openModal = (id) => {
        setSelectedRecipeId(id);
    };

    const closeModal = () => {
        setSelectedRecipeId(null);
    };

    return (
        <div className='cards'>
            <h1>Top Rated Recipes</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                <ul className="cards__items">
                    {topRatedRecipes.map((recipe) => (
                       <div onClick={() => openModal(recipe.id)}>
                       <RecipeCard
                           id={recipe.id}
                           name={recipe.name}
                           image={`/uploads/${recipe.photo}`}
                           author={recipe.author}
                           rating={recipe.rating}
                           ratingNo={recipe.nr_rating}
                       />
                   </div>
                    ))}
                    </ul>
                </div>
            </div>
            {selectedRecipeId && <RecipeModal recipeId={selectedRecipeId} closeModal={closeModal} />}
        </div>
    );
}

export default Cards;
