import { useState } from 'react'
import { Modal } from '../../../context/Modal'
import SignUpForm from '../SignUpForm/SignUpForm'

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} >SignUp</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm></SignUpForm>
                </Modal>
            )}

        </>
    )

}

export default SignUpFormModal


