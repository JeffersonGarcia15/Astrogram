import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout}>
    <ExitToAppIcon />
  </button>;
};

export default LogoutButton;
