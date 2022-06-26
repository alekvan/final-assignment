import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputComp from './InputComp';
import './NewRecipeForm/NewRecipeForm.css';
import axios from 'axios';

const EditRecipe = ({ requestMethod }) => {
  let { recipeId } = useParams();
  const [inputValues, setInputValues] = useState({
    editRecipeTitle:'',
editRecipeDesc:'',
editCategory:'',
editNumberOfPeople:'',
editPrepTime:'',
editShortDesc:'',
editRecipeImg:undefined,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/${recipeId}`)
      .then((res) => {
        setInputValues({
          editRecipeTitle: res.data.recipe.recipeTitle,
          editRecipeDesc: res.data.recipe.recipeDesc,
          editCategory: res.data.recipe.category,
          editNumberOfPeople: res.data.recipe.numberOfPeople,
          editPrepTime: res.data.recipe.prepTime,
          editShortDesc: res.data.recipe.shortDesc,
          editRecipeImg: res.data.recipe.recipeImg,
        });
        console.log(res.data.recipe.recipeImg);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleInputChange(e) {
    const value = e.target.value;
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let img = watch('editRecipeImg');
  console.log(watch('editRecipeImg'));

  const handleSubmitData = (fData, e) => {
    e.preventDefault();
    console.log(fData);
    const data = new FormData();
    console.log(fData['editRecipeImg']);
    data.append('recipeTitle', fData['editRecipeTitle']);
    data.append('recipeImg', fData['editRecipeImg'][0]);
    data.append('recipeDesc', fData['editRecipeDesc']);
    data.append('shortDesc', fData['editShortDesc']);
    data.append('category', fData['editCategory']);
    data.append('numberOfPeople', fData['editNumberOfPeople']);
    data.append('prepTime', fData['editPrepTime']);

    console.log(fData);
    // for (const key in fData) {
    //   if (key === 'recipeImg') {
    //     data.append(key, fData[key][0]);
    //   } else {
    //     data.append(key, fData[key]);
    //   }
    // }
    axios
      .patch(`http://localhost:5000/recipes/${recipeId}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err.message));
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <form
      className='form-style'
      onSubmit={handleSubmit(handleSubmitData, onError)}
    >
      <div className='form-wrapper' style={{ display: 'flex', width: '100%' }}>
        <div
          className='new-recipe-left'
          style={{ display: 'flex', flexDirection: 'column', width: '20%' }}
        >
          <div className='image-title'>Recipe Image</div>

          <div className='image-wrapper'>
            <img
              src={
                img === undefined || img === [] || img.length === 0
                  ? inputValues.editRecipeImg
                  : URL.createObjectURL(img[0])
              }
              alt='recipe_img'
            />
          </div>

          <input
            type='file'
            id='editRecipeImg'
            style={{ display: 'none' }}
            multiple
            {...register('editRecipeImg', {
              onChange: (e) => handleInputChange(e),
            })}
          />
          <label htmlFor='editRecipeImg' className='upload-image-label'>
            UPLOAD IMAGE
          </label>
        </div>
        <div className='new-recipe-middle'>
          <InputComp
            type='text'
            inputGroupName='title-input'
            label='Recipe Title'
            placeholder='Homemade Pizza'
            name='editRecipeTitle'
            value={inputValues.editRecipeTitle}
            register={{
              ...register('editRecipeTitle', {
                onChange: (e) => handleInputChange(e),
              }),
            }}
          />
          {errors.recipeTitle && (
            <span
              style={{
                color: 'red',
                fontFamily: 'Roboto Slab',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              This field is required
            </span>
          )}
          <div
            className='middle-container'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='meal-category'>
              <label htmlFor='editCategory'>Category</label>
              <select
                id='editCategory'
                value={inputValues.editCategory}
                {...register('editCategory', {
                  onChange: (e) => handleInputChange(e),
                })}
              >
                <option style={{ display: 'none' }}>Select category</option>
                <option value='breakfast'>Breakfast</option>
                <option value='brunch'>Brunch</option>
                <option value='lunch'>Lunch</option>
                <option value='dinner'>Dinner</option>
              </select>
            </div>

            <InputComp
              type='number'
              inputGroupName='prep-time'
              label='Preperation Time'
              placeholder='45'
              name='editPrepTime'
              value={inputValues.editPrepTime}
              register={{
                ...register('editPrepTime', {
                  onChange: (e) => handleInputChange(e),
                }),
              }}
            />
            <InputComp
              type='number'
              inputGroupName='people'
              label='No. People'
              placeholder='4'
              name='editNumberOfPeople'
              value={inputValues.editNumberOfPeople}
              register={{
                ...register('editNumberOfPeople', {
                  onChange: (e) => handleInputChange(e),
                }),
              }}
            />
          </div>
          <div className='short-description'>
            <label htmlFor='shortDesc'>Short Description</label>
            <textarea
              id='shortDesc'
              value={inputValues.editShortDesc}
              placeholder='TLDR of a recipe'
              {...register('editShortDesc', {
                onChange: (e) => handleInputChange(e),
              })}
            ></textarea>
          </div>
        </div>
        <div className='new-recipe-right'>
          <label htmlFor='recipeDesc'>Recipe</label>
          <textarea
            id='recipeDesc'
            value={inputValues.editRecipeDesc}
            placeholder='TLDR of a recipe'
            {...register('editRecipeDesc', {
              onChange: (e) => handleInputChange(e),
            })}
          ></textarea>
        </div>
      </div>
      <button className='recipe-submit-btn' type='submit'>
        Update
      </button>
    </form>
  );
};

export default EditRecipe;
