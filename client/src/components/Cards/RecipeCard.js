import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faClock,
  faStar,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import './RecipeCard.css';

const RecipeCard = ({ recipeData, setSelectedCard }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(true);
  };
  const handleDislike = () => {
    setLike(false);
  };

  return (
    <div className='card-wrapper'>
      <div
        className='card-top'
        style={{ backgroundImage: `url(${recipeData.recipeImg})` }}
      >
        <div className='recipe-type'>{recipeData.category}</div>
      </div>
      <div className='card-bottom'>
        <div>
          <h2>{recipeData.recipeTitle}</h2>
          <p>{recipeData.shortDesc}</p>
        </div>
        <div className='card-icons'>
          <div className='card-time'>
            <FontAwesomeIcon icon={faClock} color='gray' />{' '}
            {recipeData.prepTime} min
          </div>
          <div className='card-people' style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faUtensils} color='gray' />{' '}
            {recipeData.numberOfPeople} people
          </div>
          <div className='card-stars' style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon
              icon={faStar}
              color={like ? '#f0972a' : 'gray'}
              onClick={like ? handleDislike : handleLike}
            />{' '}
            30
          </div>
          <div className='card-button'>
            <button onClick={() => setSelectedCard(recipeData)}>
              <FontAwesomeIcon icon={faAnglesRight} color='white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
