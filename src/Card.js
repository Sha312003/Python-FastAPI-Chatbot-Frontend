import React from 'react';
import "./Card.css" ;

const Card = ({ heading, description, link }) => {
    return (
        <div  className='cards'>

            <a href={link}>
                <h3 className='card-heading'>{heading}</h3>
            </a>
            <p className='card-description'>{description}</p>
        </div>
    );
};

export default Card;    
