import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';

import LogoutButton from './auth/LogoutButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LoginFormModal from '../components/auth/LoginForm/LoginFormModal'
import SignUpFormModal from './auth/SignUpForm/SignUpFormModal';
import SignUpForm from '../components/auth/SignUpForm/SignUpForm';
import LoginForm from '../components/auth/LoginForm/LoginForm'
import PostUploadModal from '../context/PostUploadModal'
import { getAllUsers } from '../store/profile'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Demo from '../components/Demo'

const NavBar = ({ loaded, setResults }) => {
  const history = useHistory()
  const { username } = useParams()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const users = useSelector(state => state.profile)
  const userArray = Object.values(users)
  const userInfo = userArray[0]
  const [search, setSearch] = useState('')


  useEffect(() => {
    dispatch(getAllUsers())
    console.log('+++++++++++++++++++++++', userInfo)

  }, [dispatch])


  let userForSearchBar = []
  const handleClick = () => {
    const userFilter = Object?.values(userInfo)?.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
    userForSearchBar.push(userFilter)
    setResults(userForSearchBar)
    setSearch('')
    return history.push("/search")
  }

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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => {
            if (e.key === 'Enter' && e.target.value.length != '') {
              return handleClick()
            }
          }} placeholder="Search" ></input>
        </div>
        <div>
        </div>
      
      </>
    )
  }
  else {
    sessionLinks = (
      <>
        <div>
          {/* <LoginFormModal></LoginFormModal> */}
          {/* <LoginForm></LoginForm> */}
        </div>
        <div>
          {/* <SignUpFormModal></SignUpFormModal> */}
          {/* <SignUpForm></SignUpForm> */}
        </div>
        {/* <div><Demo></Demo></div> */}
      
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
