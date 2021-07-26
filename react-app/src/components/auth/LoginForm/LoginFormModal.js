import { useState } from 'react'
import { Modal } from '../../../context/Modal'
import LoginForm from '../LoginForm/LoginForm'


function LoginFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)} >LogIn</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm></LoginForm>
                </Modal>
            )}
        
        </>
    )

}

export default LoginFormModal