import { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditProfile from '../Profile/EditProfile'
import { useDispatch, useSelector } from 'react-redux';


function EditProfileModal({ username }) {
    const [showModal, setShowModal] = useState(false)
    const user = useSelector(state => state.session.user)

    return (
        <>
            <>
                <button className="btn-edit" onClick={() => setShowModal(true)} >Edit Profile</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditProfile />
                    </Modal>
                )}
            </>

        </>
    )



}

export default EditProfileModal