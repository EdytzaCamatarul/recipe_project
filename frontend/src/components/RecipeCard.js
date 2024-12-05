import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';

function RecipeCard({ name, description, image, author }) {
    return (

        <li className="cards__item">
            <div className="cards__item__link">
                <figure className="cards__item__pic-wrap" data-category={author}>
                    <img className="cards__item__img" src={image} alt={name} />
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{name}</h5>
                    <p className="cards__item__text">{description}</p>
                </div>
            </div>
        </li>

    );
}

export default RecipeCard;
