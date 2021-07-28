import { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditProfile from '../Profile/EditProfile'

function EditProfileModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} >Edit Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfile />
                </Modal>
            )}

        </>
    )



}

export default EditProfileModal