import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const LikeComp = ({ recipeLikes, recipeId, className }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(true);
  };
  const handleDislike = () => {
    setLike(false);
  };
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faStar}
        color={like ? '#f0972a' : 'gray'}
        onClick={like ? handleDislike : handleLike}
      />{' '}
      {recipeLikes}
    </div>
  );
};

export default LikeComp;
