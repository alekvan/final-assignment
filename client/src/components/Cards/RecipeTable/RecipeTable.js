import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';
import './RecipeTable.css';

const RecipeTable = ({ tableData }) => {
  // const deleteRecipe = (recipeId) => {
  //     props.deleteRecipe(recipeId);
  // };

  let useless = false;

  const handleDeleteRecipe = (recipeId) => {
    axios
      .delete(`http://localhost:5000/recipes/${recipeId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <table
      className='recipe-table'
      style={{ width: '100%', marginTop: '2rem' }}
    >
      <colgroup>
        <col span='1' style={{ width: '20%' }} />
        <col span='1' style={{ width: '10%' }} />
        <col span='1' style={{ width: '20%' }} />
        <col span='1' style={{ width: '40%' }} />
      </colgroup>
      <thead>
        <tr className='table-row-headers'>
          <th className='table-headers'>Recipe Name</th>
          <th className='table-headers'>Category</th>
          <th className='table-headers'>Created On</th>
          <th
            className='table-headers'
            style={{ textAlign: 'end', paddingRight: '1rem' }}
          >
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((recipe) => (
          <tr className='table-row'>
            <td className='recipe-table-row'>{recipe.recipeTitle}</td>
            <td className='recipe-table-row'>
              <button>{recipe.category}</button>
            </td>
            <td className='recipe-table-row'>
              {moment(recipe.createdAt).format('DD.MM.YYYY')}
            </td>
            <td style={{ textAlign: 'end', paddingRight: '1.3rem' }}>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                style={{ border: '0', background: 'none' }}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  size={useless ? 'xl' : 'l'}
                  onMouseEnter={(useless = true)}
                  onMouseLeave={(useless = false)}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecipeTable;
