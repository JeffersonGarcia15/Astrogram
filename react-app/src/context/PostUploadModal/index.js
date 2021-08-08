import React, { useState, useEffect } from 'react'
import { Modal } from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPost } from '../../store/post'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { getUserInfo } from '../../store/profile'
import './PostUpload.css'


function PhotoUploadModal() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('')
    const [picture_url, setPictureUrl] = useState(null)
    const [showMenu, setShowMenu] = useState(false)

    // useEffect(() => {
    //     dispatch(getUserInfo(user?.username))
    // }, [dispatch, user?.username])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(createPost(user.id, description, picture_url))
        await dispatch(getUserInfo(user?.username))
        setShowMenu(false)
        setDescription('')
        // window.location.reload(true)
    }

    const updateFile = (e) => {
        const file = e.target.files[0]
        if (file) setPictureUrl(file)
    }

    return (
        <div>
            <button onClick={openMenu} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <AddAPhotoIcon style={{ outline: 'none', outline: 'none' }} />
            </button>
            {showMenu && (
                <div>
                    <Modal onClose={() => setShowMenu(false)}>
                        <div>
                            <img className="logo-post-modal" src="https://i.ibb.co/pWpLBFN/Astrogram.png" alt="Astrogram" border="0" />
                            <div className='form-title-upload'>
                            <strong >New Post</strong>

                            </div>
                            <form onSubmit={onSubmit} className='form-post-upload'>
                                <div >
                                    <input className='form-input-upload' type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Optional Title' />

                                </div>
                                <div className='form-file-upload'>
                                    <input id='file' type="file" accept="image/png, image/gif, image/jpeg" onChange={updateFile} required />

                                </div>
                                <div>
                                <button className='form-btn-upload' type='submit'>Submit</button>

                                </div>
                            </form>

                        </div>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default PhotoUploadModal