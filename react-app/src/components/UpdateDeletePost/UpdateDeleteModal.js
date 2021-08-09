import { useState, useEffect } from 'react'
import { Modal } from '../../context/Modal'
import UpdateDeletePost from './index'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


function UDModal({ username, postId, setDeleteSwitch }) {
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        if (!showModal) return;

        const menu = () => {
            setShowModal(false)
        }

        return () => document.removeEventListener("click", menu)
    }, [showModal])


    return (
        <>
            <>
                <button className="btn-editPost" onClick={() => setShowModal(true)} >
                    <MoreHorizIcon></MoreHorizIcon>
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <UpdateDeletePost
                            username={username}
                            postId={postId}
                            setDeleteSwitch={setDeleteSwitch}
                            setShowModal={setShowModal}
                        />
                    </Modal>
                )}
            </>

        </>
    )



}

export default UDModal