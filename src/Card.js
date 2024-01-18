import React from 'react';
import "./Card.css" ;

const Card = ({ heading, description, link }) => {
    const handleLinkClick = async() => {
        try {
          // Make a POST request to the backend endpoint
            const response = await fetch('https://chatbotify-y83w.onrender.com/card_clicked/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ link }),
            });

            console.log(response);  // Handle the response as needed
        } catch (error) {
          console.error('Error making POST request:', error);
            }
        };
    return (
        <div  className='cards'>

            <a href='#' onClick={handleLinkClick}>
                <h3 className='card-heading'>{heading}</h3>
            </a>
            <p className='card-description'>{description}</p>
        </div>
    );
};

export default Card;    
