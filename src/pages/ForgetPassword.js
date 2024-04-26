import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modals from '../components/common/Modals.jsx';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState('');
    const [otp, setOTP] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [otpSent, setOtpSent] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleOnChange = (e) => {
        setEmailAddress(e.target.value);
    };

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const sendOTP = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/forgetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailAddress }),
            });

            if (response.ok) {
                const json = await response.json();
                console.log(json);
                setOtpSent(true);
                setUserId(json.data.userId);

            } else {
                throw new Error('Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            // If OTP is not sent yet, send OTP
            await sendOTP();
        } else {
            // If OTP is already sent, validate OTP and navigate to reset password page
            if (otp.trim() !== '') {
                navigate(`/resetpassword/${userId}`);
            } else {
                alert('Please enter the OTP.');
            }
        }
    };

    return (
        <>
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Forget Password"
                customClassName="modal-for-auth"
            >
                <form className='forgetpassword__form' onSubmit={handleSubmit}>
                    <div className='forgetpassword__input__section'>
                        <label htmlFor="forgetpassword">Email:</label>
                        <input
                            type="text"
                            id="forgetpassword"
                            name="forgetpassword"
                            required
                            value={emailAddress}
                            onChange={handleOnChange}
                        />
                    </div>
                    {otpSent && (
                        <div className='otp__section'>
                            <label htmlFor="otp">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                required
                                value={otp}
                                onChange={handleOTPChange}
                            />
                        </div>
                    )}
                    <div className="forgetpassword_button_section">
                    <button type="submit">{otpSent ? 'Submit OTP' : 'Send OTP'}</button>
                    </div>
                </form>
            </Modals>
        </>
    );
};

export default ForgetPassword;
