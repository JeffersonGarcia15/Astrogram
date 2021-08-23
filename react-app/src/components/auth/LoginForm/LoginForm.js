import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from 'react-google-login'
import Demo from '../../Demo';
import '../auth.css'

const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  function FloatingEvt(evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.add('has-value')
    } else {
      evt.target.classList.remove('has-value')
    }
  }

  if (user) {
    return <Redirect to={`/feed`} />;
  }

  const responseGoogle = (response) => {
    return response
  }

  return (
    <div className="container">
      <img src={'https://astrogram.s3.us-east-2.amazonaws.com/Screen+Shot+2021-07-04+at+6.30.15+PM.png'} alt='logo'></img>
      <div className="form-group">
        <div className="form-container">
          <img className="logo" src="https://i.ibb.co/pWpLBFN/Astrogram.png" alt="Astrogram" border="0" />
          <form onSubmit={onLogin}>
            {errors.map((error, ind) => (
              <div className="error-container" key={ind}>{error}</div>
            ))}
            <div className="floating-label">
              <input
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className="floating-label">
              <input
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              />
              <label htmlFor='password'>Password</label>
            </div>
            <button type='submit' className="btn-form">Login</button>
          </form>

          <div className="line">
            <p className="l-line"></p>
            <p className="t-line">OR</p>
            <p className="r-line"></p>
          </div>
          <p style={{ textAlign: 'center' }}>Login with</p>
          <Demo></Demo>
          <div className="line">
            <p className="l-line"></p>
            <p className="t-line">OR</p>
            <p className="r-line"></p>
          </div>
          <p style={{ textAlign: 'center' }}>Login with Google</p>
          <GoogleLogin
            clientId="421931574627-u93gqbc7jkfcab9qnholne745bh46otv.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
        </div>
        <div className="form-bottom">
          <p>Don't have an account?
            <a onClick={e => { e.preventDefault(); history.push(`/sign-up`) }} href="/sign-up">
              Sign up</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
{/* <GoogleLogin
  clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
  buttonText="Login with Google"
  onSuccess={responseGoogle}
  onFailure={responseGoogle}
  cookiePolicy={'single_host_origin'}
></GoogleLogin> */}