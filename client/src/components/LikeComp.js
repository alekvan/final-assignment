import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userLogin';
import axios from 'axios';
import { useEffect, useState } from 'react';

const LikeComp = ({ recipeLikes, recipeId, className }) => {
  const userState = useSelector(selectUser);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${recipeId}`).then((res) => {
      setIsLiked(res.data.recipe.likes.includes(userState.userId));
      setNumOfLikes(res.data.recipe.likes.length);
    });
  }, [numOfLikes, isLiked]);
  const handleLike = () => {
    axios
      .post(
        `http://localhost:5000/recipes/likes`,
        {
          userId: userState.userId,
          recipeId: recipeId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        setIsLiked(res.data.like);
        setNumOfLikes(res.data.likeArr.length);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faStar}
        color={userState.userId && isLiked ? '#f0972a' : 'gray'}
        onClick={handleLike}
      />{' '}
      {numOfLikes}
    </div>
  );
};

export default LikeComp;
