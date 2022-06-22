import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonComp from '../components/ButtonComp';
import RecipeTable from '../components/Cards/RecipeTable/RecipeTable';
import SectionTitle from '../components/SectionTitle';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userLogin';
import axios from 'axios';

const MyRecipes = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${user.userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log(res.data.message);
        setTableData(res.data.user.recipes);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <SectionTitle
        title={'My Recipes'}
        button={
          <ButtonComp
            type='add-new-recipe'
            handleClick={() => navigate(`/create-recipe/${user.userId}`)}
            innerText={
              <FontAwesomeIcon icon={faPlus} size='2x' color='white' />
            }
          />
        }
      />
      <RecipeTable tableData={tableData} />
    </>
  );
};

export default MyRecipes;
