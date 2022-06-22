import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputComp from './InputComp';
import './NewRecipeForm/NewRecipeForm.css';
import axios from 'axios';

const EditRecipe = ({ requestMethod }) => {
  let { recipeId } = useParams();
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/${recipeId}`, {
        // headers: {
        //   Authorization: 'Bearer ' + localStorage.getItem('token'),
        // },
      })
      .then((res) => {
        setInputValues(res.data.recipe);
        console.log(res.data.recipe);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) =>
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  console.log(inputValues.recipeTitle);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      editRecipeTitle: inputValues.recipeTitle,
    },
  });
  let img = watch('editRecipeImg');
  console.log(img);

  const handleSubmitData = (fData, e) => {
    e.preventDefault();
    console.log(fData['editRecipeImg'][0]);
    const data = new FormData();
    data.append('recipeTitle', fData['editRecipeTitle']);
    data.append('recipeImg', fData['editRecipeImg'][0]);
    data.append('recipeDesc', fData['editRecipeDesc']);
    data.append('shortDesc', fData['editShortDesc']);
    data.append('category', fData['editCategory']);
    data.append('numberOfPeople', fData['editNumberOfPeople']);
    data.append('prepTime', fData['editPrepTime']);

    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
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
                  ? inputValues.recipeImg
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
            {...register('editRecipeImg', { required: true })}
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
            onChange={(e) => handleInputChange(e)}
            ref={register}
            register={{
              ...register('editRecipeTitle', { required: true }),
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
                {...register('editCategory', { required: true })}
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
              register={{
                ...register('editPrepTime', { required: true }),
              }}
            />
            <InputComp
              type='number'
              inputGroupName='people'
              label='No. People'
              placeholder='4'
              name='editNumberOfPeople'
              register={{
                ...register('editNumberOfPeople', { required: true }),
              }}
            />
          </div>
          <div className='short-description'>
            <label htmlFor='shortDesc'>Short Description</label>
            <textarea
              id='shortDesc'
              placeholder='TLDR of a recipe'
              {...register('editShortDesc', { required: true })}
            ></textarea>
          </div>
        </div>
        <div className='new-recipe-right'>
          <label htmlFor='recipeDesc'>Recipe</label>
          <textarea
            id='recipeDesc'
            placeholder='TLDR of a recipe'
            {...register('editRecipeDesc', { required: true })}
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
