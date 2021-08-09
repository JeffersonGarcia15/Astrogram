import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { editProfileUser } from '../../store/session'
import { getUserInfo } from '../../store/profile'


function EditProfile({ usernameInfo }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [username, setUserName] = useState(user.username)
    const [full_name, setFullName] = useState(user.full_name)
    const [website, setWebsite] = useState(user.website)
    const [bio, setBiography] = useState(user.bio)
    const [phone, setPhone] = useState(user.phone)
    const [gender, setGender] = useState(user.gender)
    const [profile_image, setProfileImage] = useState(user.profile_image)

    // useEffect(() => {
    //     dispatch(editProfileUser(user?.id))
    // }, [dispatch, user?.id])

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(editProfileUser(user?.id, username, full_name, website, bio, phone, gender, profile_image))
        if (data?.errors) {
            setErrors(data?.errors)
        }
history.push('/')
    };

    // await dispatch(getUserInfo(usernameInfo))




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

    function FloatingEvt(evt) {
        if (evt.target.value.length > 0) {
            evt.target.classList.add('has-value')
        } else {
            evt.target.classList.remove('has-value')
        }
    }

    return (
        <div className="form-UpdateProfile">
            <form onSubmit={onSubmit}>
                <ul className="form-errors">
                    {errors?.map((error, ind) => <li key={ind}>{error}</li>)}
                </ul>
                <h2>Update Profile</h2>
                <div className="floating-label">
                    <input
                        type='text'
                        name='fullName'
                        onChange={updateFullName}
                        value={full_name}
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off"
                        required
                    ></input>
                    <label>Full Name</label>
                </div>
                <div className="floating-label">
                    <input
                        type='text'
                        name='username'
                        onChange={updateUserName}
                        value={username}
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off"
                        required
                    ></input>
                    <label>User Name</label>
                </div>
                <div className="floating-label">
                    <input
                        type='text'
                        name='fullName'
                        onChange={updateWebsite}
                        value={website}
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off"
                    ></input>
                    <label>Website</label>
                </div>
                <div className="floating-label txt-area">
                    <textarea
                        onChange={updateBiography}
                        value={bio === "null" ? '' : bio}
                        cols="50"
                        rows="10"
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off"
                    ></textarea>
                    <label>Biography</label>
                </div>
                <div className="floating-label">
                    <input type='text' onChange={updateGender} value={gender === "null" ? '' : gender}
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off"
                    ></input>
                    <label>Gender</label>
                </div>
                <div className="floating-label">
                    <input type="text" onChange={updatePhone} value={phone === "null" ? '' : phone}
                        className="form-control has-value"
                        onBlur={FloatingEvt}
                        autoComplete="off" />
                    <label>Phone</label>
                </div>
                <div className="upload-file">
                    <label>Change Your Profile Picture</label>
                    <input type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={updateImage} />
                </div>
                <div>
                    <button type="submit" className="btn-form">Update</button>
                </div>
            </form>
        </div>
    )

}

export default EditProfile