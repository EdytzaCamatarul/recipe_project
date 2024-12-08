import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function RecipeCard({ name, image, author, rating, ratingNo }) {
    return (

        <li className="cards__item">
            <div className="cards__item__link">
                <figure className="cards__item__pic-wrap" data-category={author}>
                    <img className="cards__item__img" src={image} alt={name} />
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{name}</h5>
                    <StarRating rating={rating}/>
                    Nr. ratinguri: {ratingNo ? <p className="cards__item__text">{ratingNo}</p> : <p className="cards__item__text">0</p>}
                    <p>Author</p>
                    <h5 className="cards__item__text">{author}</h5>
                </div>
            </div>
        </li>

    );
}

export default RecipeCard;
