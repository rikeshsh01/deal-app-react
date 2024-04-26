/*import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modals from '../components/common/Modals.jsx';

const ResetPassword = () => {
    const { userId } = useParams();
    console.log(userId)
    const navigate = useNavigate();
    const [password, setNewPassword] = useState({
        newpassword:"",
        confirmpassword:""
    });
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOnChange = (e) => {
        setNewPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            newpassword: password.newpassword,
            confirmpassword: password.confirmpassword
        };

        console.log(requestData)

        try {
            // const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/resetpassword/${userId}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(requestData),
            // });

            // let json = await response.json();
            // console.log(json)

            // let userIdRetry = json.data.userId
            // // Handle response data
            // if (json.data.userId) {
            //     navigate(`/resetpassword/${userIdRetry}`);
            // } else {
            //     alert("No userId")
            //     // navigate(`/verifyemail/${userIdRetry}`);
            // }
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
                title="Reset Password"
                customClassName="modal-for-auth"
            >
                <form className='resetpassword__form' onSubmit={handleLoginSubmit}>
                <div className='resetpassword__input__section'>
                        <label htmlFor="newpassword">New password:</label>
                        <input
                            type="text"
                            id="newpassword"
                            name="newpassword"
                            required
                            value={password.newpassword}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="confirmpassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            required
                            value={password.confirmpassword}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='resetpassword__button__section'>
                        <button className='resetpassword__button' type="submit">Reset</button>
                       </div>
                </form>
            </Modals>
        </>
    );
};

export default ResetPassword;

*/
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modals from '../components/common/Modals.jsx';

const ResetPassword = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        newpassword: "",
        confirmpassword: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { newpassword, confirmpassword } = password;
        const requestData = { newpassword, confirmpassword };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/resetpassword/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                navigate(`/login`);

            } else {
                throw new Error('Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Modals
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title="Reset Password"
            customClassName="modal-for-auth"
        >
            <form className='resetpassword__form' onSubmit={handleSubmit}>
                <div className='resetpassword__input__section'>
                    <label htmlFor="newpassword">New password:</label>
                    <input
                        type="password"
                        id="newpassword"
                        name="newpassword"
                        required
                        value={password.newpassword}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        required
                        value={password.confirmpassword}
                        onChange={handleOnChange}
                    />
                </div>
                <div className='resetpassword__button__section'>
                    <button className='resetpassword__button' type="submit">Reset</button>
                </div>
            </form>
        </Modals>
    );
};

export default ResetPassword;



