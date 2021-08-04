import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';
import ValidateEmail from '../../utils'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_image, setProfileImage] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([ ])

    let validatorErrors = [ ] 

    if (!ValidateEmail(email)) {
      validatorErrors.push('Please provide a valid email address')
    }

    if (full_name.length < 3) {
      validatorErrors.push('Please provide a valid full name with more than 3 characters')
    }
    else if(username.length > 50) {
      validatorErrors.push('Please provide a valid full name with not more than 50 characters')
    }

    if (password.length < 6) {
      validatorErrors.push('Please provide a password with 6 or more characters')
    }

    if (password.length > 15) {
      validatorErrors.push('Please provide a password not longer than 15 characters')
    }

    if (username.length < 3 ) {
      validatorErrors.push('Please provide a username with at least 3 characters')
    }
    else if (username.length > 15) {
      validatorErrors.push('Please provide a username not longer than 15 characters')
    }

    if (password !== repeatPassword) {
      validatorErrors.push('Passwords do not match')
    }

    if (!validatorErrors.length) {
      const data = await dispatch(signUp(username, full_name, email, password, profile_image));
      if (data?.errors) {
        setErrors(data?.errors)
      // } else {
      //   <Redirect to='/'></Redirect>
      }
      else {

        setTimeout(() => {
          history.push('/')
        }, 0)
      }
      
    }  
    else {
    setErrors(validatorErrors)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Full Name</label>
        <input
          type='text'
          name='fullName'
          onChange={(e) => setFullName(e.target.value)}
          value={full_name}
        ></input>
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
