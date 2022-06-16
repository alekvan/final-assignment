import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import SectionTitle from '../components/SectionTitle';

import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';

const CreateUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const passValue = watch('password');

  const handleSubmitData = (data, e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/users/register', data)
      .then((res) => {
        console.log(res);
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <>
      <SectionTitle title={'Create Account'} />
      <div
        className='register-wrapper'
        style={{ display: 'flex', marginTop: '2rem', height: '28.6rem' }}
      >
        <div
          className='register-textbox'
          style={{ width: '35%', paddingRight: '4rem' }}
        >
          <h1
            style={{
              fontSize: '46px',
              color: '#F0972A',
              fontFamily: 'Roboto Slab',
            }}
          >
            Create your <span style={{ color: '#626262' }}>account</span>
          </h1>
          <p
            style={{
              fontFamily: 'Roboto Slab',
              fontSize: '20px',
              color: '#A5A5A5',
            }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae
            velit fugiat vero tenetur reprehenderit quibusdam consequuntur saepe
            ipsum soluta rem praesentium modi obcaecati nemo, rerum nisi impedit
            voluptas? Ad, doloribus? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit.
          </p>
        </div>
        <form
          className='register-form'
          style={{
            width: '65%',
            marginLeft: '4rem',
            marginTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}
          onSubmit={handleSubmit(handleSubmitData, onError)}
        >
          <div
            className='form-first-name'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              marginBottom: '1rem',
            }}
          >
            <label
              htmlFor='firstName'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              First Name
            </label>
            <input
              id='firstName'
              placeholder='John'
              {...register('firstName', {
                required: true,
              })}
              style={{
                padding: '5px',
                height: '1.7rem',
                borderRadius: '5px',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                border: '1px solid #A5A5A5',
                background: '#F0EFEA',
                width: '85%',
                color: '#626262',
              }}
            />
            {errors.firstName && (
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
          </div>

          <div
            className='form-last-name'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
            }}
          >
            <label
              htmlFor='lastName'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Last Name
            </label>
            <input
              id='lastName'
              {...register('lastName', {
                required: true,
              })}
              placeholder='Smith'
              style={{
                padding: '5px',
                height: '1.7rem',
                borderRadius: '5px',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                border: '1px solid #A5A5A5',
                background: '#F0EFEA',
                width: '85%',
                color: '#626262',
              }}
            />
            {errors.lastName && (
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
          </div>

          <div
            className='form-email'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              marginBottom: '1rem',
            }}
          >
            <label
              htmlFor='email'
              style={{
                width: 'fit-content',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Email
            </label>
            <input
              id='email'
              {...register('email', {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              placeholder='john@smith.com'
              style={{
                padding: '5px',
                height: '1.7rem',
                borderRadius: '5px',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                border: '1px solid #A5A5A5',
                background: '#F0EFEA',
                width: '85%',
                color: '#626262',
              }}
            />
            {errors.email && (
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
            {errors.email?.type === 'pattern' && (
              <span
                style={{
                  color: 'red',
                  fontFamily: 'Roboto Slab',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Enter valid email
              </span>
            )}
          </div>
          <div
            className='form-birthday'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
            }}
          >
            <label
              htmlFor='birthday'
              style={{
                width: 'fit-content',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Birthday
            </label>
            <Controller
              control={control}
              name='birthday'
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  id='birthday'
                  placeholderText='22-11-2000'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  dateFormat='dd-MM-yyyy'
                  error={!!errors.birthday}
                />
              )}
            />
            {errors.birthday && (
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
          </div>
          <div
            className='form-password'
            style={{ display: 'flex', flexDirection: 'column', width: '45%' }}
          >
            <label
              htmlFor='password'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='******'
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters',
                },
              })}
              style={{
                padding: '5px',
                height: '1.7rem',
                borderRadius: '5px',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                border: '1px solid #A5A5A5',
                background: '#F0EFEA',
                width: '85%',
                color: '#626262',
              }}
            />
            {errors.password && (
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
            {errors.password?.type === 'minLength' && (
              <span
                style={{
                  color: 'red',
                  fontFamily: 'Roboto Slab',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Must be longer than 6 characters
              </span>
            )}
          </div>
          <div
            className='form-password-check'
            style={{ display: 'flex', flexDirection: 'column', width: '45%' }}
          >
            <label
              htmlFor='confirmPassword'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bolder',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Repeat Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='******'
              {...register('confirmPassword', {
                required: true,
                validate: {
                  passEqual: (value) =>
                    value === getValues().password || "Password doesn't match",
                },
              })}
              style={{
                padding: '5px',
                height: '1.7rem',
                borderRadius: '5px',
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                border: '1px solid #A5A5A5',
                background: '#F0EFEA',
                width: '85%',
                color: '#626262',
              }}
            />
            {errors.confirmPassword?.type === 'passEqual' && (
              <span
                style={{
                  color: 'red',
                  fontFamily: 'Roboto Slab',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Passwords don't match
              </span>
            )}
          </div>
          <button
            type='submit'
            style={{
              font: 'normal normal 700 16px/45px Roboto',
              width: '28%',
              height: '2.7rem',
              marginTop: '2rem',
              boxShadow: '0px 3px 6px #00000029',
              border: '0',
              textAlign: 'center',
              borderRadius: '6px',
              background: '#96BB36 0% 0% no-repeat padding-box',
              fontSize: '16px',
              color: '#FFFFFF',
            }}
          >
            CREATE
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
