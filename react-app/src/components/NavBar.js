import { useSelector } from 'react-redux';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LoginFormModal from '../components/auth/LoginForm/LoginFormModal'
import SignUpFormModal from './auth/SignUpForm/SignUpFormModal';
import PostUploadModal from '../context/PostUploadModal'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Demo from '../components/Demo'

const NavBar = ({ loaded }) => {
  const { username } = useParams()
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
        <div>
        <PostUploadModal></PostUploadModal>

        </div>
        <div>
          <NavLink exact={true} to='/'><HomeOutlinedIcon></HomeOutlinedIcon></NavLink>
        </div>
        <div>
          <button onClick={() => console.log('CHECKING IF USERNAME GETS TO NAVBAR', username)}>CLICK FOR USERNAME?</button>
        </div>
      
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
        <div><Demo></Demo></div>
      
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
