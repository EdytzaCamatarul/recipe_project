import React from 'react';
import './StarRating.css';

const StarRating = ({ rating , centered}) => {
    const fullStars = Math.floor(rating); 
    const partialStarWidth = (rating % 1) * 100; 
    const emptyStars = 5 - fullStars - (rating % 1 > 0 ? 1 : 0); 

    return (
        <div className={`star-rating${centered}`}>
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="star full">★</span>
            ))}

            {rating % 1 > 0 && (
                <span
                    className="star partial"
                    style={{
                        background: `linear-gradient(to right, #FFD700 ${partialStarWidth}%, #ddd ${partialStarWidth}%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}> {/* Bug  ciudat steaua devine patrat cand se da un rating nou. Habar nu am sa il rezolv fuck it we ball. */}
                    ★
                </span>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="star empty">★</span>
            ))}
        </div>
    );
};

export default StarRating;
