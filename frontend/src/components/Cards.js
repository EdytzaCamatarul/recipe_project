import React, { useState, useEffect } from 'react';
import './Cards.css';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

function Cards() {
    const [topRatedRecipes, setTopRatedRecipes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 960);

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

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 960);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedRecipes.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + topRatedRecipes.length) % topRatedRecipes.length
        );
    };

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
                    {topRatedRecipes.length > 0 && (
                        isMobileView ? (
                            // Mobile view
                            <div className="cards__navigation">
                                <button className="cards__arrow cards__arrow--left" onClick={prevCard}>
                                    &#8249;
                                </button>
                                <div className="cards__content" onClick={() => openModal(topRatedRecipes[currentIndex].id)}>
                                    <RecipeCard
                                        id={topRatedRecipes[currentIndex].id}
                                        name={topRatedRecipes[currentIndex].name}
                                        image={`/uploads/${topRatedRecipes[currentIndex].photo}`}
                                        author={topRatedRecipes[currentIndex].author}
                                        rating={topRatedRecipes[currentIndex].rating}
                                        ratingNo={topRatedRecipes[currentIndex].nr_rating}
                                    />
                                </div>
                                <button className="cards__arrow cards__arrow--right" onClick={nextCard}>
                                    &#8250;
                                </button>
                            </div>
                        ) : (
                            // Desktop view
                            <ul className="cards__items">
                                {topRatedRecipes.map((recipe) => (
                                    <div key={recipe.id} onClick={() => openModal(recipe.id)}>
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
                        )
                    )}
                </div>
            </div>
            {selectedRecipeId && <RecipeModal recipeId={selectedRecipeId} closeModal={closeModal} />}
        </div>
    );
}

export default Cards;
