import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { editProfileUser } from '../../store/session'
import { getUserInfo } from '../../store/profile'


function EditProfile({usernameInfo}) {
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
        // await dispatch(getUserInfo(usernameInfo))

        history.push(`/`)
        // window.location.reload(true)

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
        <form onSubmit={onSubmit}>
            <ul className="form-errors">
                {errors?.map((error, ind) => <li key={ind}>{error}</li>)}
            </ul>
            <h2>Update Profile</h2>
            <div>
                <label>Full Name</label>
                <input
                    type='text'
                    name='fullName'
                    onChange={updateFullName}
                    value={full_name}
                ></input>
            </div>
            <div>
                <label>User Name</label>
                <input
                    type='text'
                    name='username'
                    onChange={updateUserName}
                    value={username}
                ></input>
            </div>
            <div>
                <label>Website</label>
                <input
                    type='text'
                    name='fullName'
                    onChange={updateWebsite}
                    value={website}
                ></input>
            </div>
            <div>
                <label>Biography</label>
                <textarea
                    onChange={updateBiography}
                    value={bio}
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
            <div>
                <label>Gender</label>
                <input type='text' onChange={updateGender} value={gender}></input>
            </div>
            <div>
                <label>Phone</label>
                <input type="text" onChange={updatePhone} value={phone}/>
            </div>
            <div>
                <label>Change Your Profile Picture</label>
                <input type="file" onChange={updateImage} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )

}

export default EditProfile