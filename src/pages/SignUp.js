import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modals from '../components/common/Modal.jsx';

const Login = () => {
    const location = useLocation();
    let navigate = useNavigate()
    const [credential, setCredential] = useState({ name: '', email: '', password: '', phoneNumber: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if current URL is '/login' and open the modal accordingly
        if (location.pathname === '/signup') {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [location.pathname]);

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleModalClose = () => {
        // Close the modal
        setIsModalOpen(false);
    };


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            name: credential.name,
            email: credential.email,
            password: credential.password,
            phoneNumber: credential.phoneNumber
        };
        console.log(requestData)

        try {
            // API Call
            let response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });
            const json = await response.json();
            console.log(json.status)

            // Handle response data
            if (json.status && json.status === 200) {
                navigate("/login");
            } else {
                navigate("/signup");
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <>
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Sign up"
                customClassName="modal-for-auth"
            >
                <form className='signup__form' onSubmit={handleSignUpSubmit}>
                    <div className='signup__input__section'>


                        <label htmlFor="email">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={credential.name}
                            onChange={handleOnChange}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            required
                            value={credential.email}
                            onChange={handleOnChange}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={credential.password}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="email">Phone Number:</label>
                        <input
                            type="number"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            value={credential.phoneNumber}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='signup__button__section'>
                        <button className='signup__button' type="submit">Sign up</button>
                        <p>Already have account? <Link to="/login" >Login</Link></p>

                    </div>

                </form>
            </Modals>
        </>
    );
};

export default Login;
