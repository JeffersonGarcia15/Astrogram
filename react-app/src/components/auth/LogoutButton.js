import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer'}}>
    <ExitToAppOutlinedIcon style={{ outline: 'none'}} />
  </button>;
};

export default LogoutButton;
