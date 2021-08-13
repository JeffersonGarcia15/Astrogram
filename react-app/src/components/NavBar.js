import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory} from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PostUploadModal from '../context/PostUploadModal'
import { getAllUsers } from '../store/profile'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import './NavBar.css'

const NavBar = ({ loaded, setResults }) => {
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const users = useSelector(state => state.profile)
  const userArray = Object.values(users)
  const userInfo = userArray[0]
  const [search, setSearch] = useState('')


  useEffect(() => {
    dispatch(getAllUsers())

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
        <div className='navbar-container'>
          <div>
            <div style={{cursor: 'pointer'}} onClick={e => { e.preventDefault(); history.push(`/feed`) }}>
                <img className="logo-navbar" src="https://i.ibb.co/pWpLBFN/Astrogram.png" alt="Astrogram" border="0" />

              </div>
          </div>
          <div className='searchbar'>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => {
              if (e.key === 'Enter' && e.target.value.length > 0) {
                return handleClick()
              }
            }} placeholder="            🔍  Search" ></input>
          </div>
          <div className='home'>
            <NavLink exact={true} to='/'><HomeOutlinedIcon style={{outline: 'none', color:'black'}}></HomeOutlinedIcon></NavLink>
          </div>
          <div className='profile'>
            <NavLink to={`/users/${user.username}`} exact={true} activeClassName='active' style={{ outline: 'none', color: 'black' }}>
              <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
            </NavLink>
          </div>
          <div className='logout'>
            <LogoutButton></LogoutButton>
          </div>
          <div className='camera'>
            <PostUploadModal></PostUploadModal>
          </div>
          <div>
          </div>

        </div>

      </>
    )
  }
  else {
    sessionLinks = (
      <>
        <div>
          
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
