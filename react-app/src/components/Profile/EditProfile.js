import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { editProfileUser } from '../../store/session'

function EditProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [username, setUserName] = useState(null)
    const [full_name, setFullName] = useState(null)
    const [website, setWebsite] = useState(null)
    const [bio, setBiography] = useState(null)
    const [phone, setPhone] = useState(null)
    const [gender, setGender] = useState(null)
    const [profile_image, setProfileImage] = useState(null)

    // useEffect(() => {
    //     dispatch(editProfileUser(user?.id))
    // }, [dispatch, user?.id])

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(editProfileUser(user?.id, username, full_name, website, bio, phone, gender, profile_image))
        if (data.errors) {
            setErrors(data.errors)
        }
        history.push(`/user/${user?.id}`)
    }

    const updateUserName = (e) => {
        setUserName(e.target.value);
    };

    const updateFullName = (e) => {
        setFullName(e.target.value)
    }

    const updateWebsite = (e) => {
        setWebsite(e.target.value)
    }

    const updateBiography = (e) => {
        setBiography(e.target.value)
    }

    const updatePhone = (e) => {
        setPhone(e.target.value)
    }

    const updateGender = (e) => {
        setGender(e.target.value)
    }

    const updateImage = (e) => {
        const file = e.target.files[0]
        if (file) setProfileImage(file)
    }

    return (
        <form >
            <ul className="form-errors">
                {errors?.map((error, ind) => <li key={ind}>{error}</li>)}
            </ul>
            <h2>Update Profile</h2>
        </form>
    )

}