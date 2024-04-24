import React, { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import Modals from '../components/common/Modals.jsx';

const VerifyEmail = () => {
    const { userId } = useParams(); // Get userId from URL params
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(!!userId);
    console.log(userId)
    const handleOnChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const requestData = { verificationCode };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/verifyemail/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });

            let json = await response.json();
            console.log(json)
            let userIdRetry = json.data.userId
            // Handle response data
            if (json.data.authToken && json.data.authToken !== "") {
                localStorage.setItem("authToken", json.data.authToken);
                navigate("/");
            } else {
                navigate(`/verifyemail/${userIdRetry}`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors
        }
    };

    return (
        <>
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Verify Email"
                onSubmit={handleLoginSubmit}
            >
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="verifyemail">Verification Code:</label>
                    <input
                        type="text"
                        id="verifyemail"
                        name="verifyemail"
                        required
                        value={verificationCode}
                        onChange={handleOnChange}
                    />
                    <button type="submit">Send</button>
                </form>
            </Modals>
        </>
    );
};

export default VerifyEmail;
