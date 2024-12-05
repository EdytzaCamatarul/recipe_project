import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Cards.css';
import RecipeCard from '../RecipeCard'
import RecipeModal from '../RecipeModal';


const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

function getChunkSize() {
    const width = window.innerWidth;

    if (width >= 1600) {
        return 5; // Large screens (desktop)
    } else if (width >= 1400) {
        return 4; // Medium screens (tablets)
    } else if (width >= 1000) {
        return 3; // Small screens (phones in landscape mode)
    } else if (width >= 700) {
        return 2; // Small screens (phones in landscape mode)
    } else {
        return 1; // Very small screens (phones in portrait mode)
    }
}


function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [chunkedRecipes, setChunkedRecipes] = useState([]);
    const [chunkSize, setChunkSize] = useState(getChunkSize());
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);


    const openModal = (id) => {
        console.log(id);
        setSelectedRecipeId(id);
    };

    const closeModal = () => {
        setSelectedRecipeId(null);
    };

    useEffect(() => {
        // Fetch recipes from the backend
        axios.get('http://localhost:8081/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, []);



    useEffect(() => {
        // Re-chunk recipes whenever chunk size or recipes change
        setChunkedRecipes(chunkArray(recipes, chunkSize));
    }, [recipes, chunkSize]);

    useEffect(() => {
        // Listen for window resize events and adjust chunk size
        const handleResize = () => {
            setChunkSize(getChunkSize());
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className="cards">
            <h1>All Recipes</h1>
            <div className="cards__container">
                {chunkedRecipes.length > 0 ? (
                    chunkedRecipes.map((chunk, index) => (
                        <ul key={index} className="cards__items">
                            {chunk.map((recipe, idx) => (
                                <div onClick={() => openModal(recipe.id)} key={idx}>
                                    <RecipeCard
                                        id={recipe.id}
                                        name={recipe.name}
                                        description={recipe.description}
                                        image={`/uploads/${recipe.photo}`}
                                        author={recipe.author}
                                    />
                                </div>

                            ))}
                        </ul>
                    ))
                ) : (
                    <p>Loading recipes...</p>
                )}
            </div>

            {selectedRecipeId && <RecipeModal recipeId={selectedRecipeId} closeModal={closeModal} />}
        </div>
    );

}

export default RecipesPage;
