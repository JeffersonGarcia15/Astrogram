import { useSelector } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LoginFormModal from '../components/auth/LoginForm/LoginFormModal'
import SignUpFormModal from './auth/SignUpForm/SignUpFormModal';
import PostUploadModal from '../context/PostUploadModal'

const NavBar = ({ loaded }) => {
  const user = useSelector(state => state.session.user);

  let sessionLinks
  if (user) {
    sessionLinks = (
      <>
        <div>
          <NavLink to={`/users/${user.username}`} exact={true} activeClassName='active'>
            <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
          </NavLink>
        </div>
        <div>
          <LogoutButton></LogoutButton>
        </div>
        <PostUploadModal></PostUploadModal>
      
      </>
    )
  }
  else {
    sessionLinks = (
      <>
        <div>
          <LoginFormModal></LoginFormModal>
        </div>
        <div>
          <SignUpFormModal></SignUpFormModal>
        </div>
      
      </>
    )
  }
  return (
    <>
      <div>
        {loaded && sessionLinks}

      </div>
    
    </>
  );
}

export default NavBar;
