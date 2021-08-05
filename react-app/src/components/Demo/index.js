import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

// Initializing DemoUser component
const DemoUser = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    const onLogin = async (e) => {
        e.preventDefault();

        const data = await dispatch(login('jeff@aa.io', 'password'));
        if (data) setErrors(data);
    };

    if (user) history.push('/');

    return (
        <form onSubmit={onLogin}>
            <div className='form'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <button type='submit' className="btn-form icon-demo link-login">
                <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
                Demo user
            </button>
        </form>
    )
}

// Exporting
export default DemoUser;