import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Cards.css';
import RecipeCard from '../RecipeCard';
import RecipeModal from '../RecipeModal';
import '../SearchBar.css'

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
        return 5; 
    } else if (width >= 1400) {
        return 4; 
    } else if (width >= 1000) {
        return 3; 
    } else if (width >= 700) {
        return 2;
    } else {
        return 1;
    }
}

function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [chunkedRecipes, setChunkedRecipes] = useState([]);
    const [chunkSize, setChunkSize] = useState(getChunkSize());
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState(0);
    const [sortOption, setSortOption] = useState('');

    const openModal = (id) => {
        setSelectedRecipeId(id);
    };

    const closeModal = () => {
        setSelectedRecipeId(null);
    };

    useEffect(() => {
        axios.get('http://localhost:8081/recipes')
            .then(response => {
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, []);

    useEffect(() => {
        const filterAndSortRecipes = () => {
            let result = [...recipes];

            // Search
            if (searchQuery) {
                result = result.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    recipe.author.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Filter
            if (ratingFilter > 0) {
                result = result.filter(recipe => recipe.rating >= ratingFilter);
            }

            // Sort
            if (sortOption === 'topRated') {
                result.sort((a, b) => b.rating - a.rating);
            } else if (sortOption === 'lowestRated') {
                result.sort((a, b) => a.rating - b.rating);
            } else if (sortOption === 'mostRatings') {
                result.sort((a, b) => b.nr_rating - a.nr_rating);
            } else if (sortOption === 'leastRatings') {
                result.sort((a, b) => a.nr_rating - b.nr_rating);
            }

            setFilteredRecipes(result);
        };

        filterAndSortRecipes();
    }, [searchQuery, ratingFilter, sortOption, recipes]);


    useEffect(() => {
        setChunkedRecipes(chunkArray(filteredRecipes, chunkSize));
    }, [filteredRecipes, chunkSize]);

    useEffect(() => {
        const handleResize = () => {
            setChunkSize(getChunkSize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="cards__background">
            <h1>All Recipes</h1>

            <div className="filter-bar">
                <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Search by name or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
            </div>
            <div className="filter-bar">
                <select className='dropdown-button'
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(Number(e.target.value))}
                >
                    <option value={0}>All Ratings</option>
                    <option value={1}>1+ Stars</option>
                    <option value={2}>2+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                </select>
                <select className='dropdown-button'
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="topRated">Top Rated</option>
                    <option value="lowestRated">Lowest Rated</option>
                    <option value="mostRatings">Most Ratings</option>
                    <option value="leastRatings">Least Ratings</option>
                </select>
            </div>

            <div className="cards__container">
                {chunkedRecipes.length > 0 ? (
                    chunkedRecipes.map((chunk, index) => (
                        <ul key={index} className="cards__items">
                            {chunk.map((recipe, idx) => (
                                <div onClick={() => openModal(recipe.id)} key={idx}>
                                    <RecipeCard
                                        id={recipe.id}
                                        name={recipe.name}
                                        image={`/uploads/${recipe.photo}`}
                                        author={recipe.author}
                                        rating={recipe.rating}
                                        ratingNo={recipe.nr_rating}
                                        author_email = {recipe.author_email}
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
