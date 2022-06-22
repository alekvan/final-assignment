import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from '../components/SectionTitle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userLogin';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [addUserFormData, setAddUserFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
  });

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => setAddUserFormData(res.data.user))
      .catch((err) => {
        alert('Error ' + err);
        dispatch(logout());
        navigate('/', { replace: true });
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(addUserFormData);

  console.log(moment(addUserFormData.birthday).format('DD-MM-yyyy'));

  return (
    <>
      <SectionTitle title={'My Profile'} />
      <div
        className='user-profile-wrapper'
        style={{ display: 'flex', marginTop: '2rem', height: '28.6rem' }}
      >
        <div
          className='user-profile-textbox'
          style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 'auto',
            marginTop: '3rem',
          }}
        >
          <img
            src={
              addUserFormData.image
                ? addUserFormData.image
                : 'https://www.w3schools.com/howto/img_avatar.png'
            }
            alt='profile_pic'
            style={{
              width: '8rem',
              borderRadius: '50%',
              boxShadow: '0px 3px 6px #00000029',
            }}
          />
          <input type='file' id='file' style={{ display: 'none' }} />
          <label
            htmlFor='file'
            style={{
              font: 'normal normal normal 16px/35px Roboto',
              width: '70%',
              height: '2rem',
              marginTop: '2rem',
              border: '1px solid #A5A5A5',
              textAlign: 'center',
              borderRadius: '6px',
              fontSize: '16px',
              background: 'none',
              color: '#A5A5A5',
            }}
          >
            CHANGE AVATAR
          </label>
        </div>
        <form
          className='user-profile-form'
          style={{
            width: '50%',
            marginLeft: '4rem',
            marginTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}
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
                fontWeight: 'bold',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              First Name
            </label>
            <input
              id='firstName'
              placeholder='John'
              name='firstName'
              value={addUserFormData.firstName}
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
              onChange={handleInputChange}
            />
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
                fontWeight: 'bold',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Last Name
            </label>
            <input
              id='lastName'
              name='lastName'
              placeholder='Smith'
              value={addUserFormData.lastName}
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
              onChange={handleInputChange}
            />
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
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              placeholder='john@smith.com'
              value={addUserFormData.email}
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
              onChange={handleInputChange}
            />
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
                  placeholderText={moment(addUserFormData.birthday).format(
                    'DD-MM-yyyy'
                  )}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  maxDate={moment().toDate()}
                  dateFormat='dd-MM-yyyy'
                  // 'dd-MM-yyyy'
                  error={!!errors.birthday}
                />
              )}
            />
          </div>
          <div
            className='form-password'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              marginTop: '1rem',
            }}
          >
            <label
              htmlFor='password'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='******'
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
              onChange={handleInputChange}
            />
          </div>
          <div
            className='form-password-check'
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              marginTop: '1rem',
            }}
          >
            <label
              htmlFor='passwordRepeat'
              style={{
                fontFamily: 'Roboto Slab',
                fontWeight: 'bold',
                marginBottom: '0.7rem',
                color: '#F0972A',
              }}
            >
              Repeat Password
            </label>
            <input
              type='password'
              id='passwordRepeat'
              placeholder='******'
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
              onChange={handleInputChange}
            />
          </div>
          <button
            type='submit'
            style={{
              font: 'normal normal 700 14px/36px Roboto',
              width: '21%',
              height: '2.2rem',
              marginTop: '2.5rem',
              boxShadow: '0px 3px 6px #00000029',
              border: '0',
              textAlign: 'center',
              borderRadius: '5px',
              background: '#96BB36 0% 0% no-repeat padding-box',
              fontSize: '16px',
              color: '#FFFFFF',
            }}
          >
            SAVE
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
