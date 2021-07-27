import React, { useState, useEffect } from 'react'
import { Modal } from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { createPost } from '../../store/post'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';


function PhotoUploadModal() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [description, setDescription] = useState('')
    const [picture_url, setPictureUrl] = useState(null)
    const [showMenu, setShowMenu] = useState(false)


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
        setShowMenu(false)
        window.location.reload(true)
    }

    const updateFile = (e) => {
        const file = e.target.files[0]
        if (file) setPictureUrl(file)
    }

    return (
        <div>
            <button onClick={openMenu}>
                <AddAPhotoIcon />
            </button>
            {showMenu && (
                <div>
                    <Modal onClose={() => setShowMenu(false)}>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={updateFile} />
                            <button className='btn' type='submit'>Submit</button>
                    </form>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default PhotoUploadModal