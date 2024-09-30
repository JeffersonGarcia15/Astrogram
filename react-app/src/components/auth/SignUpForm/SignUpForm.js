import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp, signUpGoogle } from "../../../store/session";

import ValidateEmail from "../../utils";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Demo from "../../Demo";
import "../auth.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);

    let validatorErrors = [];

    if (!ValidateEmail(email)) {
      validatorErrors.push("Please provide a valid email address");
    }

    if (full_name.length < 3) {
      validatorErrors.push(
        "Please provide a valid full name with more than 3 characters"
      );
    } else if (username.length > 50) {
      validatorErrors.push(
        "Please provide a valid full name with not more than 50 characters"
      );
    }

    if (password.length < 6) {
      validatorErrors.push(
        "Please provide a password with 6 or more characters"
      );
    }

    if (password.length > 15) {
      validatorErrors.push(
        "Please provide a password not longer than 15 characters"
      );
    }

    if (username.length < 3) {
      validatorErrors.push(
        "Please provide a username with at least 3 characters"
      );
    } else if (username.length > 15) {
      validatorErrors.push(
        "Please provide a username not longer than 15 characters"
      );
    }

    if (password !== repeatPassword) {
      validatorErrors.push("Passwords do not match");
    }

    if (!validatorErrors.length) {
      const data = await dispatch(signUp(username, full_name, email, password));
      if (data?.errors) {
        setErrors(data?.errors);
      } else {
        setTimeout(() => {
          history.push("/feed");
        }, 0);
      }
    } else {
      setErrors(validatorErrors);
    }
  };
  const responseGoogle = async (response) => {
    const decodedToken = jwtDecode(response.credential);
    console.log("Decoded Token", decodedToken);
    const values = await dispatch(
      signUpGoogle({
        username: decodedToken.name,
        full_name: decodedToken.name,
        email: decodedToken.email,
        password: "password1!",
      })
    );
    console.log("THE VALUE", values);
    if (user) {
      history.push("/feed");
    }

    return response;
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

  function FloatingEvt(evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.add("has-value");
    } else {
      evt.target.classList.remove("has-value");
    }
  }

  if (user) {
    return <Redirect to="/feed" />;
  }

  return (
    <div className="container">
      <img
        src={
          "https://astrogram.s3.us-east-2.amazonaws.com/Screen+Shot+2021-07-04+at+6.30.15+PM.png"
        }
        alt="logo"
      ></img>
      <div className="form-group">
        <div className="form-container">
          <img
            className="logo"
            src="https://i.ibb.co/pWpLBFN/Astrogram.png"
            alt="Astrogram"
            border="0"
          />
          <p className="title">
            Sign up to see photos and videos from your friends.
          </p>
          <Demo></Demo>
          <div className="line">
            <p className="l-line"></p>
            <p className="t-line">OR</p>
            <p className="r-line"></p>
          </div>
          <GoogleLogin
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            // onClick={(e) => {
            //   e.preventDefault();
            //   history.push(`/feed`);
            // }}
          ></GoogleLogin>
          <form onSubmit={onSignUp}>
            <div>
              {errors.map((error, ind) => (
                <div className="error-container" key={ind}>
                  {error}
                </div>
              ))}
            </div>
            <div className="floating-label">
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={updateEmail}
                value={email}
                onBlur={FloatingEvt}
                autoComplete="off"
              ></input>
              <label>Email</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={full_name}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              ></input>
              <label>Full Name</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              ></input>
              <label>Username</label>
            </div>
            <div className="floating-label">
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              ></input>
              <label>Password</label>
            </div>
            <div className="floating-label">
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                className="form-control"
                onBlur={FloatingEvt}
                autoComplete="off"
              ></input>
              <label>Repeat Password</label>
            </div>
            <button type="submit" className="btn-form">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-bottom">
          <p>
            Have an account?
            <a
              onClick={(e) => {
                e.preventDefault();
                history.push(`/login`);
              }}
              href="/login"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
